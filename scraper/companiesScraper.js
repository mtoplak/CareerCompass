const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
puppeteer.use(StealthPlugin());

async function scrapeWebsite() {
  const browser = await puppeteer.launch({ headless: false });
  const userAgent = new UserAgent();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.setUserAgent(userAgent.toString());
  await page.goto("https://www.bizi.si/iskanje/", {
    waitUntil: "domcontentloaded",
  });

  // Cookies
  await page.waitForSelector("#didomi-notice-agree-button");

  // "Sprejmi in zapri"
  await page.click("#didomi-notice-agree-button");

  await page.waitForSelector(
    "#ctl00_cphMain_SearchAdvanced1_ddlStZaposlenihOd"
  );

  // await page.select("#ctl00_cphMain_SearchAdvanced1_ddlStZaposlenihOd", "08");

  // await page.evaluate(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // });

  // await page.click(
  //   'div[data-footer-scroll-bottom-offset="0"] a#ctl00_cphMain_SearchAdvanced1_btnPoisciPodjetja'
  // );

  // filtriranje, osveži rezultat
  await page.waitForSelector(
    "#ctl00_cphMain_DisplayRecords1_UpdatePanelRecords",
    { timeout: 500000 }
  );

  // izberi pogled
  await page.evaluate(() => {
    return new Promise((resolve) => {
      setTimeout(resolve, 15000);
    });
  });

  let currentPage = 1;
  while (true) {
    console.log("Scraping page", currentPage);
    await scrapeCurrentSite(page);
    const hasNextPage = await goToNextPage(page);
    if (!hasNextPage) {
      console.log("No more pages to scrape.");
      break;
    }

    currentPage++;
  }

  await browser.close();
}

async function goToNextPage(page) {
  await page.waitForSelector(".b-search-pager");
  const children = await page.$$(".b-search-pager > *");

  let foundActiveButton = false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const isActive = await child.evaluate((element) =>
      element.classList.contains("b-active")
    );

    if (foundActiveButton) {
      await children[i].click();
      return true;
    }

    if (isActive) {
      foundActiveButton = true;
    }
  }

  return false;
}

async function scrapeCurrentSite(page) {
  await page.waitForSelector(".b-table-body", { timeout: 40000 });

  const elements = await page.$$(".b-table-body > *");

  let companies = [];

  for (const element of elements) {
    console.log("----------");
    let company = {};

    // ime podjetja
    const titleElement = await element.$(".b-company-title");
    if (titleElement !== null) {
      const title = await page.evaluate(
        (titleElement) => titleElement.textContent,
        titleElement
      );
      console.log(title);
      company.name = title;
    } else {
      continue;
    }

    // panoga
    const industryChildText = await element.$$eval(":nth-child(3)", (nodes) =>
      nodes.map((node) => node.textContent.trim())
    );
    let industry = industryChildText.filter((text) => text.trim() !== "");
    console.log(industryChildText);
    if (industry.length > 0) {
      if (industry[0] != company.name) {
        industry = industry[0].split(";").map((item) => item.trim());
      } else {
        industry = [industry[1]];
      }
    } else {
      industry = "";
    }
    console.log(industry);
    company.industry = industry;

    // email
    const emailChildText = await element.$$eval(":nth-child(6)", (nodes) =>
      nodes.map((node) => node.textContent.trim())
    );
    let email;
    if (emailChildText.length > 0) {
      email = emailChildText[0].replace(/\s/g, "");
    } else {
      email = "";
    }
    console.log(email);
    company.email = email;

    // spletna stran
    const pageChildText = await element.$$eval(":nth-child(7)", (nodes) =>
      nodes.map((node) => node.textContent.trim())
    );
    let website;
    if (pageChildText.length > 0) {
      website = pageChildText[0].replace(/\s/g, "");
    } else {
      website = "";
    }
    console.log(website);
    company.website = website;

    // naslov
    const addressChildText = await element.$$eval(":nth-child(5)", (nodes) =>
      nodes.map((node) => node.textContent.trim())
    );
    let address = addressChildText.filter((text) => text.trim() !== "");
    if (address.length > 0) {
      address = address[0].replace(/\s+/g, " ");
    } else {
      address = "";
    }
    console.log(address);
    company.address = address;

    // mesto
    const cityChildText = await element.$$eval(":nth-child(8)", (nodes) =>
      nodes.map((node) => node.textContent.trim())
    );
    let city = cityChildText.filter((text) => text.trim() !== "");
    if (city.length > 0) {
      city = city[0];
    } else {
      city = "";
    }
    //city = city.replace(/\d+/g, '').trim();
    console.log(city);
    company.city = city;

    if (Object.keys(company).length > 0) {
      companies.push(company);
    }
  }

  // save to JSON file
  let existingData = [];
  try {
    const existingJsonData = fs.readFileSync("scraped_results.json", "utf-8");
    existingData = JSON.parse(existingJsonData);
  } catch (error) {
    console.error("Error reading existing JSON data:", error);
  }

  const mergedData = [...existingData, ...companies];
  const jsonData = JSON.stringify(mergedData);

  fs.writeFileSync("scraped_results.json", jsonData, {
    flag: "w",
  });
}

scrapeWebsite();

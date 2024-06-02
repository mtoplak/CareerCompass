const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
puppeteer.use(StealthPlugin());

async function scrapeJobAds() {
  const browser = await puppeteer.launch({ headless: false });
  const userAgent = new UserAgent();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.setUserAgent(userAgent.toString());

  // Moje delo
  const ads = await mojeDelo(page);

  // optius
  const ads2 = await optius(page);

  // zaposlitev.net scraping
  // const ads3 = await zaposlitev(page);

  await browser.close();

  const allNew = [...ads, ...ads2];
  const scrapedResults = JSON.parse(
    fs.readFileSync("scraped_results.json", "utf8")
  );

  // Check if job ad company exists in scraped results
  const matchedAds = allNew.filter((ad) => {
    return scrapedResults.some(
      (company) => company.name.toLowerCase() === ad.company.toLowerCase()
    );
  });

  console.log(matchedAds);

  let existingData = [];
  try {
    const existingJsonData = fs.readFileSync("scrapedJobAds.json", "utf-8");
    existingData = JSON.parse(existingJsonData);
  } catch (error) {
    console.error("Error reading existing JSON data:", error);
  }

  const mergedData = [...existingData, ...matchedAds];
  const jsonData = JSON.stringify(mergedData);

  fs.writeFileSync("scrapedJobAds.json", jsonData, {
    flag: "w",
  });
}

const mojeDelo = async (page) => {
  const adsMojeDelo = [];

  for (let i = 1; i <= 15; i++) {
    await page.goto(
      `https://www.mojedelo.com/prosta-delovna-mesta/vsa-podrocja/vse-regije?p=${i}`,
      {
        waitUntil: "domcontentloaded",
      }
    );

    if (i === 1) {
      await page.waitForSelector(".fc-dialog-container");
      await page.click(".fc-button.fc-cta-consent.fc-primary-button");
    }

    // Moje delo scraping
    const ads = await page.evaluate(() => {
      let adsOnPage = [];
      const adsElements = document.querySelectorAll(".details");
      adsElements.forEach((element) => {
        const ad = {};

        // position
        const titleElement = element.querySelector(".title");
        ad.position = titleElement ? titleElement.textContent.trim() : "";

        // description
        const descriptionElement = element.querySelector("p");
        ad.description = descriptionElement
          ? descriptionElement.textContent.trim().replace(/\n/g, "")
          : "";

        // city
        const cityElement =
          element.querySelector(".icon-map-marker").nextElementSibling;
        ad.city = cityElement ? cityElement.textContent.trim() : "";

        // company
        const companyElement =
          element.querySelector(".icon-home").nextElementSibling;
        ad.company = companyElement
          ? companyElement.textContent.trim().replace(/\s+/g, " ")
          : "";

        // URL
        const parentElement = element.parentElement;
        ad.url =
          "https://www.mojedelo.com" + parentElement.getAttribute("href");

        ad.source = "MojeDelo.com";
        adsOnPage.push(ad);
      });
      return adsOnPage;
    });

    adsMojeDelo.push(...ads);
  }

  return adsMojeDelo;
};

const optius = async (page, pageNum = 1) => {
  await page.goto(
    `https://www.optius.com/iskalci/prosta-delovna-mesta/?s=${
      (pageNum - 1) * 20
    }`,
    {
      waitUntil: "networkidle2",
    }
  );
  await page.waitForSelector(".job-results-list");

  // Optius scraping
  const adsOptius = await page.evaluate(() => {
    let adsOptius = [];
    const adsElements = document.querySelectorAll(".item");
    adsElements.forEach((element) => {
      const ad = {};

      // position
      const positionElement = element.querySelector(".h4");
      ad.position = positionElement ? positionElement.textContent.trim() : "";
      if (ad.position == "") {
        return;
      }

      // description
      const descriptionElement = element.querySelector("p");
      ad.description = descriptionElement
        ? descriptionElement.textContent.trim()
        : "";

      // city
      const companyDetailsElement = element.querySelector(".job-infos");
      if (companyDetailsElement) {
        const listItems = companyDetailsElement.querySelectorAll("li");
        if (listItems.length > 1) {
          const cityItem = listItems[1];
          const cityDiv = cityItem.querySelector(".right");
          if (cityDiv) {
            ad.city = cityDiv.textContent.trim();
          } else {
            ad.city = "";
          }
        } else {
          ad.city = "";
        }
      }

      // company
      const companyNameElement = element.querySelector(".company-name p a");
      if (companyNameElement) {
        ad.company = companyNameElement.textContent.trim();
      } else {
        ad.company = "";
      }

      // URL
      const urlElement = element.querySelector("a");
      ad.url = urlElement
        ? "https://www.optius.com" + urlElement.getAttribute("href")
        : "";

      ad.source = "Optius.com";
      adsOptius.push(ad);
    });
    return adsOptius;
  });

  const nextPageExists = await page.evaluate(() => {
    const nextButton = document.querySelector(".arrow.next a");
    return nextButton !== null;
  });

  if (nextPageExists && pageNum < 15) {
    const nextPageNum = pageNum + 1;
    const nextPageAds = await optius(page, nextPageNum);
    adsOptius.push(...nextPageAds);
  }

  return adsOptius;
};

const zaposlitev = async (page) => {
  await page.goto("https://www.zaposlitev.net/isci", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(".search-page");
  const ads3 = await page.evaluate(() => {
    let adsZaposlitev = [];
    const adsElements = document.querySelectorAll(".item.premium");
    adsElements.forEach((element) => {
      const ad = {};

      // position
      const positionElement = element.querySelector(".title > h3 > a");
      ad.position = positionElement ? positionElement.textContent.trim() : "";

      // company
      const companyElement = element.querySelector(".company > *");
      if (companyElement) {
        const companyText = companyElement.textContent.trim();
        ad.company = companyText.split(",")[0].trim();
      } else {
        ad.company = "";
      }

      // city
      const locationElement = element.querySelector(".location > *");
      ad.city = locationElement ? locationElement.textContent.trim() : "";

      // URL
      ad.url = positionElement ? positionElement.getAttribute("href") : "";

      ad.source = "Zaposlitev.net";
      adsZaposlitev.push(ad);
    });
    return adsZaposlitev;
  });
  return ads3;
};

scrapeJobAds();

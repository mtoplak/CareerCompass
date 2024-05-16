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
  await page.goto(
    "https://www.mojedelo.com/prosta-delovna-mesta/vsa-podrocja/vse-regije",
    {
      waitUntil: "domcontentloaded",
    }
  );

  await page.waitForSelector(".fc-dialog-container");

  // Cookies
  await page.click(".fc-button.fc-cta-consent.fc-primary-button");

  // Moje delo scraping
  const ads = await page.evaluate(() => {
    let adsMojeDelo = [];
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
      ad.url = "https://www.mojedelo.com" + parentElement.getAttribute("href");

      ad.source = "MojeDelo.com";
      adsMojeDelo.push(ad);
    });
    return adsMojeDelo;
  });

  // optius
  await page.goto("https://www.optius.com/iskalci/prosta-delovna-mesta/", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(".job-results-list");

  // Optius scraping
  const ads2 = await page.evaluate(() => {
    let adsOptius = [];
    const adsElements = document.querySelectorAll(".item");
    adsElements.forEach((element) => {
      const ad = {};

      // position
      const positionElement = element.querySelector(".text-big");
      ad.position = positionElement ? positionElement.textContent.trim() : "";
      if (ad.position == "") {
        return;
      }

      // description
      const descriptionElement = element.querySelector("p");
      ad.description = descriptionElement
        ? descriptionElement.textContent.trim()
        : "";

      // company and city
      const companyDetailsElement = element.querySelector(".company-details");
      if (companyDetailsElement) {
        const companyDivs = companyDetailsElement.querySelectorAll("div");
        if (companyDivs.length >= 3) {
          const companyParagraphs = companyDivs[0].querySelectorAll("p");
          ad.company =
            companyParagraphs.length >= 2
              ? companyParagraphs[1].textContent.trim()
              : "";

          const cityParagraphs = companyDivs[2].querySelectorAll("p");
          ad.city =
            cityParagraphs.length >= 2
              ? cityParagraphs[1].textContent.trim()
              : "";
        }
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

  // zaposlitev
  await page.goto("https://www.zaposlitev.net/isci", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(".search-page");

  // zaposlitev.net scraping
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

  await browser.close();

  let existingData = [];
  try {
    const existingJsonData = fs.readFileSync("scrapedJobAds.json", "utf-8");
    existingData = JSON.parse(existingJsonData);
  } catch (error) {
    console.error("Error reading existing JSON data:", error);
  }

  const mergedData = [...existingData, ...ads, ...ads2, ...ads3];
  const jsonData = JSON.stringify(mergedData);

  fs.writeFileSync("scrapedJobAds.json", jsonData, {
    flag: "w",
  });
}

scrapeJobAds();

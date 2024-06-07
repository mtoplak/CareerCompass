
const chrome = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const axios = require("axios");

export default async (req: any, res: any) => {

    const isProd = process.env.NODE_ENV === 'production';

    let browser;

    if (isProd) {
        browser = await puppeteer.launch({
            args: chrome.args,
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath(),
            headless: 'new',
            ignoreHTTPSErrors: true
        });
    } else {
        browser = await puppeteer.launch({
            headless: 'new',
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        });
    }

    const deleteRequest = await axios.delete("https://career-compass-nu.vercel.app/job/source");
    console.log(deleteRequest.data);

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    const ads = await mojeDelo(page);

    await browser.close();

    const response = await axios.get(
        "https://career-compass-nu.vercel.app/company"
    );
    const allCompanies = await response.data;

    const matchedAds = ads.filter((ad) => {
        return allCompanies.some(
            (company) => company.name.toLowerCase() === ad.company.toLowerCase()
        );
    });

    const response2 = await axios.post(
        "https://career-compass-nu.vercel.app/job/multiple",
        JSON.stringify(matchedAds),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    console.log(response2.data);

    return res.status(200).json({
        title: "Scraping done",
        message: "Saved to db!",
    });
};

const mojeDelo = async (page) => {
    const adsMojeDelo: any = [];

    for (let i = 1; i <= 8; i++) {
        await page.goto(
            `https://www.mojedelo.com/prosta-delovna-mesta/vsa-podrocja/vse-regije?p=${i}`,
            {
                waitUntil: "domcontentloaded",
            }
        );

        // if (i === 1) {
        // await page.waitForSelector(".fc-dialog-container");
        // await page.click(".fc-button.fc-cta-consent.fc-primary-button");
        // }

        // Moje delo scraping
        const ads = await page.evaluate(() => {
            let adsOnPage: any = [];
            const adsElements = document.querySelectorAll(".details");
            adsElements.forEach((element) => {
                const ad: any = {};

                // position
                const titleElement: any = element.querySelector(".title");
                ad.position = titleElement ? titleElement.textContent.trim() : "";

                // description
                const descriptionElement: any = element.querySelector("p");
                ad.description = descriptionElement
                    ? descriptionElement.textContent.trim().replace(/\n/g, "")
                    : "";

                // city
                const cityElement: any =
                    element.querySelector(".icon-map-marker")?.nextElementSibling;
                ad.city = cityElement ? cityElement.textContent.trim() : "";

                // company
                const companyElement: any =
                    element.querySelector(".icon-home")?.nextElementSibling;
                ad.company = companyElement
                    ? companyElement.textContent.trim().replace(/\s+/g, " ")
                    : "";

                // URL
                const urlElement = element.closest("a");
                ad.url = urlElement
                    ? "https://www.mojedelo.com" + urlElement.getAttribute("href")
                    : "";

                ad.source = "MojeDelo.com";
                adsOnPage.push(ad);
            });
            return adsOnPage;
        });

        adsMojeDelo.push(...ads);
    }

    return adsMojeDelo;
};

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

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 720 });

    const ads = await optius(page);

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
        title: "Scraping 2 done",
        message: "Saved to db 2!",
    });
};

const optius = async (page, pageNum = 1) => {
    await page.goto(
        `https://www.optius.com/iskalci/prosta-delovna-mesta/?s=${(pageNum - 1) * 20
        }`,
        {
            waitUntil: "networkidle2",
        }
    );
    await page.waitForSelector(".job-results-list");

    // Optius scraping
    const adsOptius = await page.evaluate(() => {
        let adsOptius: any = [];
        const adsElements = document.querySelectorAll(".item");
        adsElements.forEach((element) => {
            const ad: any = {};

            // position
            const positionElement: any = element.querySelector(".h4");
            ad.position = positionElement ? positionElement.textContent.trim() : "";
            if (ad.position == "") {
                return;
            }

            // description
            const descriptionElement: any = element.querySelector("p");
            ad.description = descriptionElement
                ? descriptionElement.textContent.trim()
                : "";

            // city
            const companyDetailsElement = element.querySelector(".job-infos");
            if (companyDetailsElement) {
                const listItems = companyDetailsElement.querySelectorAll("li");
                if (listItems.length > 1) {
                    const cityItem = listItems[1];
                    const cityDiv: any = cityItem.querySelector(".right");
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
            const companyNameElement: any = element.querySelector(".company-name p a");
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

    if (nextPageExists && pageNum < 8) {
        const nextPageNum = pageNum + 1;
        const nextPageAds = await optius(page, nextPageNum);
        adsOptius.push(...nextPageAds);
    }

    return adsOptius;
};
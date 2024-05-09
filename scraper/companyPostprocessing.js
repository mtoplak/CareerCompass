const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const slugify = require("slugify");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
const admin = require("firebase-admin");
const sharp = require("sharp");
const { uploadBytes, ref, getDownloadURL } = require("firebase/storage");
const { industryMappings } = require("./industries.js");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
require("dotenv").config();

puppeteer.use(StealthPlugin());

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const modifyIndustry = async () => {
  try {
    const rawData = fs.readFileSync("scraped_results.json");
    const companies = JSON.parse(rawData);

    companies.forEach((company) => {
      if (Array.isArray(company.industry)) {
        if (
          company.industry.some(
            (ind) => typeof ind === "string" && ind.includes(";")
          )
        ) {
          company.industry = company.industry.flatMap((ind) => {
            if (typeof ind === "string" && ind.includes(";")) {
              return ind.split(";").map((item) => item.trim());
            } else {
              return ind;
            }
          });
        }
      }
    });

    fs.writeFileSync(
      "scraped_results.json",
      JSON.stringify(companies, null, 2)
    );
    console.log("Industry modified and saved to scraped_results.json");
  } catch (error) {
    console.error("Error modifying industry:", error);
  }
};

const addIndustry = () => {
  try {
    const rawData = fs.readFileSync("scraped_results.json");
    let companies = JSON.parse(rawData);

    companies.forEach((company) => {
      if (
        Array.isArray(company.subindustry) &&
        company.subindustry.length > 0
      ) {
        const subindustry = company.subindustry[0];
        const industry = industryMappings[subindustry];
        if (industry) {
          company.industry = industry;
        }
      }
    });

    fs.writeFileSync(
      "scraped_results.json",
      JSON.stringify(companies, null, 2)
    );
    console.log(
      "Industry property added to companies and saved to scraped_results.json"
    );
  } catch (error) {
    console.error("Error adding industry:", error);
  }
};

const addCompanySlug = () => {
  try {
    const rawData = fs.readFileSync("scraped_results.json");
    let companies = JSON.parse(rawData);

    companies.forEach((company) => {
      const slug = slugify(company.name, { lower: true, strict: true });
      company.slug = slug;
    });

    fs.writeFileSync(
      "scraped_results.json",
      JSON.stringify(companies, null, 2)
    );
    console.log("Company slugs added and saved to scraped_results.json");
  } catch (error) {
    console.error("Error adding company slugs:", error);
  }
};

const getCompanyLogo = async () => {
  try {
    let companies = JSON.parse(fs.readFileSync("scraped_results.json", "utf8"));
    const browser = await puppeteer.launch({ headless: false });
    const userAgent = new UserAgent();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.setUserAgent(userAgent.toString());

    for (let i = 0; i < companies.length; i++) {
      const company = companies[i];
      if (!company.logo || company.logo == "") {
        await page.goto(
          `https://www.google.com/search?q=${company.name}+logo&tbm=isch`
        );

        // await page.waitForNavigation();

        await page.evaluate(() => {
          return new Promise((resolve) => {
            setTimeout(resolve, 4000);
          });
        });

        await page.waitForSelector('img[id^="dimg_"]', { timeout: 60000 });
        const imgElements = await page.$$('img[id^="dimg_"]');
        let imageSRC = "";

        for (const imgElement of imgElements) {
          const height = await imgElement.evaluate((element) => element.height);
          const width = await imgElement.evaluate((element) => element.width);
          if (height > 100 || width > 100) {
            const imgSrc = await imgElement.evaluate((element) => element.src);
            imageSRC = imgSrc;
            break;
          }
        }

        if (imageSRC) {
          const response = await page.goto(imageSRC);
          const imageBuffer = await response.buffer();

          const resizedImageBuffer = await sharp(imageBuffer)
            .resize({ width: 300 })
            .toBuffer();

          const storageRef = ref(
            storage,
            `companyLogos/${company.name}_logo.jpg`
          );
          const uploadTask = uploadBytes(storageRef, resizedImageBuffer, {
            contentType: "image/jpeg",
          });
          const snapshot = await uploadTask;

          const downloadURL = await getDownloadURL(snapshot.ref);
          company.logo = downloadURL;

          companies[i] = company;
          fs.writeFileSync(
            "scraped_results.json",
            JSON.stringify(companies, null, 2)
          );
        }
      }
    }

    await browser.close();
  } catch (error) {
    console.error(error);
  }
};


// node companyPostprocessing.js

const processData = async () => {
  try {
    // Read data from file
    const rawData = fs.readFileSync("scraped_results.json");
    let companies = JSON.parse(rawData);

    // Remove numbers from city names
    companies = companies.map(company => ({
      ...company,
      city: company.city.replace(/\d+/g, '').trim()
    }));

    // Write the final data back to the file
    fs.writeFileSync(
      "scraped_results.json",
      JSON.stringify(companies, null, 2)
    );

    console.log("Final processing completed.");
  } catch (error) {
    console.error("Error processing data:", error);
  }
};

// Call the function to process data
processData();
const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const UserAgent = require("user-agents");
puppeteer.use(StealthPlugin());
const { industryMappings } = require("./industries.js");

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

const getLogo = () => {};

addIndustry();

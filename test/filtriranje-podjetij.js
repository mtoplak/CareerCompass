const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function testFilterCompanies() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Open Home Page
    await driver.get("https://career-compass-front.vercel.app/");

    // Click on "Podjetja" in navigation
    const companiesNav = await driver.wait(
      until.elementLocated(By.linkText("Podjetja")),
      10000
    );
    await driver.wait(until.elementIsVisible(companiesNav), 5000);
    await companiesNav.click();

    // Wait for "Vsa podjetja" page
    await driver.wait(
      until.urlContains("/podjetja"),
      10000
    );

    await driver.sleep(1000);

    // Enter "Maribor" in "Vnesi lokacijo" field
    await driver.findElement(
        By.css('select[name="dejavnost"]')
       ).sendKeys("Dom in vrt");

   // Set filter for rating 4+
   await driver.findElement(
    By.css('select[name="ocena"]')
   ).sendKeys("4+");

    // Click "Išči" button
    await driver.findElement(
      By.xpath("//button[contains(., 'Išči')]")
    ).click();

    await driver.sleep(5000);

    const companyCards = await driver.wait(
        until.elementsLocated(
          By.css(".group.mb-8.rounded-xl.bg-white")
        ),
        10000
      );
      
    assert.ok(companyCards.length > 0, "Ni najdenih podjetij.");

    for (const card of companyCards) {
        const text = await card.getText();
      
        assert.ok(
          text.includes("Dom in vrt"),
          "Podjetje nima dejavnosti Dom in vrt:\n" + text
        );
      
        const match = text.match(/\(([\d.,]+)\)/);
      
        assert.ok(
          match && match[1],
          "V kartici ni mogoče najti ocene v oklepaju:\n" + text
        );
      
        const rating = parseFloat(match[1].replace(",", "."));
      
        assert.ok(
          rating >= 4 && rating <= 5,
          `Ocena podjetja (${rating}) ni večja ali enaka 4:\n` + text
        );
      }
      
    
      console.log("Test filtriranja podjetij je bil uspešen.");
   
  } catch (e) {
    console.error(e);
    console.log("Test failed.");
  }

  await driver.quit();
}

testFilterCompanies().catch(console.error);

const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function testRateCompany() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open Company Page
    await driver.get("https://career-compass-front.vercel.app/podjetje/lastcall-doo");

    // Click "Oceni podjetje"
    const rateLink = await driver.wait(
      until.elementLocated(By.linkText("Oceni podjetje")),
      10000
    );

    await driver.wait(until.elementIsVisible(rateLink), 5000);
    await rateLink.click();

    await driver.wait(until.urlContains("/ocenjevanje/lastcall-doo"), 5000);

    let teamElement = await driver.wait(
      until.elementLocated(By.id("team")),
      10000
    );
    await driver.wait(until.elementIsVisible(teamElement), 5000);

    // Click Stars in "Splosna ocena"
    const teamStar = await teamElement.findElement(
      By.css("span:nth-of-type(5) svg")
    );
    await teamStar.click();
    await driver.findElement(
      By.css('#flexibility span:nth-of-type(5) svg')
    ).click();
    await driver.findElement(
      By.css('#work_environment span:nth-of-type(4) svg')
    ).click();
    await driver.findElement(
      By.css('#personal_development span:nth-of-type(5) svg')
    ).click();
    await driver.findElement(
      By.css('#work_life_balance span:nth-of-type(5) svg')
    ).click();
    await driver.findElement(
      By.css('#leadership span:nth-of-type(4) svg')
    ).click();

    // Comment in "Splosna ocena"
    await driver.findElement(By.id("general_assessment_comment")).sendKeys("Super ekipa!");

    // Scroll to "Placa in ugodnosti"
    await driver.executeScript("window.scrollBy(0, 500);");

    await driver.sleep(1000);

    // Click Stars in "Placa in ugodnosti"
    await driver.findElement(
      By.css('#benefits span:nth-of-type(5) svg')
    ).click();
    await driver.findElement(
      By.css('#bonuses span:nth-of-type(4) svg')
    ).click();

    // Comment in "Placa in ugodnosti"
    await driver.findElement(By.id("salary_and_benefits_comment")).sendKeys("Dobre place imamo!");

    // Scroll to "Bonusi"
    await driver.executeScript("window.scrollBy(0, 500);");

    await driver.sleep(1000);

    // Click Input in "Razgovori"
    await driver.findElement(
      By.id("negativeExperience")
    ).click();
    await driver.findElement(
      By.id("easy")
    ).click();


    // Comment in "Razgovori"
    await driver.findElement(By.id("interviews_comment")).sendKeys("Cuden razgovor.");

    await driver.sleep(1000);

    // Click Submit Button
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Redirect to Company Page
    await driver.wait(until.urlContains("/podjetje/lastcall-doo"), 9000);

    await driver.sleep(1000);


    console.log('Test was successful.');
  } catch (e) {
    console.error(e);
    console.log('Test failed.');
  }

  await driver.quit();
}

testRateCompany().catch(console.error);

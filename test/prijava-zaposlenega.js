const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

async function testEmployeeLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Open Home Page
    let homeUrl = "https://career-compass-front.vercel.app/";
    await driver.get(homeUrl);

    // Click on "Podjetja" in navigation
    const loginNav = await driver.wait(
      until.elementLocated(By.linkText("Prijava")),
      10000
    );
    await driver.wait(until.elementIsVisible(loginNav), 5000);
    await loginNav.click();

    // Wait for "Prijava" page
    await driver.wait(
      until.urlContains("/prijava"),
      10000
    );

    await driver.executeScript("window.scrollBy(0, 500);");

    let email = "tia.zvajker@student.um.si";
    let password = "Tia123";

    await driver.findElement(By.xpath('//input[@placeholder="Email"]')).sendKeys(email);

    await driver.findElement(By.xpath('//input[@placeholder="Geslo"]')).sendKeys(password);

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs(homeUrl), 10000);

    await driver.sleep(1000);
    
    console.log("Test prijave zaposlenega je bil uspešen.");
   
  } catch (e) {
    console.error(e);
    console.log("Test failed.");
  }

  await driver.quit();
}

testEmployeeLogin().catch(console.error);

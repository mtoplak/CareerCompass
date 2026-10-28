import { test, expect, header } from "../support/fixtures";
import { findAuthAccount, findAppUser, unregisteredEmail } from "../support/testData";

// TP-02 – Zavrnitev registracije s prekratkim geslom (US1, F1)
test("TP-02 zavrnitev registracije s petmestnim geslom", async ({ page }) => {
  const name = "Testna Oseba";
  const email = unregisteredEmail("tp02");
  const password = "Tst4!"; // 5 znakov – tik pod minimumom 6

  await test.step("Predpogoj: odjavljen uporabnik na domači strani, naslov še ni registriran", async () => {
    expect(await findAuthAccount(email)).toBeUndefined();
    expect(await findAppUser(email)).toBeUndefined();
    await page.goto("/");
    await expect(header(page).getByRole("link", { name: "Prijava" })).toBeVisible();
  });

  await test.step("1. V nogi pod »Moj račun« kliknemo »Registracija«", async () => {
    await page.locator("footer h4", { hasText: "Moj račun" }).locator("+ ul").getByRole("link", { name: "Registracija" }).click();
    await expect(page).toHaveURL("/registracija");
    await expect(page.getByRole("heading", { name: "Registracija", level: 1 })).toBeVisible();
  });

  await test.step("2. Vnesemo ime in priimek, e-pošto in petmestno geslo", async () => {
    await page.getByPlaceholder("Ime in priimek").fill(name);
    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Geslo").fill(password);
    await expect(page.getByPlaceholder("Ime in priimek")).toHaveValue(name);
    await expect(page.getByPlaceholder("Email")).toHaveValue(email);
    await expect(page.getByPlaceholder("Geslo")).toHaveAttribute("type", "password");
  });

  await test.step("3. Kliknemo »Registracija«", async () => {
    const response = page.waitForResponse((res) => res.url().endsWith("/api/register"));
    await page.getByRole("button", { name: "Registracija", exact: true }).click();
    expect((await response).status()).toBe(400);
    await expect(page.getByText("Geslo mora vsebovati vsaj 6 znakov!")).toBeVisible();
    await expect(page).toHaveURL("/registracija");
    await expect(page.getByPlaceholder("Ime in priimek")).toBeVisible();
    await expect(page.getByText("Uspešna registracija!")).toHaveCount(0);
  });

  await test.step("4. Preverimo prikaz uporabniškega računa v glavi strani", async () => {
    await expect(header(page).getByRole("link", { name: "Prijava" })).toBeVisible();
    await expect(header(page).getByRole("button", { name: "Odjava" })).toHaveCount(0);
    await expect(header(page).getByText(name)).toHaveCount(0);
  });

  await test.step("5. V Firebase Auth in bazi uporabnikov poiščemo uporabljeni naslov", async () => {
    expect(await findAuthAccount(email), "račun v Firebase Auth").toBeUndefined();
    expect(await findAppUser(email), "uporabnik v bazi aplikacije").toBeUndefined();
  });

  // Čiščenje: obrazec se zapre s koncem testa; morebitni nastali račun odstrani skupni fixture.
});

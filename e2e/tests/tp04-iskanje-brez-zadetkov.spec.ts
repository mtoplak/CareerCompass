import { test, expect, header, logIn, logOut } from "../support/fixtures";
import { createCompany, createJob, createVerifiedAccount } from "../support/testData";

const user = { name: "TP04 Uporabnik", email: "tp04.uporabnik@example.com", password: "Tp04Geslo!" };
const searchText = "TP04BREZZADETKOV";

// TP-04 – Iskanje zaposlitve brez zadetkov (US4, F8)
test("TP-04 iskanje zaposlitve brez zadetkov", async ({ page }) => {
  const jobTitle = (position: string) => page.getByRole("heading", { name: position, level: 3 });
  const jobSearch = page.getByPlaceholder("Vnesi delovno mesto");

  await test.step("Predpogoj: kontrolni oglas obstaja, uporabnik je prijavljen na domači strani", async () => {
    const company = await createCompany({ name: "TP04 Podjetje", industry: "Računalništvo in informatika" });
    await createJob({
      position: "TP04 Razvijalec",
      description: "Kontrolni oglas za test iskanja brez zadetkov.",
      city: "Maribor",
      company,
    });
    await createVerifiedAccount(user);
    await logIn(page, user.email, user.password);
  });

  await test.step("1. V glavi strani kliknemo »Zaposlitve«", async () => {
    await header(page).getByRole("link", { name: "Zaposlitve", exact: true }).click();
    // A/B test: meni naključno vodi na /zaposlitve ali /vse-zaposlitve, obe imata enak naslov.
    await expect(page).toHaveURL(/\/(vse-)?zaposlitve$/);
    await expect(page.getByRole("heading", { name: "Vsi zaposlitveni oglasi", level: 1 })).toBeVisible();
  });

  await test.step("2. Na seznamu poiščemo kontrolni oglas »TP04 Razvijalec«", async () => {
    await expect(jobTitle("TP04 Razvijalec")).toBeVisible();
  });

  await test.step("3. V »Vnesi delovno mesto« vpišemo iskalni niz, ostala polja pustimo prazna", async () => {
    await jobSearch.fill(searchText);
    await expect(jobSearch).toHaveValue(searchText);
    await expect(page.getByPlaceholder("Vnesi lokacijo")).toHaveValue("");
    await expect(page.locator('select[name="dejavnost"]')).toHaveValue("");
  });

  await test.step("4. Kliknemo »Išči« in počakamo na zaključek iskanja", async () => {
    const search = page.waitForResponse((res) => res.url().includes("/job/search?position=" + searchText));
    await page.getByRole("button", { name: /Išči/ }).click();
    expect((await search).status()).toBe(200);
    await expect(page).toHaveURL(new RegExp(`/iskanje-zaposlitev\\?delovno_mesto=${searchText}`));
    await expect(page.getByRole("heading", { name: "Ni rezultatov." })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3 }).filter({ hasText: "TP04" })).toHaveCount(0);
    await expect(page.getByText("Failed to fetch data")).toHaveCount(0);
  });

  await test.step("5. Izbrišemo iskalni niz in ponovno kliknemo »Išči«", async () => {
    await jobSearch.clear();
    await expect(jobSearch).toHaveValue("");
    await page.getByRole("button", { name: /Išči/ }).click();
    await expect(page).toHaveURL(/\/iskanje-zaposlitev\?delovno_mesto=&/);
    await expect(jobTitle("TP04 Razvijalec")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ni rezultatov." })).toHaveCount(0);
  });

  await test.step("Čiščenje: odjava (oglas, podjetje in račun odstrani skupni fixture)", async () => {
    await logOut(page);
  });
});

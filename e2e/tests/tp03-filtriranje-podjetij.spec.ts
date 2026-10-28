import { test, expect, header } from "../support/fixtures";
import { createCompany, rateCompany } from "../support/testData";

const all4 = [4, 4, 4, 4, 4, 4, 4, 4];

// Average = mean of the 8 category scores over all ratings.
const companies = [
  { name: "TP03-A", industry: "Dom in vrt", ratings: [all4], shownRating: "(4)" }, // 32/8 = 4,0
  { name: "TP03-B", industry: "Dom in vrt", ratings: [[3, 3, 3, 3, 4, 4, 4, 4], all4, all4, all4, all4] }, // 156/40 = 3,9
  { name: "TP03-C", industry: "Avtomobilizem", ratings: [[5, 5, 5, 5, 4, 4, 4, 4]] }, // 36/8 = 4,5
  { name: "TP03-D", industry: "Dom in vrt", ratings: [[5, 5, 5, 5, 4, 4, 4, 4], all4, all4, all4, all4], shownRating: "(4.1)" }, // 164/40 = 4,1
];

// TP-03 – Filtriranje podjetij po dejavnosti in povprečni oceni (US2, F4)
test("TP-03 filtriranje podjetij po dejavnosti »Dom in vrt« in oceni 4+", async ({ page }) => {
  // Kartica podjetja na seznamu je povezava na profil z nazivom podjetja v naslovu.
  const companyCards = page.locator('a[href^="/podjetje/"]').filter({ has: page.getByRole("heading", { level: 3 }) });
  const card = (name: string) => companyCards.filter({ has: page.getByRole("heading", { name, exact: true }) });

  await test.step("Predpogoj: v testni bazi so natanko podjetja A–D s pripadajočimi ocenami", async () => {
    for (const company of companies) {
      const created = await createCompany({ name: company.name, industry: company.industry });
      await rateCompany(created.slug, company.ratings);
    }
    await page.goto("/");
  });

  await test.step("1. V glavi strani kliknemo »Podjetja«", async () => {
    await header(page).getByRole("link", { name: "Podjetja", exact: true }).click();
    await expect(page).toHaveURL("/podjetja");
    await expect(page.getByRole("heading", { name: "Vsa podjetja", level: 1 })).toBeVisible();
    await expect(companyCards).toHaveCount(4);
    for (const company of companies) {
      await expect(card(company.name)).toBeVisible();
    }
  });

  await test.step("2. V filtru dejavnosti izberemo »Dom in vrt«", async () => {
    await page.locator('select[name="dejavnost"]').selectOption("Dom in vrt");
    await expect(page.locator('select[name="dejavnost"]')).toHaveValue("Dom in vrt");
  });

  await test.step("3. V filtru ocene izberemo »4+«, ostala polja pustimo prazna", async () => {
    await page.locator('select[name="ocena"]').selectOption("4+");
    await expect(page.locator('select[name="ocena"]')).toHaveValue("4+");
    await expect(page.getByPlaceholder("Vnesi ime")).toHaveValue("");
    await expect(page.getByPlaceholder("Vnesi lokacijo")).toHaveValue("");
    await expect(page.getByRole("checkbox")).not.toBeChecked();
  });

  await test.step("4. Kliknemo »Išči« in počakamo na rezultate", async () => {
    await page.getByRole("button", { name: /Išči/ }).click();
    await expect(page).toHaveURL(/\/iskanje\?.*dejavnost=Dom\+in\+vrt.*ocena=4%2B/);
    await expect(companyCards).toHaveCount(2);
    await expect(card("TP03-A")).toBeVisible();
    await expect(card("TP03-D")).toBeVisible();
    await expect(card("TP03-B")).toHaveCount(0);
    await expect(card("TP03-C")).toHaveCount(0);
  });

  await test.step("5. Na karticah preverimo dejavnost in oceno", async () => {
    for (const company of companies.filter((c) => c.shownRating)) {
      await expect(card(company.name)).toContainText("Dom in vrt");
      await expect(card(company.name)).toContainText(company.shownRating!);
    }
  });

  // Čiščenje: filtre ponastavi nova stran, testna podjetja in ocene odstrani skupni fixture.
});

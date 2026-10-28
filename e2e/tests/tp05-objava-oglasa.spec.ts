import { test, expect, header, logIn, logOut } from "../support/fixtures";
import { createCompany, createVerifiedAccount } from "../support/testData";

const companyName = "TP05 Podjetje";
const account = { name: companyName, email: "tp05.podjetje@example.com", password: "Tp05Geslo!" };
const job = {
  position: "TP05 Razvijalec",
  description: "Razvoj in vzdrževanje testne spletne aplikacije.",
  application: "Pošljite življenjepis prek kontaktnega obrazca testnega podjetja.",
  city: "Maribor",
};

// TP-05 – Objava zaposlitvenega oglasa s strani podjetja (US8, F15)
test("TP-05 podjetje objavi zaposlitveni oglas", async ({ page }) => {
  // Oglasi na profilu podjetja so povezave na stran oglasa (/zaposlitev/<id>).
  const profileJobs = page.locator('a[href^="/zaposlitev/"]');
  const newJob = profileJobs.filter({ has: page.getByRole("heading", { name: job.position, exact: true }) });
  let companySlug = "";
  let jobCountBefore = 0;

  await test.step("Predpogoj: prijavljen račun, povezan s »TP05 Podjetje«, na domači strani", async () => {
    const company = await createCompany({ name: companyName, industry: "Poslovni svet", email: account.email });
    companySlug = company.slug;
    await createVerifiedAccount({ ...account, company });
    await logIn(page, account.email, account.password);
  });

  await test.step("1. V glavi strani kliknemo ime podjetja »TP05 Podjetje«", async () => {
    await header(page).getByRole("link", { name: companyName }).click();
    await expect(page).toHaveURL(`/podjetje/${companySlug}`);
    await expect(page.getByRole("heading", { name: companyName, level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Zaposlitve", level: 2 })).toBeVisible();
    // Predpogoj: zabeležimo število oglasov podjetja N in preverimo, da naslov oglasa še ne obstaja.
    jobCountBefore = await profileJobs.count();
    await expect(newJob).toHaveCount(0);
  });

  await test.step("2. Na profilu kliknemo »Dodaj zaposlitev«", async () => {
    await page.getByRole("link", { name: "Dodaj zaposlitev" }).click();
    await expect(page).toHaveURL("/dodaj-zaposlitev");
    await expect(page.getByRole("heading", { name: "Dodaj zaposlitveni oglas", level: 1 })).toBeVisible();
  });

  await test.step("3. Vnesemo naziv, opis, način prijave in lokacijo", async () => {
    await page.getByLabel("Naziv:").fill(job.position);
    await page.getByLabel("Opis delovnega mesta:").fill(job.description);
    await page.getByLabel("Opis postopka prijave na zaposlitev:").fill(job.application);
    await page.getByLabel("Lokacija:").fill(job.city);
    await expect(page.getByLabel("Naziv:")).toHaveValue(job.position);
    await expect(page.getByLabel("Opis delovnega mesta:")).toHaveValue(job.description);
    await expect(page.getByLabel("Opis postopka prijave na zaposlitev:")).toHaveValue(job.application);
    await expect(page.getByLabel("Lokacija:")).toHaveValue(job.city);
  });

  await test.step("4. Enkrat kliknemo »Dodaj oglas« in počakamo na zaključek oddaje", async () => {
    const saved = page.waitForResponse((res) => res.request().method() === "POST" && /\/job$/.test(res.url()));
    await page.getByRole("button", { name: "Dodaj oglas" }).click();
    expect((await saved).status()).toBe(201);
    await expect(page).toHaveURL(`/podjetje/${companySlug}`);
    await expect(newJob).toHaveCount(1);
  });

  await test.step("5. Na profilu kliknemo novi oglas", async () => {
    await newJob.click();
    await expect(page).toHaveURL(/\/zaposlitev\/[0-9a-f]{24}$/);
    await expect(page.getByRole("heading", { name: job.position, level: 1 })).toBeVisible();
    await expect(page.getByText(job.description)).toBeVisible();
    await expect(page.getByText(job.application)).toBeVisible();
    await expect(page.locator("p", { hasText: "Lokacija:" })).toHaveText(`Lokacija: ${job.city}`);
    // Povezava na podjetje v podrobnostih oglasa (ne ime prijavljenega podjetja v glavi strani).
    const linkedCompany = page.getByRole("link", { name: companyName }).and(page.locator(":not(header *)"));
    await expect(linkedCompany).toHaveAttribute("href", `/podjetje/${companySlug}`);
  });

  await test.step("6. Prek imena podjetja v glavi ponovno odpremo profil in ga osvežimo", async () => {
    await header(page).getByRole("link", { name: companyName }).click();
    await expect(page).toHaveURL(`/podjetje/${companySlug}`);
    await page.reload();
    await expect(page.getByRole("heading", { name: companyName, level: 1 })).toBeVisible();
    await expect(newJob).toHaveCount(1);
    await expect(profileJobs).toHaveCount(jobCountBefore + 1);
  });

  await test.step("Čiščenje: odjava (oglas, podjetje in račun odstrani skupni fixture)", async () => {
    await logOut(page);
  });
});

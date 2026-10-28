import { test, expect, header, logOut } from "../support/fixtures";
import {
  emulatorOutboxUrl,
  findAuthAccount,
  findAppUser,
  findVerificationMessage,
  unregisteredEmail,
  type OutboxMessage,
} from "../support/testData";

// TP-01 – Registracija s potrditvijo e-pošte na spodnji dovoljeni meji gesla (US1, F1)
test("TP-01 registracija s potrditvijo e-pošte in šestmestnim geslom", async ({ page, context }) => {
  const name = "Testna Oseba";
  const email = unregisteredEmail("tp01");
  const password = "Tst42!"; // 6 znakov – spodnja dovoljena meja

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
    await expect(page.getByRole("button", { name: "Registracija", exact: true })).toBeVisible();
  });

  await test.step("2. Vnesemo ime in priimek, e-pošto in geslo", async () => {
    await page.getByPlaceholder("Ime in priimek").fill(name);
    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Geslo").fill(password);
    await expect(page.getByPlaceholder("Ime in priimek")).toHaveValue(name);
    await expect(page.getByPlaceholder("Email")).toHaveValue(email);
    await expect(page.getByPlaceholder("Geslo")).toHaveAttribute("type", "password");
  });

  await test.step("3. Kliknemo »Registracija«", async () => {
    await page.getByRole("button", { name: "Registracija", exact: true }).click();
    await expect(
      page.getByText("Uspešna registracija! Na izbran email ste prejeli potrditveno povezavo."),
    ).toBeVisible();
    await expect(page).toHaveURL("/prijava");
  });

  // Testi ne uporabljajo pravega poštnega predala: Firebase Auth emulator hrani poslana sporočila,
  // zato »poštni predal« predstavlja seznam sporočil emulatorja, ki ga odpremo v drugem zavihku.
  const mailbox = await context.newPage();
  let message: OutboxMessage | undefined;

  await test.step("4. Preklopimo na zavihek s poštnim predalom uporabljenega naslova", async () => {
    await mailbox.goto(emulatorOutboxUrl);
    await expect(mailbox.locator("body")).toContainText(email);
  });

  await test.step("5. Odpremo potrditveno sporočilo te registracije", async () => {
    message = findVerificationMessage(JSON.parse(await mailbox.locator("body").innerText()), email);
    expect(message, "potrditveno sporočilo (VERIFY_EMAIL) za uporabljeni naslov").toBeDefined();
    expect(message!.oobLink).toContain("mode=verifyEmail");
  });

  await test.step("6. Kliknemo potrditveno povezavo", async () => {
    await mailbox.goto(message!.oobLink);
    await expect(mailbox.locator("body")).toContainText("The email has been successfully verified.");
    await expect(mailbox.locator("body")).toContainText(email);
    await expect.poll(async () => (await findAuthAccount(email))?.emailVerified).toBe(true);
  });

  await test.step("7. Na zavihku »Prijava« se prijavimo z istim naslovom in geslom", async () => {
    await page.bringToFront();
    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Geslo").fill(password);
    await page.getByRole("button", { name: "Prijava", exact: true }).click();
    await expect(page).toHaveURL("/");
    await expect(header(page).getByText(name)).toBeVisible();
    await expect(header(page).getByRole("button", { name: "Odjava" })).toBeVisible();
  });

  await test.step("8. Osvežimo domačo stran", async () => {
    await page.reload();
    await expect(header(page).getByText(name)).toBeVisible();
    await expect(header(page).getByRole("button", { name: "Odjava" })).toBeVisible();
    await expect(header(page).getByRole("link", { name: "Prijava" })).toHaveCount(0);
  });

  await test.step("Čiščenje: odjava (račun v emulatorju in bazi odstrani skupni fixture)", async () => {
    await logOut(page);
  });
});

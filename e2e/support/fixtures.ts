import { test as base, expect, type Page } from "@playwright/test";
import { resetTestData } from "./testData";

export const test = base.extend<{ cleanTestData: void }>({
  // Every test starts from an empty database and emulator and removes what it created,
  // so tests never depend on each other or on the order they run in.
  cleanTestData: [
    async ({}, use) => {
      await resetTestData();
      await use();
      await resetTestData();
    },
    { auto: true },
  ],
});

export { expect };

export const header = (page: Page) => page.locator("header");

/** Logs in through the login form and waits until the home page shows the signed-in user. */
export async function logIn(page: Page, email: string, password: string) {
  await page.goto("/prijava");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Geslo").fill(password);
  await page.getByRole("button", { name: "Prijava", exact: true }).click();
  await expect(page).toHaveURL("/");
  await expect(header(page).getByRole("button", { name: "Odjava" })).toBeVisible();
}

export async function logOut(page: Page) {
  await header(page).getByRole("button", { name: "Odjava" }).click();
  await expect(header(page).getByRole("link", { name: "Prijava" })).toBeVisible();
}

import { test as setup, expect } from "@playwright/test";
import { adminFile, userFile } from "../constants";
import { ADMIN, USER } from "../stubs/users";

setup.describe.configure({ mode: "serial" });
setup.describe("auth", () => {
  setup("authenticate as admin", async ({ page }) => {
    await page.goto("/auth/sign-in?callbackUrl=/");
    await page.getByLabel("Email").fill(ADMIN.email);
    await page.getByRole("button", { name: "Войти через Email" }).click();
    await page.getByRole("link", { name: "Упрощённый тестовый вход" }).click();
    await page.waitForURL("/");
    await expect(page.getByRole("button", { name: "AD" })).toBeVisible();
    await page.context().storageState({ path: adminFile });
  });
  setup("authenticate as user", async ({ page }) => {
    await page.goto("/auth/sign-in?callbackUrl=/");
    await page.getByLabel("Email").fill(USER.email);
    await page.getByRole("button", { name: "Войти через Email" }).click();
    // To handle verification emails
    await page.getByRole("link", { name: "Упрощённый тестовый вход" }).click();
    await page.waitForURL("/");
    await expect(page.getByRole("button", { name: "US" })).toBeVisible();
    await page.context().storageState({ path: userFile });
  });
});

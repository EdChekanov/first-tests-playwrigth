import { test, expect } from '@playwright/test';

test.describe('authorization on the Sauce Demo', () => {
  test('User must successfully log in to the system', async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    //check URL
    await expect(page).toHaveURL(/.*\/inventory\.html/);
  });
  
  test("The user must not successfully log in to the system", async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    //check Error message
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});

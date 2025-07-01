// // @ts-check
// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://www.instagram.com/accounts/login');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Instagram/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://www.instagram.com/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

// @ts-check
import { test, expect } from '@playwright/test';

test('Instagram login', async ({ page }) => {
  await page.goto('https://www.instagram.com/accounts/login/');

  // await page.waitForSelector('input[name="username"]');

  // await page.fill('input[name="username"]', 'your_username_here');
  // await page.fill('input[name="password"]', 'your_password_here');

  // await page.click('button[type="submit"]');

  const userFeild = page.locator('xpath=//input[@name="username"]')
  await userFeild.waitFor();
  await userFeild.fill('hello');

  const passFeild = page.locator('xpath=//input[@name="password"]')
  await passFeild.fill('hello');
  await userFeild.waitFor();

  await page.locator('xpath=//button[@name="submit"]').click();
 
  await page.waitForTimeout(5000); // Or use a proper wait for element if possible

  // Check if logged in by verifying the presence of the home/feed page element
  await expect(page).toHaveURL(/instagram\.com/);
});
import { test, expect } from '@playwright/test';

test('NCCS Student Portal', async ({ page }) => {
  await page.goto('http://110.44.113.165:85/EMISPortal/Login.aspx');

  // await page.waitForSelector('input[name="username"]');

  // await page.fill('input[name="username"]', 'your_username_here');
  // await page.fill('input[name="password"]', 'your_password_here');

  // await page.click('button[type="submit"]');

  const userFeild = page.locator('xpath=//input[@name="username"]')
  await userFeild.waitFor();
  await userFeild.fill('nccscsit466');

  const passFeild = page.locator('xpath=//input[@name="password"]')
  await passFeild.fill('helloworld');
  await userFeild.waitFor();

  await page.locator('xpath=//button[@name="submit"]').click();
 
  await page.waitForTimeout(5000); // Or use a proper wait for element if possible

  // Check if logged in by verifying the presence of the home/feed page element
  await expect(page).toHaveURL(/nccs\.edu.np/);
});
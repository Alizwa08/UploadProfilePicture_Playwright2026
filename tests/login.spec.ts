import 'dotenv/config';
import { test } from '@playwright/test';

test('open the login page', async ({ page }) => {
  await page.goto('https://ndosiautomation.co.za/');

  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('#login-email').fill(process.env.NDOSI_EMAIL!);
  await page.locator('#login-password').fill(process.env.NDOSI_PASSWORD!);
  await page.locator('#login-submit').click();


});


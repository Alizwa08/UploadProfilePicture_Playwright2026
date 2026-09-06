import { test, expect } from '@playwright/test';
import 'dotenv/config';
import process from 'process';

test('open the login page', async ({ page }) => {
  await page.goto('https://ndosiautomation.co.za/');

  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('#login-email').fill(process.env.NDOSI_EMAIL!);
  await page.locator('#login-password').fill(process.env.NDOSI_PASSWORD!);
  await page.locator('#login-submit').click();

  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByText('My Profile', { exact: true }).click();
  await page.getByRole('button', { name: 'Edit Profile' }).click();

  const avatarLocator = page.locator('div[style*="profile-images"]').first();
  const avatarBefore = await avatarLocator.getAttribute('style');

  await page.locator('#profilePicture').setInputFiles('test-data/Peony.jpeg');

  const [uploadResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/API/profile/image')),
    page.getByRole('button', { name: 'Save Changes' }).click(),
  ]);
  console.log('Upload response status:', uploadResponse.status());

  const avatarAfter = await avatarLocator.getAttribute('style');
  console.log('BEFORE:', avatarBefore);
  console.log('AFTER:', avatarAfter);
  expect(avatarAfter).not.toBe(avatarBefore);
});
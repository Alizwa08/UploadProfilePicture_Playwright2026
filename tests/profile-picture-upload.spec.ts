import { test, expect } from '@playwright/test';
import 'dotenv/config';
import process from 'process';

test('update profile picture', async ({ page }) => {
  await test.step('1. Login to the Ndosi automation test site', async () => {
    await page.goto('https://ndosiautomation.co.za/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('#login-email').fill(process.env.NDOSI_EMAIL!);
    await page.locator('#login-password').fill(process.env.NDOSI_PASSWORD!);
    await page.locator('#login-submit').click();
  });

  await test.step('2. Click menu', async () => {
    await page.getByRole('button', { name: 'Menu' }).click();
  });

  await test.step('3. Click My Profile', async () => {
    await page.getByText('My Profile', { exact: true }).click();
  });

  await test.step('4. Click Edit Profile', async () => {
    await page.getByRole('button', { name: 'Edit Profile' }).click();
  });

  let avatarBefore: string | null;
  let avatarAfter: string | null;

  await test.step('5. Upload a new profile picture', async () => {
    const avatarLocator = page.locator('div[style*="profile-images"]').first();
    avatarBefore = await avatarLocator.getAttribute('style');

    await page.locator('#profilePicture').setInputFiles('test-data/Peony.jpeg');

    const [uploadResponse] = await Promise.all([
      page.waitForResponse((response) => response.url().includes('/API/profile/image')),
      page.getByRole('button', { name: 'Save Changes' }).click(),
    ]);
    console.log('Upload response status:', uploadResponse.status());

    avatarAfter = await avatarLocator.getAttribute('style');
  });

  await test.step('6. Ensure the profile picture is updated', async () => {
    console.log('BEFORE:', avatarBefore);
    console.log('AFTER:', avatarAfter);
    expect(avatarAfter).not.toBe(avatarBefore);
  });
});
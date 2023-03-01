import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.URL || 'http://localhost:3000/'

test('has title', async ({ page }) => {
  await page.goto(URL);

  await expect(page).toHaveTitle(/CatBikes/);
});

test('rent without being logged', async ({ page }) => {
  await page.goto(URL);
  await page.locator('circle').nth(1).click();
  await page.getByRole('button', { name: 'DETAILS' }).click();
  await page.getByRole('button').first().click();
  // await page.getByRole('button', { name: 'Rent Bike' }).first().click();
  await expect(page).toHaveURL(/login/);
});

test('admin access dashboard', async ({ page }) => {
  await page.goto(URL);
  await page.getByText('Login').click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('asdasdasd');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('asdasdasd');
  await page.getByRole('button', { name: 'login' }).click();
  await expect(page).toHaveURL(URL);
  await page.getByText('Dashboard').click();
  await page.getByRole('button', { name: 'List Bikes' }).click();
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(URL);
});

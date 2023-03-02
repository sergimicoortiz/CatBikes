import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.URL || 'http://localhost:3000/'
const screenshotPath = './screenshots/';

test('has title', async ({ page }) => {
  await page.goto(URL);

  await expect(page).toHaveTitle(/CatBikes/);
});

test('rent without being logged', async ({ page }) => {
  await page.goto(URL);
  await page.locator('circle').nth(1).click();
  await page.getByRole('button', { name: 'DETAILS' }).click();
  await page.getByRole('button').first().click();
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


test('register test', async ({ page }) => {
  const user: string = faker.name.firstName();
  const email: string = faker.internet.email();
  const password: string = faker.internet.password(20) + '1Aa**';

  await page.goto(URL);
  await page.getByText('Login').click();
  await page.getByText('Create an account').click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill(user);
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password', { exact: true }).fill(password);
  await page.getByPlaceholder('Password', { exact: true }).press('Tab');
  await page.getByPlaceholder('Repeat password').fill(password);
  await page.getByRole('button', { name: 'register' }).click();
  await page.waitForTimeout(500);
  await page.getByText(user).click();
  await expect(page).toHaveURL(/profile/);
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(URL);
});
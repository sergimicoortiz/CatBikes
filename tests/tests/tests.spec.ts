import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.URL || 'http://localhost:3000/';
const URL_DRF = process.env.URL_DRF || 'http://localhost:8000/api/';
const URL_GQL = process.env.URL_GQL || 'http://localhost:4000/';
const ADMIN_USER = process.env.ADMIN_USER || 'asdasdasd';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'asdasdasd';
const DEFAULT_SLEEP = 2000;

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
  await page.getByPlaceholder('Username').fill(ADMIN_USER);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
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
  console.log('USER FOR THE REGISTER TEST:');
  console.log({ user, email, password });

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
  await page.waitForTimeout(DEFAULT_SLEEP);
  await page.getByText(user).click();
  await expect(page).toHaveURL(/profile/);
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(URL);
});

test('snapshots', async ({ page }) => {
  //Take screenshots of the home, register and login pages
  await page.goto(URL);
  await page.waitForTimeout(DEFAULT_SLEEP);
  await expect(page).toHaveScreenshot('home.png', { maxDiffPixels: 100 });

  await page.goto(URL + "register");
  await page.waitForTimeout(DEFAULT_SLEEP);
  await expect(page).toHaveScreenshot('register.png', { maxDiffPixels: 100 });

  await page.goto(URL + "login");
  await page.waitForTimeout(DEFAULT_SLEEP);
  await expect(page).toHaveScreenshot('login.png', { maxDiffPixels: 100 });

  //Login with admin account and take a screenshot of the dashboard
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill(ADMIN_USER);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'login' }).click();
  await page.waitForTimeout(DEFAULT_SLEEP);
  await page.goto(URL + "dashboard");
  await page.waitForTimeout(DEFAULT_SLEEP);
  await expect(page).toHaveScreenshot('dashboard.png', { maxDiffPixels: 100 });
  await page.getByText('Logout').click();
  await expect(page).toHaveURL(URL);

});

test('drf api test', async ({ request }) => {
  //Test the DRF API
  const responseStationsDRF = await request.get(URL_DRF + "station");
  expect(responseStationsDRF.ok()).toBeTruthy();

  const responseBikesDRF = await request.get(URL_DRF + "bikes");
  expect(responseBikesDRF.ok()).toBeTruthy();

  const respsponseSlotsDRF = await request.get(URL_DRF + "slot");
  expect(respsponseSlotsDRF.ok()).toBeTruthy();

  //Test the GQL API

  const responseStationsGQL = await request.post(URL_GQL, {
    data: {
      query: `
    query{
      stations {
        id
        slug
        slots {
          id
          status
        }
      }
    }`
    }
  });
  expect(responseStationsGQL.ok()).toBeTruthy();

  const responseBikesGQL = await request.post(URL_GQL, {
    data: {
      query: `
    query{
      bikes {
        id
        slug
      }
    }`
    }
  });
  expect(responseBikesGQL.ok()).toBeTruthy();

});
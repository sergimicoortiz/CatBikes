import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const URL = process.env.URL || 'http://localhost:3000/'

test('has title', async ({ page }) => {
  await page.goto(URL);

  await expect(page).toHaveTitle(/CatBikes/);
});


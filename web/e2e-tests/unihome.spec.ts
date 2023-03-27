import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test.describe('UniHome', () => {
  test('allows user to do a quick search of suburbs', async ({ page }) => {
    await expect(page.locator('#university-select')).toBeVisible();

    await page.locator('div#university-select').click();

    await page.locator('li:has-text("Monash University - Caulfield")').click();

    await page.locator('div#priority-factor-select').click();

    await page.locator('li:has-text("Safety")').click();

    await page.locator('text=/Quick Search/i').click();

    await expect(page.locator('text=/top suburbs for/i')).toBeVisible();
  });

  test('shows error when user attempts a Quick Search with no university is selected', async ({
    page,
  }) => {
    await page.locator('div#priority-factor-select').click();

    await page.locator('li:has-text("Safety")').click();

    await page.locator('text=/Quick Search/i').click();

    const topSuburbsTitleCount = await page.locator('text=/top suburbs for/i').count();

    expect(topSuburbsTitleCount).toEqual(0);

    await expect(page.locator('text=/Please select a university first/i')).toBeVisible();
  });

  test('allows user to do a weighted advanced search of suburbs', async ({ page }) => {
    await page.locator('text=/Advanced Search/i').click();

    await page.locator('div#university-select').click();

    await page.locator('li:has-text("Monash University - Caulfield")').click();

    await page.locator('button', { hasText: 'Search' }).click();

    await expect(page.locator('text=/top suburbs for/i')).toBeVisible();
  });
});

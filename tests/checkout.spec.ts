import { test, expect } from '@playwright/test';

test('standard user can complete a purchase', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    await page.getByText('Sauce Labs Backpack', { exact: true }).click();

    await expect(
        page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();
    await expect(
        page.getByRole('button', { name: 'Back to products' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Add to cart' }).click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('.shopping_cart_link').click();

    await expect(
        page.getByText('Your Cart', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();
    await expect(
        page.getByRole('button', { name: 'Checkout' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').fill('Luke');
    await page.getByPlaceholder('Last Name').fill('Skywalker');
    await page.getByPlaceholder('Zip/Postal Code').fill('11423');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(
        page.getByText('Checkout: Overview', { exact: true })
    ).toBeVisible();
    await expect(
        page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();
    await expect(
        page.getByRole('button', { name: 'Finish', exact: true })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(
        page.getByText('Checkout: Complete!', { exact: true })
    ).toBeVisible();
    await expect(
        page.getByText('Thank you for your order!', { exact: true })
    ).toBeVisible();
    await expect(
        page.getByRole('button', { name: 'Back Home', exact: true })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
});
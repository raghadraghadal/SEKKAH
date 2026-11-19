const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:8080';

test.describe('SEKKAH Functional Tests', () => {

  test('1. الصفحة الرئيسية تفتح بنجاح', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/index.html`);
    expect(response.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });

  test('2. صفحة تسجيل الدخول تحتوي على حقول الإدخال وزر الدخول', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/Login.html`);
    expect(response.status()).toBe(200);
    await expect(page.locator('input').first()).toBeVisible();
    await expect(page.locator('button, input[type="submit"]').first()).toBeVisible();
  });

  test('3. صفحة إنشاء حساب جديد تفتح وتعرض النموذج', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/SingUp.html`);
    expect(response.status()).toBe(200);
    await expect(page.locator('input').first()).toBeVisible();
  });

  test('4. صفحات إدارة القطارات والحجوزات والجداول تعمل بدون أخطاء', async ({ page }) => {
    const pages = [
      'home.html',
      'Dashboard.html',
      'Reservation%20system%20.html',
      'Viewtimetable.html',
      'Train%20Information.html',
      'Passenger%20Management.html'
    ];

    for (const fileName of pages) {
      const response = await page.goto(`${BASE_URL}/${fileName}`);
      expect(response.status()).toBe(200);
      await expect(page.locator('body')).toBeVisible();
    }
  });

});
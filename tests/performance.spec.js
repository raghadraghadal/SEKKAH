const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://127.0.0.1:8080';

test.describe('SEKKAH Non-Functional Performance Tests', () => {

  test('NF-1: Page load time and TTFB within acceptable threshold', async ({ page }) => {
    const pagesToCheck = [
      'index.html',
      'home.html',
      'Dashboard.html',
      'addNewTrain.html',
      'Viewtimetable.html'
    ];

    for (const fileName of pagesToCheck) {
      const startTime = Date.now();
      const response = await page.goto(`${BASE_URL}/${fileName}`, { waitUntil: 'load' });
      const totalLoadTime = Date.now() - startTime;

      expect(response).not.toBeNull();
      expect(response.status()).toBe(200);

      const timing = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0];
        if (!nav) return null;
        return {
          ttfbMs: Math.round(nav.responseStart - nav.requestStart),
          domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
          loadEventMs: Math.round(nav.loadEventEnd - nav.startTime)
        };
      });

      console.log(
        `[Performance] ${fileName} -> Total: ${totalLoadTime}ms | TTFB: ${timing?.ttfbMs ?? 'N/A'}ms | DCL: ${timing?.domContentLoadedMs ?? 'N/A'}ms`
      );

      // حد قبول عملي في بيئة الاختبار المحلية (أقل من 3000 مللي ثانية)
      expect(totalLoadTime).toBeLessThan(3000);
    }
  });

  test('NF-2: Add Train UI interaction responds quickly', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('userName', 'Admin');
    });

    await page.goto(`${BASE_URL}/addNewTrain.html`, { waitUntil: 'load' });

    const startAction = Date.now();
    await page.fill('#trainNumber', '909');
    await page.fill('#capacity', '80');
    await page.click('#availBtn');
    await page.click('button:has-text("Add Train")');
    await expect(page.locator('#msg')).toHaveText('Train added successfully!');
    const actionDuration = Date.now() - startAction;

    console.log(`[Performance] Add Train UI flow duration -> ${actionDuration}ms`);
    expect(actionDuration).toBeLessThan(2000);
  });

});


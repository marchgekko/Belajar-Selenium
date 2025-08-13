// tests/sesi11-test_sauce.js
import assert from 'assert';
import { Builder, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';

import LoginPage from '../pages/loginPage.js';
import InventoryPage from '../pages/inventoryPage.js';
import { takeFullScreenshot, takePartialScreenshot } from '../helpers/screenshotHelper.js';
import { compareScreenshot } from '../helpers/visualHelper.js';

describe('Sesi 11 - SauceDemo Automation Test (POM + Visual Testing)', function () {
  this.timeout(30000);
  let driver, loginPage, inventoryPage;

  before(async () => {
    const browser = process.env.BROWSER || 'chrome';
    const mode = process.env.MODE || 'headed';
    let builder = new Builder().forBrowser(browser);

    if (browser === 'chrome') {
      let options = new chrome.Options().addArguments('--incognito');
      if (mode === 'headless') {
        options.addArguments('--headless', '--disable-gpu', '--window-size=1920,1080');
      }
      builder.setChromeOptions(options);
    } else if (browser === 'firefox') {
      let options = new firefox.Options().addArguments('-private');
      if (mode === 'headless') {
        options.headless();
      }
      builder.setFirefoxOptions(options);
    }

    driver = await builder.build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  afterEach(async function () {
    const testName = this.currentTest.title.replace(/\s+/g, '_');
    try {
      await takeFullScreenshot(driver, testName);
      await takePartialScreenshot(driver, By.css('body'), testName);
    } catch (err) {
      console.warn(`⚠ Screenshot gagal di test "${testName}": ${err.message}`);
    }
  });

  it('Login ke SauceDemo', async () => {
    await loginPage.open();
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Swag Labs');
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.isLoginSuccessful();
  });

  it('Mengurutkan produk dari Z ke A', async () => {
    await inventoryPage.sortByZtoA();
    const productName = await inventoryPage.getFirstProductName();
    assert.strictEqual(
      productName,
      'Test.allTheThings() T-Shirt (Red)',
      'Produk pertama tidak sesuai Z-A'
    );
  });

  // ✅ Test Visual Compare
  it('Visual Test - Halaman Login', async () => {
    await loginPage.open();
  const { isMatch, diffPixels, diffPath } = await compareScreenshot(driver, 'LoginPage');
  
    // Kalau mau otomatis fail kalau ada perbedaan:
    assert.strictEqual(isMatch, true, `Visual mismatch ditemukan (${diffPixels} pixel berbeda)`);
  });
});

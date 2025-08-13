const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

describe('Sesi 9 - SauceDemo Automation Test', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    const browser = process.env.BROWSER || 'chrome';
    let builder = new Builder().forBrowser(browser);

    if (browser === 'chrome') {
      const options = new chrome.Options().addArguments('--incognito');
      builder.setChromeOptions(options);
    } else if (browser === 'firefox') {
      const options = new firefox.Options().addArguments('-private');
      builder.setFirefoxOptions(options);
    }

    driver = await builder.build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Login ke SauceDemo', async () => {
    await driver.get('https://www.saucedemo.com');

    // Verifikasi title
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Swag Labs', 'Title halaman tidak sesuai');

    // Login
    await driver.findElement(By.css('[data-test="username"]')).sendKeys('standard_user');
    await driver.findElement(By.css('[data-test="password"]')).sendKeys('secret_sauce');
    await driver.findElement(By.css('[data-test="login-button"]')).click();

    // Verifikasi login berhasil
    const cartIcon = await driver.wait(
      until.elementLocated(By.css('[data-test="shopping-cart-link"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(cartIcon), 5000);
    assert.ok(await cartIcon.isDisplayed(), 'Ikon keranjang tidak muncul setelah login');
  });

  it('Mengurutkan produk dari Z ke A', async () => {
    // Dropdown sorting
    const dropdownSort = await driver.wait(
      until.elementLocated(By.css('[data-test="product-sort-container"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(dropdownSort), 5000);
    await dropdownSort.sendKeys('Name (Z to A)');

    // Ambil produk pertama
    const firstProduct = await driver.wait(
      until.elementLocated(By.className('inventory_item_name')),
      10000
    );
    const productName = await firstProduct.getText();

    // Validasi hasil sorting
    assert.strictEqual(
      productName,
      'Test.allTheThings() T-Shirt (Red)',
      'Produk pertama tidak sesuai urutan Z-A'
    );
  });
});

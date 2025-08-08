const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

// 🔹 Fungsi buat driver baru (normal UI + incognito)
async function createDriver() {
  const options = new chrome.Options();
  options.addArguments('--incognito'); // tetap incognito

  return await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

// 🔹 Fungsi login reusable
async function login(driver) {
  await driver.get('https://www.saucedemo.com');

  // Cek page title
  const title = await driver.getTitle();
  assert.strictEqual(title, 'Swag Labs', 'Title halaman tidak sesuai');

  // Cari elemen input username, password, dan tombol login
  let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
  let inputPassword = await driver.findElement(By.css('[data-test="password"]'));
  let buttonLogin   = await driver.findElement(By.css('[data-test="login-button"]'));

  // Input login
  await inputUsername.sendKeys('standard_user');
  await inputPassword.sendKeys('secret_sauce');
  await buttonLogin.click();

  // Tunggu ikon keranjang
  let cartIcon = await driver.wait(
    until.elementLocated(By.css('[data-test="shopping-cart-link"]')),
    10000
  );
  await driver.wait(until.elementIsVisible(cartIcon), 5000);

  // Validasi teks logo
  const logo = await driver.findElement(By.className('app_logo'));
  const logoText = await logo.getText();
  assert.strictEqual(logoText, 'Swag Labs', 'Teks logo tidak sesuai');
}

describe('SauceDemo Automation Test - Tanpa before/after (GUI Mode)', function () {
  this.timeout(30000);

  it('Login ke SauceDemo', async () => {
    const driver = await createDriver();
    try {
      await login(driver);
    } finally {
      await driver.quit();
    }
  });

  it('Mengurutkan produk dari Z ke A', async () => {
    const driver = await createDriver();
    try {
      await login(driver);

      // Tunggu dropdown sortir
      let dropdownSort = await driver.wait(
        until.elementLocated(By.css('[data-test="product-sort-container"]')),
        10000
      );
      await driver.wait(until.elementIsVisible(dropdownSort), 5000);

      // Pilih "Name (Z to A)"
      await dropdownSort.sendKeys('Name (Z to A)');

      // Tunggu produk pertama sesuai
      const firstProduct = await driver.wait(
        until.elementLocated(By.className('inventory_item_name')),
        10000
      );
      const productName = await firstProduct.getText();
      assert.strictEqual(
        productName,
        'Test.allTheThings() T-Shirt (Red)',
        'Produk pertama tidak sesuai Z-A'
      );
    } finally {
      await driver.quit();
    }
  });
});

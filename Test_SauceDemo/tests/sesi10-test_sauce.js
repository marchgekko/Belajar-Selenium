const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

// 🔹 Fungsi Membuat Driver
async function createDriver(browser = 'chrome', mode = 'headed') {
  let builder = new Builder().forBrowser(browser);

  if (browser === 'chrome') {
    let options = new chrome.Options().addArguments('--incognito');
    if (mode === 'headless') {
      options.addArguments('--headless', '--disable-gpu', '--window-size=1920,1080');
    }
    builder.setChromeOptions(options);
  } 
  else if (browser === 'firefox') {
    let options = new firefox.Options().addArguments('-private');
    if (mode === 'headless') {
      options.headless();
    }
    builder.setFirefoxOptions(options);
  }

  return await builder.build();
}

// 🔹 Fungsi Login
async function login(driver) {
  await driver.get('https://www.saucedemo.com');

  const title = await driver.getTitle();
  assert.strictEqual(title, 'Swag Labs', 'Title halaman tidak sesuai');

  let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
  let inputPassword = await driver.findElement(By.css('[data-test="password"]'));
  let buttonLogin   = await driver.findElement(By.css('[data-test="login-button"]'));

  await inputUsername.sendKeys('standard_user');
  await inputPassword.sendKeys('secret_sauce');
  await buttonLogin.click();

  let cartIcon = await driver.wait(
    until.elementLocated(By.css('[data-test="shopping-cart-link"]')),
    10000
  );
  await driver.wait(until.elementIsVisible(cartIcon), 5000);

  const logo = await driver.findElement(By.className('app_logo'));
  const logoText = await logo.getText();
  assert.strictEqual(logoText, 'Swag Labs', 'Teks logo tidak sesuai');
}


// 🔹 Fungsi Logout (dengan pengecekan & wait animasi menu)
async function logout(driver) {
  try {
    // Cek apakah tombol menu ada
    let menuButton = await driver.findElement(By.id('react-burger-menu-btn'));
    await driver.wait(until.elementIsVisible(menuButton), 3000);
    await menuButton.click();

    // Tunggu tombol logout muncul
    let logoutLink = await driver.wait(
      until.elementLocated(By.id('logout_sidebar_link')),
      3000
    );
    await driver.wait(until.elementIsVisible(logoutLink), 3000);
    await logoutLink.click();

    await driver.sleep(500); // beri waktu untuk proses logout
  } catch (err) {
    console.warn('Logout dilewati (elemen tidak ditemukan)');
  }
}

// 🔹 Test Suite
describe('SauceDemo Automation Test - Cross Browser & Headless/Headed', function () {
  this.timeout(30000);
  let driver;

  // before → setup driver sekali sebelum semua test
  before(async () => {
    console.log('before() → Membuat driver (Chrome Headed)');
    driver = await createDriver('chrome', 'headed');
  });

  // beforeEach → login sebelum setiap test
  beforeEach(async () => {
    console.log('beforeEach() → Login sebelum test');
    await login(driver);
  });

  // afterEach → logout setelah setiap test
  afterEach(async () => {
    console.log('afterEach() → Logout setelah test');
    await logout(driver);
  });

  // after → tutup driver sekali setelah semua test selesai
  after(async () => {
    console.log('after() → Menutup driver');
    await driver.quit();
  });

  // 🔹 Test Case

  it('Login ke SauceDemo', async () => {
    const logo = await driver.findElement(By.className('app_logo'));
    const logoText = await logo.getText();
    assert.strictEqual(logoText, 'Swag Labs');
  });

  it('Mengurutkan produk dari Z ke A', async () => {
    let dropdownSort = await driver.wait(
      until.elementLocated(By.css('[data-test="product-sort-container"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(dropdownSort), 5000);

    await dropdownSort.sendKeys('Name (Z to A)');

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
  });
});

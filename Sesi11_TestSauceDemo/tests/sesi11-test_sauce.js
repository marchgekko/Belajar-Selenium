const assert = require('assert');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

describe('Sesi 11 - SauceDemo Automation Test (POM, tanpa driverFactory)', function () {
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
});

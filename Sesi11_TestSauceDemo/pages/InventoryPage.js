import { By, until } from 'selenium-webdriver';

export default class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.sortDropdown = By.css('[data-test="product-sort-container"]');
    this.firstProductName = By.className('inventory_item_name');
  }

  async sortByZtoA() {
    let dropdown = await this.driver.wait(until.elementLocated(this.sortDropdown), 10000);
    await this.driver.wait(until.elementIsVisible(dropdown), 5000);
    await dropdown.sendKeys('Name (Z to A)');
  }

  async getFirstProductName() {
    const firstProduct = await this.driver.wait(until.elementLocated(this.firstProductName), 10000);
    return firstProduct.getText();
  }
}

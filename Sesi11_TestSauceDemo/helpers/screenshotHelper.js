import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { until } from 'selenium-webdriver';

// Setup __dirname untuk ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Timestamp untuk nama file
function getTimestamp() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}_${String(
    now.getDate()
  ).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(
    now.getMinutes()
  ).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
}

// 📸 Screenshot Full Page
export async function takeFullScreenshot(driver, testName) {
  const screenshotBase64 = await driver.takeScreenshot();
  const fileName = `${testName}_FULL_${getTimestamp()}.png`;
  const filePath = path.join(__dirname, '../screenshots', fileName);
  fs.writeFileSync(filePath, screenshotBase64, 'base64');
  console.log(`✅ Full screenshot disimpan: ${filePath}`);
}

// 📸 Screenshot Partial Elemen
export async function takePartialScreenshot(driver, locator, testName, suffix = '') {
  const elements = await driver.findElements(locator);
  if (elements.length === 0) {
    console.warn(`⚠ Elemen ${locator} tidak ditemukan. Screenshot dilewati.`);
    return;
  }

  const element = elements[0];
  await driver.wait(until.elementIsVisible(element), 5000);

  // Tambahkan border merah biar kelihatan
  await driver.executeScript(
    "arguments[0].style.border='3px solid red'; arguments[0].style.backgroundColor='rgba(255,0,0,0.1)';",
    element
  );

  const screenshotBase64 = await element.takeScreenshot(true);
  const fileName = `${testName}_${suffix || 'PARTIAL'}_${getTimestamp()}.png`;
  const filePath = path.join(__dirname, '../screenshots', fileName);
  fs.writeFileSync(filePath, screenshotBase64, 'base64');
  console.log(`✅ Partial screenshot disimpan: ${filePath}`);
}

// helpers/visualHelper.js
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

export async function compareScreenshot(driver, testName) {
  const screenshotDir = './visual';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  const currentPath = `${screenshotDir}/${testName}_current.png`;
  const baselinePath = `${screenshotDir}/${testName}_baseline.png`;
  const diffPath = `${screenshotDir}/${testName}_diff.png`;

  // Ambil screenshot terbaru
  let screenshot = await driver.takeScreenshot();
  fs.writeFileSync(currentPath, Buffer.from(screenshot, 'base64'));

  // Jika baseline belum ada → simpan sebagai baseline
  if (!fs.existsSync(baselinePath)) {
    fs.copyFileSync(currentPath, baselinePath);
    console.log(`✅ Baseline disimpan: ${baselinePath}`);
    return { isMatch: true, diffPixels: 0 };
  }

  // Baca gambar
  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(currentPath));

  // Pastikan ukuran sama
  if (img1.width !== img2.width || img1.height !== img2.height) {
    console.warn('⚠ Ukuran gambar berbeda, baseline diupdate.');
    fs.copyFileSync(currentPath, baselinePath);
    return { isMatch: false, diffPixels: -1 };
  }

  const { width, height } = img1;
  const diff = new PNG({ width, height });

  // Bandingkan gambar
  const diffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

  // Simpan diff
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const isMatch = diffPixels === 0;
  if (isMatch) {
    console.log(`✅ Visual test "${testName}" → Tidak ada perbedaan.`);
  } else {
    console.log(`❌ Visual test "${testName}" → ${diffPixels} pixel berbeda. Diff: ${diffPath}`);
  }

  return { isMatch, diffPixels };
}

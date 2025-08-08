# 📌 Belajar-Selenium

Proyek ini berisi contoh otomatisasi pengujian web menggunakan **Selenium WebDriver** dengan **Mocha** dan laporan **Mochawesome**.  
Mendukung pengujian multi-browser (**Chrome & Firefox**) serta mode **headed** / **headless**.

---

## 🚀 Menjalankan Test

### 1. Sesi 9  
Menjalankan test di `tests/sesi9-test_sauce.js` (Chrome headed default):

```bash
npm run test:sesi9
```

### 2. Sesi 10  
Menjalankan test di `tests/sesi10-test_sauce.js` dengan pilihan browser & mode:

```bash
npm run test:sesi10                # Chrome headed
npm run test:sesi10:firefox        # Firefox headless
npm run test:sesi10:chrome-headless # Chrome headless
```

### 3. Semua Test
Menjalankan semua file test di folder  `tests/` :

```
npm run test:all
```

---
## 📄 Laporan Hasil Test
Setelah test selesai, laporan akan tersimpan di:
```
`mochawesome-report/`
Buka file mochawesome.html di browser untuk melihat laporan visual.
```

---
## 🛠 Teknologi yang Digunakan
- Node.js
- Selenium WebDriver
- Mocha
- Mochawesome
- JavaScript (ES6)






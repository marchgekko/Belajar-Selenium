# Belajar-Selenium
by **Andrean Martasyah**

Sebuah repositori berisi contoh-contoh otomatisasi pengujian web menggunakan Selenium WebDriver, 
dikombinasikan dengan framework Mocha untuk pengujian, serta Mochawesome untuk laporan hasil pengujian visual.

## Teknologi yang Digunakan
- Node.js (pastikan versi kompatibel—misalnya v14+)
- Selenium WebDriver
- Mocha sebagai framework pengujian
- Mochawesome untuk laporan hasil pengujian
- Browser Chrome dan/atau Firefox (dengan dukungan mode headed dan headless)

## Persiapan & Instalasi
`git clone https://github.com/marchgekko/Belajar-Selenium.git
cd Belajar-Selenium
npm instal`

## Menjalankan Pengujian
- Sesi 9 – Contoh pengujian menggunakan Chrome headed:
  `npm run test:sesi9`
- Sesi 10 – Pengujian dengan kombinasi browser dan mode:
  `-npm run test:sesi10 → Chrome (headed)
  -npm run test:sesi10:firefox → Firefox (headless)
  -npm run test:sesi10:chrome-headless → Chrome (headless)`
- Semua pengujian (Sesi 9 & Sesi 10)
  `npm run test:all`
  
- Sesi 11 - Page Object Model (POM) 
  Fitur tambahan:
    - Screenshot otomatis pada akhir setiap test
    - Struktur kode modular untuk kemudahan maintenance
      
  Menjalankan Sesi 11:
  `npm run test`
  
## Laporan Hasil Pengujian
Hasil pengujian akan ditampilkan melalui laporan interaktif dalam folder mochawesome-report/. Bukalah file mochawesome.html di browser untuk melihat hasil pengujian secara visual.

## Struktur Direktori
`Belajar-Selenium/
├── Sesi9-10_Test_SauceDemo/
│ ├── mochawesome-report/   # Laporan hasil pengujian Sesi 9 & 10
│ ├── node_modules/         # Dependensi Node.js
│ ├── tests/               # Script test Sesi 9 & 10
│ ├── .gitignore
│ ├── package-lock.json
│ └── package.json
│
├── Sesi11_TestSauceDemo/
│ ├── helpers/                 # Helper untuk fitur tambahan
│ │ ├── screenshotHelper.js   # Fungsi ambil screenshot otomatis
│ │ └── visualHelper.js       # Fungsi visual comparison (Pixelmatch)
│ │
│ ├── mochawesome-report/     # Laporan hasil pengujian Sesi 11
│ │ ├── assets/
│ │ ├── mochawesome.html
│ │ └── mochawesome.json
│ │
│ ├── node_modules/   # Dependensi Node.js
│ ├── pages/         # Page Object Model files
│ ├── screenshots/   # Hasil screenshot otomatis
│ ├── tests/         # Script test Sesi 11
│ ├── visual/         # File referensi & hasil perbandingan visual
│ ├── .gitignore
│ ├── package-lock.json
│ └── package.json
│
└── README.md `


## Kontribusi
Silakan untuk fork dan ajukan pull request!

## Author
[Andrean Martsyah](https://github.com/marchgekko)(https://www.instagram.com/andreanmarta00/)
[![GitHub followers](https://img.shields.io/github/followers/marchgekko?style=social)](https://github.com/marchgekko)


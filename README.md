# 📌 Belajar-Selenium

Proyek ini berisi contoh otomatisasi pengujian web menggunakan **Selenium WebDriver** dengan **Mocha** dan laporan **Mochawesome**.  
Mendukung pengujian **multi-browser** (Chrome & Firefox) dan mode **headed / headless**.

---

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/marchgekko/Belajar-Selenium.git
   cd Belajar-Selenium
Install dependencies

bash
Copy
Edit
npm install
🚀 Menjalankan Test
1. Sesi 9
Menjalankan test di tests/sesi9-test_sauce.js (Chrome headed default):

bash
Copy
Edit
npm run test:sesi9
2. Sesi 10
Menjalankan test di tests/sesi10-test_sauce.js dengan pilihan browser & mode:

bash
Copy
Edit
npm run test:sesi10                  # Chrome headed
npm run test:sesi10:firefox           # Firefox headless
npm run test:sesi10:chrome-headless   # Chrome headless
3. Semua Test
Menjalankan semua file test di folder tests/:

bash
Copy
Edit
npm run test:all
📄 Laporan Hasil Test
Setelah test selesai, laporan akan tersimpan di:

Copy
Edit
mochawesome-report/
Buka file mochawesome.html di browser untuk melihat laporan visual.

⚙️ Konfigurasi Browser & Mode
Browser dan mode bisa diatur lewat environment variable tanpa mengubah kode:

bash
Copy
Edit
BROWSER=firefox MODE=headless npm run test:sesi10
Pilihan Browser: chrome | firefox
Pilihan Mode: headed | headless

🛠 Teknologi yang Digunakan
Node.js

Selenium WebDriver

Mocha

Mochawesome

JavaScript (ES6)

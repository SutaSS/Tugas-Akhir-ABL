🏥 Klinik Sehat Selalu – Product Requirements Document (PRD)
📌 1. Overview

Klinik Sehat Selalu ingin membangun sistem pelayanan kesehatan online yang mengintegrasikan seluruh proses layanan pasien, mulai dari pendaftaran hingga pembayaran. Sistem ini dibuat untuk meningkatkan efisiensi operasional, mengurangi antrian manual, mempercepat pelayanan, dan memberikan pengalaman digital yang lebih baik kepada pasien.

Sistem akan berbasis web dan mengimplementasikan service-based architecture yang terdiri dari beberapa modul terpisah (Patient Service, Medical Record Service, Pharmacy Service, Billing Service, dll).

🎯 2. Goals & Objectives
🎯 Tujuan Utama

Mempermudah pasien dalam mengakses layanan klinik secara digital.

Mempercepat alur pelayanan medis (pendaftaran – perawat – dokter – apotek – kasir).

Mengurangi kesalahan manual dan meningkatkan akurasi rekam medis.

Meningkatkan transparansi biaya dan riwayat medis kepada pasien.

Mempermudah admin dalam monitoring operasional klinik.

📌 Key Objectives

Menyediakan sistem pendaftaran online yang valid dan real-time.

Menyediakan rekam medis digital yang lengkap dan mudah diakses internal.

Integrasi otomatis antara dokter, perawat, apotek, kasir, dan admin.

Menyediakan laporan harian untuk manajemen klinik.

👥 3. Users (User Personas)
👤 1. Pasien

Mengakses pendaftaran online

Melihat riwayat medis dan pembayaran

Mendapat notifikasi status layanan

Mengambil obat dan melihat resep

Memberikan feedback

👤 2. Admin

Verifikasi pendaftaran

Pemberian nomor antrian digital

Monitoring laporan dan status pelayanan

Pengaturan jadwal dokter/perawat

👤 3. Perawat

Mengisi pemeriksaan awal

Melihat riwayat medis sebelumnya

Memberikan catatan tambahan

👤 4. Dokter

Mencatat diagnosa dan tindakan

Membuat resep digital atau rujukan

Mengakses rekam medis lengkap

Menandai pasien untuk kontrol lanjutan

👤 5. Apoteker

Melihat resep

Mengelola stok obat

Menyediakan obat untuk pasien

👤 6. Kasir

Mengelola pembayaran

Mengeluarkan bukti pembayaran

Menentukan metode pembayaran

Menampilkan rincian biaya

🚀 4. System Architecture Overview

Sistem akan menggunakan Service-Based Architecture (modular monolith / microservice-ready).

Service yang digunakan

Patient Service

Medical Record Service

Pharmacy Service

Billing Service

Admin & Reporting Service

Notification Service

Setiap service menyediakan API khusus sesuai domain bisnis masing-masing.

🔧 5. Functional Requirements
🧩 5.1 Patient Service

Registrasi & login pasien

Pengisian form pendaftaran

Mendapatkan nomor antrian digital

Melihat riwayat pemeriksaan, resep, dan pembayaran

Memberikan feedback

🧩 5.2 Medical Record Service

Perawat mencatat pemeriksaan awal (tekanan darah, suhu, BB, TB, saturasi)

Dokter mencatat diagnosa & pemeriksaan lanjutan

Dokter membuat resep dan rujukan

Sistem menyimpan rekam medis lengkap

Dokter menandai jadwal kontrol lanjutan

🧩 5.3 Pharmacy Service

Apoteker melihat resep digital

Menyiapkan obat

Mengurangi stok otomatis

Memberi peringatan stok menipis

🧩 5.4 Billing Service

Menampilkan rincian biaya pasien

Mencatat pembayaran

Memilih metode pembayaran (tunai/transfer/kartu)

Mengeluarkan bukti pembayaran

🧩 5.5 Admin & Reporting Service

Verifikasi data pendaftaran

Menetapkan nomor antrian digital

Pengaturan jadwal dokter/perawat

Membuat laporan harian

🧩 5.6 Notification Service

Notifikasi verifikasi pendaftaran

Notifikasi giliran pemeriksaan

Notifikasi obat siap diambil

Notifikasi pembayaran berhasil

📊 6. Non-Functional Requirements
⚡ Performance

API response < 200–400 ms

Dapat melayani minimal 100 pengguna aktif bersamaan

🔐 Security

JWT authentication

Password hashing (bcrypt)

Validasi input dan sanitasi

Role-based access control (RBAC)

💾 Reliability

Daily auto-backup database

Downtime < 0.1%

🔧 Scalability

Service bisa dipisah menjadi microservice jika diperlukan

📱 Usability

UI sederhana, mobile-friendly

Notifikasi real-time

🗂 7. Database Overview

Jenis database: MySQL / PostgreSQL

Entity utama:

Pasien

FormPendaftaran

PemeriksaanAwal

RekamMedis

Resep

Obat

Transaksi

RincianBiaya

Jadwal

Laporan

Admin/Perawat/Dokter/Kasir (Users)

(Relasi lengkap mengikuti ERD sistem.)

🔌 8. API Overview
Contoh API Medical Record Service
POST /perawat/pemeriksaan-awal
GET /rekammedis/:id
POST /dokter/diagnosa
POST /dokter/resep
POST /kontrol-lanjutan

Contoh API Pharmacy Service
GET /resep/:id
POST /obat/keluar
GET /obat/stok

Contoh API Billing Service
GET /transaksi/:id
POST /transaksi/bayar
GET /transaksi/rincian/:id

🧪 9. Testing Requirements
Functionality

Semua API CRUD berfungsi

Validasi form bekerja

Perhitungan biaya benar

Integration

Pharmacy menerima data dari Medical Record

Billing menerima data resep, tindakan, pemeriksaan

Notifikasi muncul sesuai status

UAT (User Acceptance Test)

Semua aktor dapat melakukan alurnya tanpa error

🗓 10. Development Plan
Sprint 1

Setup backend & database

Patient Service

Sprint 2

Medical Record Service

Pharmacy Service

Sprint 3

Billing Service

Admin & Reporting

Sprint 4

Notification Service

Integrasi total + security

Deployment

📝 11. Conclusion

Dokumen PRD ini menjadi acuan utama dalam pengembangan Sistem Klinik Sehat Selalu. Seluruh fitur dan arsitektur diatur agar sistem dapat berjalan efisien, aman, mudah digunakan, dan dapat berkembang ke skala yang lebih besar.
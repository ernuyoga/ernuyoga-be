# **My Portfolio Website**

## Business Requirement Document (BRD)

# **Informasi Umum**

## **Latar Belakang**

Kebutuhan akan media digital yang interaktif dan profesional untuk menampilkan keterampilan *software development* kepada *recruiter* perusahaan maupun calon klien.

## **Tujuan Utama**

Membuktikan kemampuan teknis melalui kode nyata menggunakan React, TypeScript, Nest.js, dan MySQL. Memudahkan pengelolaan konten proyek secara dinamis tanpa harus mengubah kode sumber (*source code*) secara manual.

## **Ruang Lingkup**

Membangun sistem terintegrasi yang mencakup *frontend* (*landing page*) serta *backend* CMS. Untuk antarmuka pengguna (*user interface*), tidak memerlukan animasi yang kompleks pada tahap awal. Fokus utama pada penyampaian informasi yang jelas dan fungsional. Memastikan mekanisme CRUD (khususnya penambahan dan penghapusan konten) melalui CMS *backend* berjalan dengan lancar dan stabil.

# **Pemangku Kepentingan & Target Pengguna**

## **Pemilik Produk**

Saya sendiri sebagai pembuat sekaligus administrator yang mengelola konten sistem.

## **Pengguna Utama (*Target Audience*)**

*Recruiter/Hiring Manager* dan calon klien *freelance* untuk melihat portofolio, *tech stack*, dan riwayat proyek yang pernah dikerjakan.

# **Kebutuhan Fungsional**

## **Sisi Pengunjung Publik (*Frontend \- React & TypeScript*)**

* Satu halaman *landing page* yang tersusun atas beberapa *section*, di antaranya: Tentang Saya, Tech Stack, Proyek, dan Kontak.

## **Sisi Pengelola/Admin (*CMS \- Nest.js Backend*)**

* **Autentikasi Admin**: Sistem *login* yang aman menggunakan JWT.  
* **Manajemen Proyek (CRUD)**: Fitur untuk Menambah (*Create*), Membaca (*Read*), Memperbarui (*Update*), dan Menghapus (*Delete*) data proyek portofolio yang tersimpan di dalam *database* MySQL.

# **Kebutuhan Non-Fungsional**

* **Performa & Kecepatan:** Website harus responsif dan memiliki waktu muat yang cepat.  
* **Keamanan (Security):** Keamanan *endpoint* API *backend* dari akses tidak sah, terutama pada *endpoint* CMS yang memerlukan otorisasi.  
* **Skalabilitas & Pemeliharaan:** Struktur kode modular menggunakan TypeScript di sisi *frontend* dan Nest.js di sisi *backend* agar mudah dikembangkan kedepannya.

# **Batasan & Asumsi**

## **Batasan**

Fase pertama berfokus pada fitur inti (*MVP*) tanpa integrasi fitur pihak ketiga yang rumit.

## **Asumsi**

Lingkungan pengembangan lokal (*local development environment*) menggunakan Node.js dan *database* (seperti MySQL) sudah siap.

## **Infrastruktur & Deployment**

* **Deployment Server:** Seluruh layanan (*frontend* React dan *backend* Nest.js beserta *database* MySQL) akan di-deploy pada satu server mandiri (VPS) yang sama.  
* **Domain:** Menggunakan domain kustom berbayar yang ekonomis (misalnya ekstensi `.site`) untuk mengarahkan akses ke website portofolio agar terlihat lebih profesional.
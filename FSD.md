# **My Portfolio Website**

## Functional Specification Document (FSD)

# **Gambaran Arsitektur Sistem**

## **Arsitektur**

Klien-Server (*Client-Server Architecture*) terpisah antara *Frontend* dan *Backend*, berkomunikasi melalui RESTful API.

## **Tech Stack**

* **Frontend:** React.js dengan TypeScript (dijalankan di sisi klien, dibuild menjadi file statis).  
* **Backend:** Nest.js dengan TypeScript (berjalan sebagai server Node.js di VPS).  
* **Database:** MySQL (dikelola melalui ORM seperti TypeORM atau Prisma di Nest.js).  
* **Infrastruktur:** Single VPS, menggunakan Nginx sebagai *reverse proxy* dan pengelolaan proses dengan PM2.

# **Use Case (Pemodelan Pengguna & Sistem)**

## **Aktor 1: Pengunjung Publik (*Visitor/Recruiter*/Klien)**

* Melihat halaman utama (*landing page*).  
* Melihat informasi Tentang Saya (*About Me*).  
* Melihat daftar *Tech Stack* yang dikuasai.  
* Melihat daftar Proyek beserta detailnya (termasuk tautan ke GitHub/*Live Demo*).  
* Mengirim pesan/kontak (opsional, melalui tautan email/LinkedIn langsung atau formulir).

## **Aktor 2: Administrator (Saya Sendiri)**

* Melakukan *Login* Admin dengan kredensial aman (menggunakan JWT).  
* Menambah data proyek baru ke sistem (*Create*).  
* Melihat daftar seluruh proyek di panel admin (*Read*).  
* Memperbarui informasi atau detail proyek yang sudah ada (*Update*).  
* Menghapus proyek dari sistem (*Delete*).

# **Tabel Relational Schema**

## **users**

* `id` (INT, PK, Auto Increment)  
* `auth_code` (VARCHAR, Unique, Hashed:HMAC-SHA256)  
* `created_at`, `updated_at`, `deleted_at` (TIMESTAMP, Nullable)

## **profiles**

* `id` (INT, PK, Auto Increment)  
* `full_name` (VARCHAR)  
* `headline` (VARCHAR)  
* `bio` (TEXT)  
* `avatar_url` (VARCHAR, Nullable)  
* `cv_url` (VARCHAR, Nullable)  
* `created_at`, `updated_at`, `deleted_at` (TIMESTAMP, Nullable)

## **technologies**

* `id` (INT, PK, Auto Increment)  
* `name` (VARCHAR)  
* `category` (VARCHAR, Nullable \- e.g., *Frontend, Backend, Database, Programming Language*)  
* `icon_url` (VARCHAR, Nullable)  
* `created_at`, `updated_at`, `deleted_at` (TIMESTAMP, Nullable)

## **projects**

* `id` (INT, PK, Auto Increment)  
* `title` (VARCHAR)  
* `description` (TEXT)  
* `github_url` (VARCHAR, Nullable)  
* `demo_url` (VARCHAR, Nullable)  
* `created_at`, `updated_at`, `deleted_at` (TIMESTAMP, Nullable)

## **project\_tech\_pivot**

* `project_id` (INT, FK)  
* `technology_id` (INT, FK)  
* (Primary Key Gabungan: `project_id`, `technology_id`) 

## **project\_images**

* `id` (INT, PK, Auto Increment)  
* `project_id` (INT, FK)  
* `image_url` (VARCHAR)  
* `alt` (VARCHAR, Nullable)
* `created_at`, `updated_at`, `deleted_at` (TIMESTAMP, Nullable)

## **contacts**

* `id` (INT, PK, Auto Increment)  
* `platform` (VARCHAR \- e.g., *Email, LinkedIn, GitHub*)  
* `url_or_value` (VARCHAR)  
* `icon_name` (VARCHAR, Nullable)  
* `created_at`, `updated_at`, `deleted_at` (TIMESTAMP, Nullable)

# **Sequence Diagram (Alur Interaksi Sistem)**

## **Alur Persiapan Data**

1. Membuat akun admin (saya sendiri) melalui backend langsung ke database.  
2. Proses pembuatan akun dilakukan dengan menjalankan semacam factory/seeder untuk mendapatkan kode 16 digit yang digunakan untuk autentikasi login.

## **Alur Autentikasi Admin (Login CMS)**

1. Admin memasukkan 16 digit kode pada halaman *login* di *frontend*.  
2. *Frontend* mengirimkan *request* `POST /auth/login` beserta data *credentials* ke *backend* Nest.js.  
3. *Backend* memverifikasi data terhadap *database* MySQL.  
4. Jika valid, *backend* menghasilkan token **JWT (JSON Web Token)** dan mengembalikannya ke *frontend*.  
5. *Frontend* menyimpan token (misalnya di *localStorage* atau *cookie* aman) untuk digunakan pada *request* manajemen data selanjutnya.
6. Backend bersifat *stateless*, dan token akan kedaluwarsa dalam waktu 24 jam

## **Alur Penambahan Proyek Baru (CMS Create Project)**

1. Admin yang sudah *login* mengisi formulir tambah proyek di halaman admin *frontend*.  
2. *Frontend* mengirimkan *request* `POST /projects` dengan melampirkan header `Authorization: Bearer <JWT_Token>` dan data proyek.  
3. *Backend* (melalui *Auth Guard*) memverifikasi keabsahan JWT token tersebut.  
4. Jika token sah, Nest.js memproses data dan menyimpannya ke tabel proyek di MySQL.  
5. *Backend* mengembalikan status sukses (`201 Created`), dan *frontend* memperbarui tampilan daftar proyek.

## **Rancangan API Endpoints (Nest.js Backend)**

| Method | Endpoint | Aktor/Akses | Deskripsi |
| ----- | ----- | ----- | ----- |
| POST | `/auth/login` | Publik (Admin) | Autentikasi admin dan menghasilkan JWT token. |
| GET | `/profiles` | Publik | Mengambil data informasi pribadi. |
| PUT | `/profiles/:id` | Protected (Admin) | Memperbarui data informasi pribadi berdasarkan ID. |
| GET | `/technologies` | Publik | Mengambil seluruh daftar *tech stack* yang dikuasai untuk ditampilkan di *frontend*. |
| POST | `/technologies` | Protected (Admin) | Menambahkan data *tech stack* baru ke *database*. |
| DELETE | `/technologies/:id` | Protected (Admin) | Menghapus data *tech stack* berdasarkan ID. |
| GET | `/projects` | Publik | Mengambil seluruh daftar proyek untuk ditampilkan di *frontend*. |
| GET | `/projects/:id` | Publik | Mengambil detail spesifik dari satu proyek berdasarkan ID. |
| POST | `/projects` | Protected (Admin) | Menambahkan data proyek baru ke *database*. |
| PUT | `/projects/:id` | Protected (Admin) | Memperbarui data proyek berdasarkan ID. |
| DELETE | `/projects/:id` | Protected (Admin) | Menghapus data proyek berdasarkan ID. |
| GET | `/contacts` | Publik | Mengambil seluruh daftar *contact* untuk ditampilkan di *frontend*. |
| POST | `/contacts` | Protected (Admin) | Menambahkan data kontak baru ke *database*. |
| DELETE | `/contacts/:id` | Protected (Admin) | Menghapus data kontak berdasarkan ID. |


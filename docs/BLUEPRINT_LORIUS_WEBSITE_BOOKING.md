# BLUEPRINT WEBSITE LORIUS
## Landing Page & Online Booking System
**Versi:** 1.0  
**Tahun:** 2026  
**Brand:** Lori(us)  
**Tagline:** *moments worth keeping*  
**Tujuan dokumen:** Blueprint implementasi untuk pengembangan website Lori(us) menggunakan Claude Code atau AI coding assistant lain.

---

# 1. Ringkasan Produk

Lorius adalah brand fotografi yang berfokus pada pengabadian momen personal dan emosional seperti:

- Engagement
- Prewedding
- Wedding
- Graduation
- Event
- Portrait / Personal Session
- Family Session
- Corporate / Custom Event

Website Lori(us) dirancang bukan hanya sebagai landing page marketing, tetapi sebagai **platform booking fotografi end-to-end** yang memungkinkan calon klien:

1. Mengenal brand Lori(us).
2. Melihat portofolio.
3. Melihat layanan dan paket.
4. Memilih jadwal yang tersedia.
5. Menentukan kebutuhan sesi.
6. Menambahkan add-on.
7. Mengisi data pemesan.
8. Melakukan booking.
9. Melakukan pembayaran DP atau pembayaran penuh.
10. Menerima konfirmasi booking.
11. Menghubungi tim Lori(us) melalui WhatsApp jika membutuhkan konsultasi.

Website harus terasa:
- modern;
- premium;
- youthful;
- hangat;
- clean;
- visual-first;
- mudah digunakan di mobile;
- tidak terasa seperti website vendor wedding yang terlalu formal.

---

# 2. Tujuan Bisnis

## 2.1 Tujuan Utama

Website harus membantu Lori(us):

- meningkatkan conversion dari Instagram ke booking;
- mengurangi proses booking manual via chat;
- menampilkan jadwal yang masih tersedia;
- membuat paket dan harga lebih mudah dipahami;
- mengurangi pertanyaan berulang;
- memberikan pengalaman booking yang profesional;
- membangun brand yang lebih premium;
- mengumpulkan lead dan data calon pelanggan;
- menjadi pusat informasi resmi Lori(us).

## 2.2 KPI Awal

KPI yang dapat dipantau:

- jumlah visitor website;
- klik `Booking Sekarang`;
- klik `Chat WhatsApp`;
- jumlah booking dimulai;
- jumlah booking selesai;
- booking conversion rate;
- paket paling banyak dipilih;
- layanan paling diminati;
- tanggal paling banyak dicari;
- jumlah abandonment saat booking;
- sumber traffic: Instagram, TikTok, Google, direct;
- nilai transaksi rata-rata;
- jumlah add-on per transaksi.

---

# 3. Target Pengguna

## 3.1 Primary Audience

### Couple
Kebutuhan:
- engagement;
- prewedding;
- wedding;
- couple session.

Karakter:
- usia muda;
- aktif menggunakan Instagram dan TikTok;
- sensitif terhadap visual;
- ingin proses cepat;
- ingin harga transparan;
- sering membandingkan beberapa fotografer.

### Mahasiswa / Fresh Graduate
Kebutuhan:
- graduation;
- group graduation;
- personal graduation.

Karakter:
- mobile-first;
- sensitif harga;
- suka paket sederhana;
- keputusan cepat;
- kemungkinan booking bersama teman.

### Event Organizer / Individu
Kebutuhan:
- birthday;
- gathering;
- anniversary;
- family event;
- private event;
- community event.

### Corporate
Kebutuhan:
- documentation;
- company profile;
- internal event;
- product/event documentation.

---

# 4. Brand Identity Digital

## 4.1 Logo

Gunakan file master logo Lori(us).

Elemen:
- custom handwritten wordmark `lorius.`;
- titik cyan sebagai signature;
- tagline `moments worth keeping`.

**Catatan penting:**  
Wordmark Lori(us) merupakan custom wordmark. Jangan mengetik ulang logo menggunakan font script biasa.

## 4.2 Logo Variant

Sediakan:

1. Primary Logo  
   - teal wordmark;
   - cyan dot;
   - tagline abu-abu.

2. Reverse Logo  
   - white wordmark;
   - cyan dot;
   - tagline putih.

3. Monogram  
   - `l.`;
   - digunakan untuk avatar, favicon, floating action, dan compact navigation.

## 4.3 Brand Colors

### Lori(us) Deep Teal
```css
--lorius-teal: #0E363C;
```

Penggunaan:
- CTA utama;
- heading;
- navbar;
- footer;
- icon;
- section highlight.

### Lori(us) Cyan
```css
--lorius-cyan: #27C6D1;
```

Penggunaan:
- dot logo;
- active state;
- hover;
- small accent;
- selected state;
- progress indicator.

### Soft Gray
```css
--lorius-gray: #7A7A7A;
```

Penggunaan:
- body secondary;
- captions;
- labels.

### Off White
```css
--lorius-off-white: #FAFAF7;
```

### White
```css
--lorius-white: #FFFFFF;
```

### Border
```css
--lorius-border: #E7ECEC;
```

### Soft Teal Background
```css
--lorius-soft-teal: #EFF8F8;
```

### Warm Cream
```css
--lorius-cream: #F6F1E8;
```

---

# 5. Tipografi

## 5.1 Logo
Custom wordmark. Bukan font UI.

## 5.2 UI Font
Rekomendasi:
- Poppins
- Plus Jakarta Sans

Default:
```text
Primary UI Font: Poppins
Fallback: Plus Jakarta Sans, Inter, sans-serif
```

## 5.3 Heading Editorial

Untuk heading besar pada hero dapat menggunakan serif modern untuk memberikan nuansa editorial/premium.

Rekomendasi:
- Cormorant Garamond
- DM Serif Display
- Playfair Display

Default:
```text
Hero / Editorial Heading: Cormorant Garamond
UI / Body: Poppins
```

## 5.4 Hierarki

### Display
- Desktop: 64-72 px
- Tablet: 52-58 px
- Mobile: 40-46 px
- Weight: 500-600
- Line-height: 1.05-1.15

### H1
- Desktop: 48 px
- Mobile: 36 px

### H2
- Desktop: 36 px
- Mobile: 30 px

### H3
- Desktop: 24 px
- Mobile: 22 px

### Body
- Desktop: 16 px
- Mobile: 15-16 px
- Line-height: 1.6

### Caption
- 12-14 px

---

# 6. Teknologi yang Direkomendasikan

## 6.1 Frontend

Gunakan:

- Next.js 15+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- React Hook Form
- Zod
- date-fns
- Framer Motion

## 6.2 Backend

Untuk versi production:

- Next.js Route Handler atau API Layer terpisah;
- PostgreSQL;
- Prisma ORM;
- Auth.js untuk admin;
- object storage untuk gambar;
- payment gateway Indonesia.

## 6.3 Database

Rekomendasi:
- PostgreSQL

Provider dapat menggunakan:
- Supabase;
- Neon;
- managed PostgreSQL lainnya.

## 6.4 Media Storage

Gunakan:
- Cloudinary; atau
- Supabase Storage; atau
- S3 compatible object storage.

## 6.5 Payment Gateway

Siapkan abstraction agar dapat menggunakan:
- Midtrans;
- Xendit.

Jangan hardcode payment provider langsung ke UI.

---

# 7. Struktur Route

```text
/
├── /paket
├── /paket/[slug]
├── /galeri
├── /galeri/[category]
├── /testimoni
├── /tentang
├── /booking
├── /booking/success
├── /booking/[bookingCode]
├── /kontak
├── /faq
├── /privacy-policy
├── /terms
└── /admin
    ├── /dashboard
    ├── /bookings
    ├── /calendar
    ├── /services
    ├── /packages
    ├── /addons
    ├── /gallery
    ├── /testimonials
    ├── /availability
    ├── /payments
    ├── /customers
    └── /settings
```

---

# 8. Sitemap Landing Page

Urutan landing page:

1. Navbar
2. Hero
3. Trust / Quick Benefit
4. Service Categories
5. Selected Portfolio
6. Why Lori(us)
7. Featured Packages
8. Booking Process
9. Testimonials
10. Instagram / Social Proof
11. FAQ
12. CTA Booking
13. Footer
14. Floating WhatsApp / Lori(us) Avatar

---

# 9. Navbar

## Desktop

Kiri:
- Lori(us) logo.

Tengah:
- Beranda
- Paket
- Galeri
- Testimoni
- Booking
- Kontak

Kanan:
- CTA `Booking Sekarang`

## Behavior

- sticky header;
- background semi-transparent saat top;
- berubah putih + subtle shadow setelah scroll;
- active menu menggunakan underline teal tipis;
- CTA menggunakan deep teal;
- mobile menggunakan hamburger menu;
- menu mobile full-height drawer atau sheet.

---

# 10. Hero Section

## Layout

Desktop:
- 45% copy;
- 55% visual collage.

Mobile:
- copy;
- CTA;
- hero image;
- trust points.

## Copy

Eyebrow optional:
```text
PHOTOGRAPHY FOR YOUR STORIES
```

Headline:
```text
Abadikan momen
terbaikmu bersama Lori(us)
```

Description:
```text
Setiap momen berharga layak untuk diabadikan dengan indah.
Kami hadir untuk mengubah momen istimewamu menjadi kenangan
yang tak terlupakan.
```

CTA Primary:
```text
Lihat Paket
```

CTA Secondary:
```text
Konsultasi via WhatsApp
```

## Hero Visual

Gunakan photo collage:
- wedding;
- prewedding;
- graduation;
- event.

Gaya:
- rounded cards;
- overlapping;
- clean;
- editorial;
- tidak terlalu banyak decorative elements.

Tambahkan monogram Lori(us) sebagai visual seal.

## Trust Points

3 item:
- Fotografer Profesional
- Hasil Berkualitas Tinggi
- Pelayanan Ramah

---

# 11. Service Categories

Judul:
```text
Abadikan Setiap Cerita
```

Kategori:

### Engagement
Description:
```text
Dokumentasi hangat untuk momen menuju babak baru.
```

### Prewedding
```text
Cerita kalian dalam visual yang personal dan timeless.
```

### Wedding
```text
Setiap emosi penting di hari yang tidak akan terulang.
```

### Graduation
```text
Rayakan pencapaian dengan foto yang layak dikenang.
```

### Event
```text
Dokumentasi profesional untuk setiap acara spesial.
```

Setiap card:
- cover image;
- icon;
- category;
- 1 kalimat;
- CTA `Lihat Paket`.

---

# 12. Portfolio / Gallery Section

## Layout

Masonry atau asymmetric grid.

Filter:
- Semua
- Engagement
- Prewedding
- Wedding
- Graduation
- Event

Behavior:
- animated filter;
- image hover subtle zoom;
- klik membuka lightbox;
- image lazy load;
- responsive;
- jangan menggunakan crop yang merusak focal subject.

CTA:
```text
Lihat Semua Galeri
```

---

# 13. Why Lori(us)

Judul:
```text
Bukan Sekadar Foto.
Kami Menjaga Ceritamu.
```

Benefit:

### Personal Approach
Setiap sesi diarahkan sesuai karakter dan cerita klien.

### Tim Profesional
Tim berpengalaman dan terbiasa menangani berbagai jenis sesi.

### Natural Direction
Klien tidak harus pandai berpose.

### Consistent Editing
Visual editing konsisten dengan karakter Lori(us).

### Easy Booking
Pilih paket dan jadwal secara langsung.

### Safe & Organized
Data booking, pembayaran, dan jadwal tersimpan dengan rapi.

---

# 14. Featured Packages

Tampilkan 3 paket utama.

## Basic
Contoh:
- 3 jam sesi;
- 1 fotografer;
- 50 edited photos;
- cloud gallery;
- Rp2.500.000.

## Signature
Badge:
```text
Paling Favorit
```

Contoh:
- 6 jam sesi;
- 2 fotografer;
- 100 edited photos;
- highlight gallery;
- Rp4.500.000.

## Premium
Contoh:
- 10 jam sesi;
- 2 fotografer;
- 150 edited photos;
- album;
- priority delivery;
- Rp7.500.000.

CTA masing-masing:
```text
Pilih Paket
```

---

# 15. Booking Process Section

Visual horizontal steps desktop, vertical mobile.

```text
01 Pilih Layanan
02 Pilih Paket
03 Pilih Jadwal
04 Isi Detail
05 Bayar DP
06 Booking Terkonfirmasi
```

Copy:
```text
Booking sesimu hanya dalam beberapa langkah.
```

---

# 16. Testimonials

Card:
- avatar;
- nama;
- jenis sesi;
- rating optional;
- quote;
- tanggal optional.

Contoh:
```text
“Hasil fotonya luar biasa. Tim Lori(us) benar-benar
membuat kami nyaman selama sesi dan hasil akhirnya
terasa sangat personal.”
```

Gunakan carousel pada mobile.

---

# 17. FAQ

Pertanyaan minimum:

1. Bagaimana cara booking?
2. Berapa DP yang harus dibayar?
3. Apakah tanggal dapat di-reschedule?
4. Apakah bisa request lokasi?
5. Berapa lama hasil foto selesai?
6. Apakah mendapatkan semua raw file?
7. Apakah bisa tambah jam?
8. Bagaimana jika hujan?
9. Apakah tersedia jasa di luar Bandung?
10. Apakah biaya transport sudah termasuk?

Gunakan accordion.

---

# 18. CTA Closing

Background:
- dark teal;
- optional wedding/editorial image.

Heading:
```text
Momenmu tidak datang dua kali.
```

Description:
```text
Ceritakan kebutuhanmu dan biarkan Lori(us)
membantu mengabadikannya.
```

CTA:
- Booking Sekarang
- Chat WhatsApp

---

# 19. Footer

Kolom:

### Brand
- logo;
- tagline;
- short description.

### Menu
- Beranda
- Paket
- Galeri
- Booking
- Tentang
- Kontak

### Layanan
- Engagement
- Prewedding
- Wedding
- Graduation
- Event

### Contact
- WhatsApp
- Email
- Instagram
- TikTok
- Kota / coverage

Bottom:
```text
© 2026 Lori(us). All rights reserved.
```

---

# 20. Floating Action Button

Gunakan monogram `l.`.

Behavior:
- fixed bottom-right;
- desktop: 56-64 px;
- mobile: 52-56 px;
- hover membuka mini actions:
  - WhatsApp
  - Booking
  - Instagram

Pastikan tidak menutupi CTA atau navigation mobile.

---

# 21. Halaman Booking

Route:
```text
/booking
```

Tujuan:
Membuat booking sejelas mungkin dalam satu flow.

## Booking Stepper

```text
1. Pilih Layanan
2. Pilih Paket
3. Tanggal & Waktu
4. Detail Sesi
5. Data Pemesan
6. Pembayaran
7. Konfirmasi
```

Desktop:
- content kiri;
- sticky booking summary kanan.

Mobile:
- stepper horizontal scroll;
- sticky bottom summary / CTA.

---

# 22. Step 1 — Pilih Layanan

Pilihan card:

- Engagement
- Prewedding
- Wedding
- Graduation
- Event
- Personal
- Custom

Setiap card:
- image;
- label;
- short description;
- selected state.

Selected:
- teal border;
- cyan radio indicator;
- soft teal background.

---

# 23. Step 2 — Pilih Paket

Package card fields:

```ts
type Package = {
  id: string
  serviceId: string
  name: string
  slug: string
  description: string
  durationMinutes: number
  photographerCount: number
  editedPhotoCount: number
  price: number
  isPopular: boolean
  features: string[]
}
```

User hanya dapat memilih satu paket.

---

# 24. Step 3 — Tanggal & Waktu

## Calendar

Tampilkan calendar bulanan.

State:
- available;
- limited;
- booked;
- disabled;
- selected.

### Rules

Tanggal tidak dapat dipilih jika:
- sudah penuh;
- libur;
- ditutup admin;
- kurang dari minimum lead time.

Default lead time:
```text
3 hari
```

Configurable dari admin.

## Slot

Contoh:
- 08:00–10:00
- 10:00–12:00
- 13:00–15:00
- 15:00–17:00
- 17:00–19:00

Slot harus dihitung berdasarkan:
- package duration;
- existing booking;
- buffer;
- photographer availability.

---

# 25. Step 4 — Detail Sesi

Fields:

### Lokasi
```text
Bandung
Jakarta
Luar Kota
Custom
```

### Detail Lokasi
Text input.

### Jumlah Peserta
Number/select.

### Konsep / Tema
Select:
- Natural
- Romantic
- Elegant
- Casual
- Editorial
- Graduation
- Custom

### Catatan Tambahan
Textarea.

### Upload Inspiration
Optional.
Max:
- 5 images;
- jpg/png/webp;
- max 5 MB/file.

---

# 26. Add-On

Add-on muncul berdasarkan service/package.

Contoh:

```text
Album Cetak 20 Halaman
+Rp950.000

Extra 20 Foto Edit
+Rp350.000

Video Highlight 3-5 Menit
+Rp1.250.000

Extra Hour
+Rp600.000

Drone
+Rp750.000

Same Day Edit
+Rp1.500.000
```

Schema:

```ts
type AddOn = {
  id: string
  name: string
  description?: string
  price: number
  type: "fixed" | "quantity"
  applicableServiceIds: string[]
  active: boolean
}
```

---

# 27. Step 5 — Data Pemesan

Fields:

- Nama Lengkap*
- Nomor WhatsApp*
- Email*
- Instagram optional
- Domisili optional
- Notes optional

Validation:
- nama minimum 2 karakter;
- WhatsApp valid;
- email valid;
- checkbox persetujuan privacy policy.

---

# 28. Step 6 — Metode Pembayaran

Pilihan:

### DP 50%
Default.

### Full Payment
Optional.

Payment methods:
- Virtual Account
- QRIS
- E-Wallet
- Bank Transfer

UI tidak boleh menampilkan informasi payment hardcoded apabila gateway sudah aktif.

---

# 29. Booking Summary

Sticky desktop.

Fields:

```text
Layanan
Paket
Tanggal
Waktu
Lokasi
Jumlah Peserta

Harga Paket
Add-on
Transport
Diskon
Subtotal
DP
Total Dibayar Sekarang
Sisa Pembayaran
```

CTA:
```text
Konfirmasi Booking
```

Sebelum submit:
checkbox:
```text
Saya telah membaca syarat dan ketentuan booking.
```

---

# 30. Booking Status

Status internal:

```ts
type BookingStatus =
  | "DRAFT"
  | "WAITING_PAYMENT"
  | "PAYMENT_PENDING"
  | "DP_PAID"
  | "CONFIRMED"
  | "RESCHEDULE_REQUESTED"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED"
```

Payment status:

```ts
type PaymentStatus =
  | "UNPAID"
  | "PENDING"
  | "PARTIAL"
  | "PAID"
  | "FAILED"
  | "EXPIRED"
  | "REFUNDED"
```

---

# 31. Booking Code

Format:

```text
LOR-YYYYMMDD-XXXX
```

Contoh:
```text
LOR-20260827-A7K2
```

Code:
- unique;
- non-sequential;
- mudah dibaca oleh customer service.

---

# 32. Booking Success Page

Route:
```text
/booking/success
```

Tampilkan:
- success icon;
- booking code;
- nama;
- service;
- package;
- tanggal;
- jam;
- lokasi;
- payment status;
- amount paid.

CTA:
- Lihat Detail Booking
- Chat Lori(us)
- Kembali ke Beranda

Copy:
```text
Booking kamu sudah kami terima.
Detail konfirmasi juga telah dikirim ke WhatsApp dan email.
```

---

# 33. Customer Booking Detail

Route:
```text
/booking/[bookingCode]
```

Authentication lightweight:
- booking code;
- email/phone verification optional.

Tampilkan timeline:

```text
Booking Dibuat
Pembayaran Diterima
Booking Dikonfirmasi
Hari Pemotretan
Editing
Gallery Ready
Completed
```

---

# 34. WhatsApp Integration

CTA WhatsApp harus menggunakan prefilled message.

Contoh:

```text
Halo Lori(us), saya tertarik dengan paket Prewedding Signature.
Boleh dibantu konsultasi?
```

Dari booking:

```text
Halo Lori(us), saya ingin menanyakan booking LOR-20260827-A7K2.
```

Nomor WhatsApp disimpan melalui admin settings, bukan hardcoded.

---

# 35. Database Model

## Service

```ts
Service {
  id
  name
  slug
  description
  coverImage
  active
  sortOrder
}
```

## Package

```ts
Package {
  id
  serviceId
  name
  slug
  description
  durationMinutes
  photographerCount
  editedPhotoCount
  price
  isPopular
  active
}
```

## PackageFeature

```ts
PackageFeature {
  id
  packageId
  label
  sortOrder
}
```

## AddOn

```ts
AddOn {
  id
  name
  description
  price
  active
}
```

## PackageAddOn

```ts
PackageAddOn {
  packageId
  addOnId
}
```

## Customer

```ts
Customer {
  id
  fullName
  phone
  email
  instagram
  city
}
```

## Booking

```ts
Booking {
  id
  bookingCode
  customerId
  serviceId
  packageId
  bookingDate
  startTime
  endTime
  location
  locationDetail
  participantCount
  concept
  notes
  subtotal
  discount
  transportFee
  total
  downPaymentAmount
  remainingAmount
  bookingStatus
  paymentStatus
  createdAt
  updatedAt
}
```

## BookingAddOn

```ts
BookingAddOn {
  bookingId
  addOnId
  quantity
  unitPrice
  subtotal
}
```

## Availability

```ts
Availability {
  id
  date
  startTime
  endTime
  capacity
  active
}
```

## BlockedDate

```ts
BlockedDate {
  id
  startDate
  endDate
  reason
}
```

## Gallery

```ts
Gallery {
  id
  category
  title
  imageUrl
  alt
  featured
  sortOrder
}
```

## Testimonial

```ts
Testimonial {
  id
  customerName
  sessionType
  quote
  rating
  imageUrl
  featured
}
```

---

# 36. Admin Dashboard

Admin tidak perlu terlalu kompleks pada fase pertama.

## Dashboard Overview

Cards:
- booking hari ini;
- booking bulan ini;
- revenue;
- pending payment;
- next sessions;
- available dates.

## Booking Management

Table:
- booking code;
- customer;
- service;
- package;
- date;
- payment;
- status;
- action.

Filter:
- date;
- service;
- package;
- status;
- payment status.

Actions:
- view;
- confirm;
- reschedule;
- cancel;
- complete;
- add note.

---

# 37. Admin Calendar

Calendar monthly/weekly.

Color state:
- confirmed;
- waiting payment;
- blocked;
- completed.

Klik booking:
show quick detail.

Admin dapat:
- block date;
- block time slot;
- adjust capacity;
- create manual booking.

---

# 38. CMS Sederhana

Admin dapat mengubah:

- hero copy;
- hero image;
- services;
- packages;
- package price;
- add-ons;
- gallery;
- testimonials;
- FAQ;
- WhatsApp;
- Instagram;
- TikTok;
- email;
- service area.

Tujuannya supaya perubahan konten tidak perlu deploy ulang.

---

# 39. API Blueprint

## Public

```text
GET /api/services
GET /api/packages
GET /api/packages/:id
GET /api/availability
GET /api/gallery
GET /api/testimonials

POST /api/bookings
GET /api/bookings/:code
POST /api/payments/create
POST /api/payments/webhook
```

## Admin

```text
GET    /api/admin/bookings
PATCH  /api/admin/bookings/:id
GET    /api/admin/calendar

POST   /api/admin/services
PATCH  /api/admin/services/:id
DELETE /api/admin/services/:id

POST   /api/admin/packages
PATCH  /api/admin/packages/:id

POST   /api/admin/availability
POST   /api/admin/blocked-dates
```

---

# 40. Booking API Validation

Saat submit booking backend WAJIB melakukan pengecekan ulang:

1. package masih aktif;
2. price belum berubah;
3. date masih tersedia;
4. slot masih tersedia;
5. tidak overlap dengan booking lain;
6. add-on valid;
7. total dihitung ulang server-side;
8. customer fields valid.

Jangan percaya total price dari frontend.

---

# 41. Prevent Double Booking

Gunakan database transaction.

Pseudo:

```ts
begin transaction

lock selected availability

check conflicting confirmed/pending booking

if unavailable:
  rollback
  return SLOT_UNAVAILABLE

create booking
reserve slot temporarily

commit
```

Reservation timeout:
```text
15-30 menit
```

Jika pembayaran tidak dilakukan:
- booking menjadi expired;
- slot dilepas kembali.

---

# 42. Responsive Design

## Breakpoints

```text
Mobile: 0-639
Tablet: 640-1023
Desktop: 1024+
Large: 1440+
```

## Mobile Priority

Karena traffic kemungkinan besar berasal dari Instagram:
- desain mobile harus diprioritaskan;
- CTA mudah dijangkau jempol;
- booking form jangan terlalu panjang dalam satu layar;
- gunakan sticky CTA;
- calendar mobile harus usable;
- image tidak terlalu berat.

---

# 43. Motion & Interaction

Gunakan animasi secukupnya.

Allowed:
- fade-in;
- gentle slide;
- image reveal;
- subtle scale on hover;
- smooth card transition;
- step transition.

Hindari:
- parallax agresif;
- loading animation lama;
- cursor effect berlebihan;
- excessive motion.

Animation duration:
```text
180-400 ms
```

---

# 44. Image Direction

Photo styling:
- candid;
- natural;
- editorial;
- warm skin tone;
- soft light;
- emotional;
- premium;
- tidak oversaturated.

Ratio:
```text
Hero 4:5 / 3:4
Card 4:3
Gallery mixed
Testimonials 1:1
```

Gunakan:
- `next/image`;
- WebP / AVIF;
- responsive sizes;
- blur placeholder.

---

# 45. SEO

Setiap page mempunyai:

- unique title;
- meta description;
- canonical;
- OpenGraph;
- Twitter card;
- schema markup.

Contoh homepage:

```text
Title:
Lorius Photography Bandung | Wedding, Prewedding & Graduation

Description:
Abadikan momen terbaik bersama Lori(us). Fotografi wedding,
prewedding, engagement, graduation dan event di Bandung
dengan pengalaman booking yang mudah.
```

Structured data:
- LocalBusiness;
- ProfessionalService;
- BreadcrumbList;
- FAQPage;
- Product/Offer untuk paket bila sesuai.

---

# 46. Analytics

Integrasi:
- Google Analytics 4;
- Meta Pixel optional;
- TikTok Pixel optional.

Track events:

```text
view_home
click_booking
click_whatsapp
view_package
select_service
select_package
select_date
booking_started
booking_step_completed
payment_started
booking_completed
booking_abandoned
```

---

# 47. Accessibility

Minimum:
- semantic HTML;
- alt image;
- keyboard navigation;
- visible focus state;
- form label;
- accessible dialog;
- contrast WCAG AA;
- button bukan div;
- aria-label untuk icon-only controls.

---

# 48. Performance

Target:
- Lighthouse Performance >= 90;
- CLS < 0.1;
- LCP < 2.5 s;
- avoid huge hero image;
- lazy load gallery;
- optimize fonts;
- server render marketing pages;
- cache public data.

---

# 49. Error States

Harus tersedia UI untuk:

- network error;
- availability loading;
- slot taken;
- payment failed;
- payment expired;
- invalid booking;
- server error;
- empty gallery;
- no available dates.

Contoh:

```text
Ups, jadwal ini baru saja dipilih orang lain.
Silakan pilih waktu lainnya.
```

---

# 50. Loading States

Gunakan skeleton:
- packages;
- gallery;
- availability;
- booking summary.

Submit booking:
```text
Memproses booking...
```

Disable double submit.

---

# 51. Empty States

Calendar:
```text
Belum ada jadwal tersedia pada bulan ini.
Coba lihat bulan berikutnya atau hubungi Lori(us).
```

Gallery:
```text
Cerita baru sedang kami siapkan.
```

---

# 52. Confirmation Dialog

Gunakan hanya ketika perlu:

```text
Konfirmasi Booking

Pastikan layanan, paket, jadwal, dan data yang kamu isi
sudah benar sebelum melanjutkan pembayaran.

[Batal] [Ya, Lanjutkan]
```

---

# 53. Security

- rate limiting booking API;
- validate all server input;
- sanitize user input;
- secure payment webhook signature;
- never expose payment secret;
- secure admin route;
- prevent SQL injection via ORM;
- CSRF protection jika diperlukan;
- captcha hanya jika spam benar-benar terjadi;
- file upload validation;
- MIME validation;
- max file limit.

---

# 54. Suggested Folder Structure

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── paket/
│   │   ├── galeri/
│   │   ├── testimoni/
│   │   ├── tentang/
│   │   ├── kontak/
│   │   └── faq/
│   │
│   ├── booking/
│   │   ├── page.tsx
│   │   ├── success/
│   │   └── [bookingCode]/
│   │
│   ├── admin/
│   │
│   └── api/
│
├── components/
│   ├── brand/
│   ├── layout/
│   ├── marketing/
│   ├── booking/
│   ├── gallery/
│   ├── admin/
│   └── ui/
│
├── features/
│   ├── booking/
│   ├── payments/
│   ├── availability/
│   └── gallery/
│
├── lib/
│   ├── db.ts
│   ├── utils.ts
│   ├── whatsapp.ts
│   ├── payments/
│   └── validations/
│
├── server/
│   ├── services/
│   ├── repositories/
│   └── actions/
│
├── types/
├── constants/
└── styles/
```

---

# 55. Component Blueprint

Marketing:

```text
Navbar
MobileMenu
HeroSection
HeroPhotoCollage
TrustPoints
ServiceGrid
ServiceCard
PortfolioGrid
PortfolioLightbox
WhyLorius
PackageCard
BookingSteps
TestimonialCarousel
FAQAccordion
CTASection
Footer
FloatingBrandButton
```

Booking:

```text
BookingStepper
ServiceSelector
PackageSelector
AvailabilityCalendar
TimeSlotSelector
SessionDetailForm
AddOnSelector
CustomerForm
PaymentSelector
BookingSummary
BookingMobileSummary
BookingConfirmationDialog
BookingSuccess
BookingTimeline
```

---

# 56. UI States untuk Selector

Default:
```text
border-gray
background-white
```

Hover:
```text
border-teal/40
```

Selected:
```text
border-teal
background-soft-teal
cyan indicator
```

Disabled:
```text
opacity 40%
cursor-not-allowed
```

---

# 57. Design Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-xl: 28px;
--radius-pill: 9999px;
```

Photo cards:
- 18-28 px.

Buttons:
- 10-12 px.

Inputs:
- 10-12 px.

---

# 58. Shadow

Gunakan sangat lembut.

```css
box-shadow:
0 12px 32px rgba(14, 54, 60, 0.08);
```

Avoid heavy black shadows.

---

# 59. Button System

## Primary

Deep teal background.
White text.

```text
Booking Sekarang
Konfirmasi Booking
Lihat Paket
```

## Secondary

White.
Teal border.

```text
Chat WhatsApp
Lihat Galeri
```

## Text Button

```text
Lihat Detail →
```

---

# 60. Form System

Input height:
```text
44-48 px desktop
48-52 px mobile
```

Required:
- gunakan `*`;
- error di bawah field;
- tidak hanya mengandalkan warna.

Example:
```text
Nomor WhatsApp *
[ 08xxxxxxxxxx ]

Nomor WhatsApp tidak valid.
```

---

# 61. Content Tone

Tone Lori(us):
- hangat;
- conversational;
- sederhana;
- tidak terlalu formal;
- tidak hard-selling;
- emotional tetapi tidak berlebihan.

Gunakan:
```text
Ceritakan momenmu.
Kami bantu mengabadikannya.
```

Hindari:
```text
Kami adalah penyedia jasa fotografi terbaik dan terpercaya...
```

---

# 62. Suggested Homepage Copy

## Hero
```text
Abadikan momen terbaikmu bersama Lori(us)

Setiap momen berharga layak untuk diabadikan dengan indah.
Kami hadir untuk mengubah momen istimewamu menjadi
kenangan yang tak terlupakan.
```

## Portfolio
```text
Cerita dalam setiap frame.

Tidak ada dua cerita yang sama.
Kami menjaga setiap momen tetap terasa seperti milikmu.
```

## Booking
```text
Pilih waktumu.
Kami siapkan ceritanya.
```

## Final CTA
```text
Momenmu tidak datang dua kali.

Saat waktunya tiba, pastikan ceritanya tetap tinggal.
```

---

# 63. Fase Development

## Phase 1 — Marketing MVP
- landing page;
- responsive;
- services;
- packages;
- gallery;
- testimonial;
- FAQ;
- WhatsApp CTA;
- SEO.

## Phase 2 — Booking
- service selector;
- package selector;
- calendar;
- time slot;
- customer form;
- booking summary;
- database;
- booking code.

## Phase 3 — Payment
- payment gateway;
- DP;
- full payment;
- webhook;
- payment status;
- expiry.

## Phase 4 — Admin
- login;
- booking management;
- calendar;
- packages;
- availability;
- gallery;
- testimonials.

## Phase 5 — Automation
- email;
- WhatsApp notification;
- booking reminder;
- payment reminder;
- post-session follow-up.

---

# 64. MVP Scope yang Disarankan

Jangan membuat semua fitur sekaligus.

Untuk versi pertama production, cukup:

```text
Landing Page
Services
Packages
Gallery
FAQ
Booking Form
Availability Calendar
Booking Summary
Booking Database
WhatsApp Confirmation
Simple Admin Booking
```

Payment Gateway dapat menjadi fase berikutnya jika ingin go-live lebih cepat.

---

# 65. Acceptance Criteria Landing Page

Landing page dianggap selesai jika:

- logo tampil sesuai brand;
- tidak ada garis dekoratif di bawah logo;
- seluruh page responsive;
- navbar sticky;
- semua navigation bekerja;
- hero CTA bekerja;
- WhatsApp CTA bekerja;
- service cards tampil;
- gallery dapat difilter;
- package cards tampil;
- testimonial responsive;
- FAQ accordion bekerja;
- loading cepat;
- mobile tidak horizontal scroll;
- visual konsisten dengan brand guideline Lori(us).

---

# 66. Acceptance Criteria Booking

Booking dianggap selesai jika:

- user dapat memilih layanan;
- user dapat memilih paket;
- user hanya melihat tanggal valid;
- user hanya melihat slot valid;
- booked slot tidak dapat dipilih;
- add-on dapat dipilih;
- total dihitung otomatis;
- user dapat mengisi data;
- validation bekerja;
- server menghitung ulang total;
- booking code unique terbentuk;
- data masuk database;
- user mendapatkan success screen;
- admin dapat melihat booking;
- double booking tidak dapat terjadi.

---

# 67. Prompt Implementasi untuk Claude Code

Gunakan instruksi berikut sebagai konteks awal:

```text
You are building the production website for Lori(us), a modern
photography brand.

Read BLUEPRINT_LORIUS_WEBSITE.md completely before writing code.

Primary goals:
1. Build a premium, youthful, mobile-first photography landing page.
2. Build an online booking flow.
3. Follow the Lori(us) visual identity exactly.
4. Keep architecture modular and production-ready.
5. Do not invent UI patterns that contradict the blueprint.
6. Use reusable components.
7. Use TypeScript strictly.
8. Validate all forms using Zod.
9. Never trust booking price from the frontend.
10. Build responsive design from mobile to desktop.

Preferred stack:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma
- React Hook Form
- Zod

Brand:
Deep Teal: #0E363C
Cyan: #27C6D1
Soft Gray: #7A7A7A
Off White: #FAFAF7

The Lori(us) handwritten logo is a custom image asset and must not
be recreated using a font.

Start by:
1. Creating the project structure.
2. Creating theme/design tokens.
3. Creating reusable layout components.
4. Implementing the landing page section by section.
5. Making the landing page responsive.
6. Only after landing page approval, implement booking.
```

---

# 68. Suggested Initial Claude Code Tasks

Jangan minta Claude membangun semuanya sekaligus.

Gunakan urutan:

```text
TASK 01 — Project Setup & Design System
TASK 02 — Navbar & Footer
TASK 03 — Hero Section
TASK 04 — Service Section
TASK 05 — Gallery Section
TASK 06 — Packages
TASK 07 — Testimonials & FAQ
TASK 08 — Final CTA & Responsive Polish
TASK 09 — Booking UI Shell
TASK 10 — Booking Service & Package Selection
TASK 11 — Availability Calendar
TASK 12 — Detail Session & Add-ons
TASK 13 — Customer Form
TASK 14 — Summary & Booking API
TASK 15 — Database & Double Booking Protection
TASK 16 — Booking Success Page
TASK 17 — Admin Booking Dashboard
TASK 18 — Payment Integration
TASK 19 — SEO, Analytics & Performance
TASK 20 — Production QA
```

---

# 69. Definition of Done

Sebelum production:

- [ ] Landing responsive.
- [ ] Mobile tested.
- [ ] Logo asset benar.
- [ ] Brand colors benar.
- [ ] Typography konsisten.
- [ ] All CTA functional.
- [ ] Booking tested.
- [ ] Conflict booking tested.
- [ ] Error state tested.
- [ ] Payment tested jika enabled.
- [ ] Admin access secured.
- [ ] SEO metadata complete.
- [ ] OG image created.
- [ ] Favicon uses official monogram.
- [ ] Analytics enabled.
- [ ] Image optimization active.
- [ ] Lighthouse reviewed.
- [ ] Accessibility reviewed.
- [ ] Privacy policy available.
- [ ] Terms & booking rules available.
- [ ] Production environment variables documented.
- [ ] Database backup configured.

---

# 70. Catatan Akhir

Website Lori(us) harus memiliki keseimbangan antara **portfolio photography** dan **digital booking product**.

Landing page tidak boleh terasa seperti dashboard SaaS, sedangkan booking tidak boleh terasa seperti form panjang yang membosankan.

Prinsip utama UX:

> **Visual untuk meyakinkan. Informasi untuk memberi rasa aman. Booking untuk memudahkan keputusan.**

Identitas Lori(us) harus tetap terasa di seluruh flow melalui:
- whitespace yang luas;
- typography elegan;
- deep teal;
- cyan dot;
- penggunaan foto sebagai elemen utama;
- micro-interaction yang lembut;
- copywriting hangat;
- proses booking yang sederhana.

---

**End of Blueprint — Lori(us) Website & Booking System v1.0**

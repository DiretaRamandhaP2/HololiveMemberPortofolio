# PLAN: Web Portofolio Member Hololive Indonesia

Dokumen ini adalah panduan belajar dari **0 sampai deploy**. Kerjakan berurutan, jangan lompat tahap. Centang `[ ]` jadi `[x]` setiap selesai.

---

## 0. Keputusan Awal (WAJIB dibaca)

### 0.1 "React Native" vs "React"
Kamu menulis **React Native + web static + Tailwind**. Ini perlu diluruskan dulu:

| Opsi | Cocok? | Catatan |
|---|---|---|
| **React (ReactJS) + Vite** | ✅ **Direkomendasikan** | Memang dibuat untuk web, Tailwind native support, hasil build = file static (HTML/CSS/JS). Paling mudah untuk belajar. |
| React Native (Expo) + react-native-web + NativeWind | ⚠️ Bisa, tapi lebih ribet | Tailwind harus lewat NativeWind, tidak ada tag HTML (`div`, `img`), pakai `View`, `Image`. Efek partikel & audio butuh library khusus. Cocok kalau targetmu juga aplikasi mobile. |

**Keputusan plan ini: pakai React + Vite + Tailwind CSS + JavaScript.**
Konsep komponen, props, state, hooks yang kamu pelajari sama persis dengan React Native, jadi ilmunya tetap kepakai kalau nanti pindah.

> Kalau kamu tetap mau React Native, bilang saja, nanti plan bagian Tahap 2–3 diganti dengan Expo + NativeWind.

### 0.2 Hal penting sebelum mulai
1. **Autoplay audio diblokir browser.** Voice random tiap 1 menit tidak bisa bunyi kalau pengunjung belum pernah berinteraksi (klik) dengan halaman. Solusi: buat layar "Enter / Klik untuk masuk" di awal. Detail ada di Tahap 9.
2. **Hak cipta aset.** Gambar karakter & voice Hololive milik COVER Corp. Untuk portofolio pribadi non-komersial, baca dulu **Hololive Production Derivative Works Guidelines** (cari di situs resmi hololivepro). Jangan monetisasi, cantumkan credit, dan gunakan aset yang memang diizinkan (mis. materi resmi untuk fan content). Beri disclaimer di footer.
3. **"Static"** artinya tidak ada backend/database. Semua data (member, link, path voice) disimpan di file JS/JSON di dalam project.

---

## 1. Tujuan & Fitur (Scope)

### Fitur wajib (MVP)
- [ ] Sidebar berisi daftar member (foto muka + nama), dikelompokkan per generasi
- [ ] Klik member → konten berganti (tanpa reload)
- [ ] Hero atas: gambar karakter ala game (character stage) + efek partikel sesuai tema karakter
- [ ] Voice random dari member tersebut diputar tiap 1 menit
- [ ] Bagian bawah hero: profil, info singkat, link sosial
- [ ] Responsive (HP: sidebar jadi drawer)
- [ ] Bisa di-build jadi static dan di-deploy gratis

### Fitur tambahan (opsional, setelah MVP)
- [ ] Tombol mute/unmute + tombol "mainkan voice sekarang"
- [ ] Transisi animasi antar member
- [ ] Galeri / timeline / discography
- [ ] Dark/light theme
- [ ] Halaman Home (overview semua generasi)

---

## 2. Data Member & Ide Tema

| Generasi | Member | Ide tema warna | Ide partikel |
|---|---|---|---|
| Area15 | Ayunda Risu | oranye, cokelat, hijau daun | daun jatuh, biji acorn, kilau kuning |
| Area15 | Moona Hoshinova | ungu tua, biru malam, perak | bintang, bulan sabit, kilau mistis |
| Area15 | Airani Iofifteen | hijau, teal, warna cat | percikan cat warna-warni |
| Holoro | Kureiji Ollie | merah, ungu gelap, hijau zombie | wisp hantu, tulang kecil, kabut |
| Holoro | Anya Melfisa | tentukan sendiri sesuai konsep karakter | tentukan sendiri (mis. kain/kertas beterbangan) |
| Holoro | Pavolia Reine | biru-hijau merak, emas | bulu merak, kilau elegan |
| Holoh3ro | Vestia Zeta | abu-ungu, hitam | kertas/dokumen, glitch halus |
| Holoh3ro | Kaela Kovalskia | merah, oranye, besi | percikan api/bunga api palu |
| Holoh3ro | Kobo Kanaeru | biru, putih, pastel | tetes hujan, gelembung air |

> Catatan: ide di atas hanya saran. Sesuaikan dengan referensi karakter masing-masing (lihat artwork resmi). Cek juga ejaan nama resmi (mis. **Kureiji Ollie**) sebelum dipakai di web.

---

## 3. Tech Stack

- **Node.js** (LTS) + npm
- **React 18+** dengan **Vite**
- **Tailwind CSS** (v4 via plugin Vite, atau v3 jika tutorial yang kamu ikuti pakai v3)
- **JavaScript** (bukan TypeScript, sesuai permintaan)
- **react-router-dom** (opsional, untuk URL per member). Alternatif tanpa library: pakai `useState`
- Partikel: pilih salah satu
  - A. **tsParticles** (`@tsparticles/react`, `@tsparticles/slim`), cepat, banyak preset
  - B. **Canvas buatan sendiri** (lebih ribet tapi paling banyak belajar). Disarankan dicoba setelah A jalan
- Audio: **HTML5 Audio API** bawaan browser (`new Audio()`), tanpa library
- Deploy: **GitHub Pages / Netlify / Vercel / Cloudflare Pages**

---

## 4. Rencana Tahapan (0 → Selesai)

### TAHAP 1 — Persiapan Environment
- [ ] Install Node.js LTS, cek `node -v` dan `npm -v`
- [ ] Install VS Code + extension: ES7 React Snippets, Tailwind CSS IntelliSense, Prettier
- [ ] Install Git, buat akun GitHub
- [ ] Siapkan folder kerja

**Belajar:** dasar terminal (cd, ls, mkdir), apa itu npm.

---

### TAHAP 2 — Buat Project
```bash
npm create vite@latest hololive-id-portfolio -- --template react
cd hololive-id-portfolio
npm install
npm run dev
```
- [ ] Buka `http://localhost:5173`, pastikan halaman Vite+React muncul
- [ ] Hapus isi template (logo, counter, `App.css`)
- [ ] `git init`, commit pertama

**Belajar:** struktur folder Vite, apa itu `main.jsx`, `App.jsx`, `index.html`.

---

### TAHAP 3 — Pasang Tailwind CSS
- [ ] Ikuti dokumentasi resmi Tailwind: "Install Tailwind CSS with Vite"
- [ ] Pastikan `index.css` memuat Tailwind
- [ ] Tes: beri `className="text-3xl font-bold text-pink-500"` di `App.jsx`, cek tampil

**Belajar:** utility class, responsive prefix (`md:`, `lg:`), state (`hover:`), warna.

---

### TAHAP 4 — Struktur Folder
Target struktur:
```
src/
├─ assets/
│  ├─ members/
│  │   ├─ risu/        (face.png, character.png)
│  │   ├─ moona/
│  │   └─ ...
│  └─ voices/
│      ├─ risu/        (voice1.mp3, voice2.mp3, ...)
│      └─ ...
├─ components/
│  ├─ Sidebar.jsx
│  ├─ SidebarItem.jsx
│  ├─ CharacterStage.jsx
│  ├─ ParticleLayer.jsxgen
│  ├─ VoicePlayer.jsx (atau hook useRandomVoice)
│  ├─ MemberInfo.jsx
│  └─ EnterScreen.jsx
├─ data/
│  └─ members.js
├─ hooks/
│  └─ useRandomVoice.js
├─ pages/
│  └─ MemberPage.jsx
├─ App.jsx
├─ main.jsx
└─ index.css
```
- [ ] Buat folder & file kosong dulu (komponen cukup `return <div>NamaKomponen</div>`)

---

### TAHAP 5 — Siapkan Data (`members.js`)
Contoh bentuk data (satu member):
```js
export const generations = [
  {
    id: "area15",
    name: "Area15",
    members: [
      {
        id: "risu",
        name: "Ayunda Risu",
        face: "/members/risu/face.png",
        character: "/members/risu/character.png",
        theme: { primary: "#f97316", secondary: "#facc15", bg: "from-orange-900 to-amber-700" },
        particle: "leaves",
        voices: ["/voices/risu/1.mp3", "/voices/risu/2.mp3"],
        about: "Deskripsi singkat...",
        links: { youtube: "", x: "" },
      },
      // moona, iofi
    ],
  },
  // holoro, holoh3ro
];
```
- [ ] Isi 9 member (boleh placeholder dulu)
- [ ] Taruh aset yang bisa diakses langsung di folder `public/` (mis. `public/members/risu/face.png`) agar path `"/members/..."` bekerja
- [ ] Tulis daftar sumber/credit aset di file `CREDITS.md`

**Belajar:** array of object, `map()`, destructuring, import/export.

---

### TAHAP 6 — Layout Utama + Sidebar
- [ ] Layout dasar: `flex h-screen`, sidebar kiri (lebar tetap, misal `w-72`), konten kanan `flex-1 overflow-y-auto`
- [ ] `Sidebar.jsx`: loop `generations` → judul generasi → loop member → `SidebarItem`
- [ ] `SidebarItem.jsx`: foto muka bulat (`rounded-full w-12 h-12 object-cover`) + nama, state **aktif** (highlight warna tema member)
- [ ] State di `App.jsx`: `const [activeId, setActiveId] = useState("risu")`
- [ ] Kirim `activeId` dan `onSelect` lewat props
- [ ] Sidebar bisa scroll sendiri (`overflow-y-auto`)

**Belajar:** props, `useState`, event handler, conditional className.

---

### TAHAP 7 — Navigasi Antar Member
Pilih salah satu (mulai dari A):
- **A. Tanpa router:** konten ditentukan oleh `activeId`, cari member dengan `find()`
- **B. Dengan router:** `react-router-dom` memakai **HashRouter** (`/#/risu`). Wajib HashRouter karena hosting static (tidak ada server untuk redirect URL)

- [ ] Klik sidebar → konten berubah
- [ ] (Opsi B) refresh halaman tetap di member yang sama

---

### TAHAP 8 — Hero: Character Stage ala Game
Tampilan target: karakter besar di tengah/kanan, latar gradien sesuai tema, nama di sisi, terasa seperti layar pilih karakter game.
- [ ] Container hero: `relative h-[60vh] overflow-hidden`, latar gradien dari `theme`
- [ ] Gambar karakter (PNG transparan): `absolute bottom-0` + `object-contain h-full`
- [ ] Teks besar nama member di belakang karakter (`absolute`, opacity rendah, `text-8xl font-black`)
- [ ] Animasi idle: karakter naik-turun halus (`@keyframes float` di CSS atau `animate-` kustom Tailwind)
- [ ] Animasi masuk saat ganti member (fade/slide). Trik: beri `key={member.id}` pada komponen agar React me-mount ulang & animasi jalan lagi
- [ ] Efek parallax ringan mengikuti gerak mouse (opsional)

**Belajar:** positioning (`relative/absolute`), z-index, CSS animation, `key` di React.

---

### TAHAP 9 — Efek Partikel per Karakter
Lapisan partikel ditaruh **di antara background dan karakter** (atau di atas karakter untuk efek tertentu).

**Cara A: tsParticles**
- [ ] `npm i @tsparticles/react @tsparticles/slim`
- [ ] Buat `ParticleLayer.jsx`, terima prop `type` (`leaves`, `stars`, `paint`, `ghost`, `feathers`, `sparks`, `rain`, dll.)
- [ ] Buat objek konfigurasi per tipe (warna, jumlah, kecepatan, arah gerak, bentuk, ukuran)
- [ ] Ganti config saat member berganti (pakai `key` agar partikel di-reset)
- [ ] Atur `pointer-events-none` agar klik tembus ke bawah

**Cara B: Canvas manual (untuk belajar mendalam)**
- [ ] Buat `<canvas>` ukuran penuh hero
- [ ] `useRef` + `useEffect` untuk loop `requestAnimationFrame`
- [ ] Buat class/objek partikel: posisi x,y, kecepatan, ukuran, rotasi, opacity
- [ ] Update + gambar tiap frame, reset partikel saat keluar layar
- [ ] Bersihkan di cleanup `useEffect` (`cancelAnimationFrame`)
- [ ] Variasi perilaku per tema: jatuh (daun, hujan), naik (percikan, gelembung), berkedip (bintang), melayang acak (wisp)

**Performa:**
- [ ] Batasi jumlah partikel (mulai 30–60)
- [ ] Kurangi jumlah di layar kecil
- [ ] Hormati `prefers-reduced-motion`
- [ ] Pause saat tab tidak aktif (`document.visibilityState`)

---

### TAHAP 10 — Voice Random Setiap 1 Menit
**Aturan browser:** audio baru boleh diputar setelah ada interaksi pengguna.

- [ ] Buat `EnterScreen.jsx`: layar penuh bertuliskan "Klik untuk masuk", sekali klik → set `entered = true` → tampilkan web utama. Klik ini yang "membuka kunci" audio
- [ ] Buat hook `useRandomVoice(voices, enabled)`:
  1. Simpan interval ID dengan `useRef`
  2. `useEffect` yang bergantung pada `voices` dan `enabled`
  3. `setInterval(() => { pilih index acak; new Audio(src).play() }, 60_000)`
  4. Cleanup: `clearInterval` + hentikan audio yang sedang jalan saat ganti member / unmount
- [ ] Putar satu voice **segera saat member dipilih** (agar terasa hidup), lalu ulang tiap 60 detik
- [ ] Hindari voice yang sama dua kali berturut-turut (simpan index terakhir)
- [ ] Tangani error: `play()` mengembalikan Promise, beri `.catch()`
- [ ] UI: tombol mute/unmute, slider volume (opsional), indikator "sedang berbicara" (animasi kecil/ bubble teks di dekat karakter)
- [ ] Simpan preferensi mute di `localStorage`

**Belajar:** `useEffect`, cleanup function, `useRef`, Promise, Audio API, batasan autoplay.

> Siapkan minimal 3–5 klip voice pendek per member (< 10 detik, format mp3, ukuran kecil) supaya loading ringan. Pastikan sumbernya sah (lihat Bagian 0.2).

---

### TAHAP 11 — Konten Bawah (Info Member)
Di bawah hero:
- [ ] Nama, generasi, deskripsi singkat
- [ ] Fakta (ulang tahun, tinggi, fanbase, fan name, hashtag) — isi dari sumber resmi
- [ ] Tombol link: YouTube, X, dll. (`target="_blank" rel="noopener noreferrer"`)
- [ ] Seksi opsional: highlight stream (embed YouTube), galeri fanart/ilustrasi (dengan izin), timeline
- [ ] Warna aksen komponen mengikuti `theme` member (pakai inline style atau CSS variable)

**Tip tema dinamis:** set CSS variable di container: `style={{ "--primary": member.theme.primary }}` lalu pakai `bg-[var(--primary)]` di Tailwind.

---

### TAHAP 12 — Responsive & Mobile
- [ ] Desktop: sidebar tetap tampil
- [ ] Mobile (`< md`): sidebar disembunyikan, ada tombol hamburger → drawer geser dari kiri (`translate-x-full` / `-translate-x-full` + transition) + overlay gelap
- [ ] Hero menyesuaikan tinggi, karakter tidak terpotong aneh
- [ ] Tes di Chrome DevTools (mode device) dan HP asli

---

### TAHAP 13 — Polish
- [ ] Loading state / preload gambar karakter (`new Image().src = ...`)
- [ ] Lazy load aset yang tidak terlihat
- [ ] Kompres gambar (WebP) dan audio
- [ ] Hover effect, transisi halus, focus state (aksesibilitas)
- [ ] `alt` di semua gambar, kontras teks cukup
- [ ] Favicon, `<title>`, meta description, Open Graph image
- [ ] Footer: disclaimer "Fan-made, non-commercial. Hololive & karakter adalah milik COVER Corp." + credits

---

### TAHAP 14 — Build & Deploy Static
```bash
npm run build      # hasil di folder dist/
npm run preview    # tes hasil build secara lokal
```
- [ ] Jika deploy ke **GitHub Pages** di subpath (`username.github.io/nama-repo`), set `base: "/nama-repo/"` di `vite.config.js`
- [ ] Pakai **HashRouter** jika memakai router (Tahap 7B)
- [ ] Pilih satu platform deploy:
  - **Netlify / Vercel / Cloudflare Pages:** hubungkan repo GitHub, build command `npm run build`, output `dist`
  - **GitHub Pages:** deploy folder `dist` (mis. dengan GitHub Actions atau paket `gh-pages`)
- [ ] Tes di URL publik: semua gambar muncul, voice bunyi setelah klik, refresh tidak 404

---

### TAHAP 15 — Testing Akhir (Checklist)
- [ ] 9 member semua tampil benar (muka, karakter, tema, partikel, voice)
- [ ] Voice tidak numpuk saat ganti member cepat-cepat
- [ ] Tidak ada memory leak (interval & animasi dibersihkan)
- [ ] Tidak lag di HP menengah
- [ ] Jalan di Chrome, Firefox, Safari
- [ ] Lighthouse: Performance & Accessibility layak
- [ ] Tidak ada error di console

---

## 5. Urutan Pengerjaan yang Disarankan (Milestone)

| Milestone | Isi | Hasil |
|---|---|---|
| M1 | Tahap 1–4 | Project jalan + Tailwind aktif + folder siap |
| M2 | Tahap 5–7 | Sidebar + ganti member berfungsi (data dummy) |
| M3 | Tahap 8 | Hero karakter + animasi selesai untuk 1 member |
| M4 | Tahap 9 | Partikel jalan untuk 1 member → lanjut 9 member |
| M5 | Tahap 10 | Voice random 1 menit berfungsi |
| M6 | Tahap 11–12 | Info member + responsive |
| M7 | Tahap 13–15 | Polish + deploy |

**Saran:** selesaikan **1 member sampai sempurna** (Risu misalnya) sebelum menggandakan ke 8 member lain. Karena semua member memakai komponen yang sama dan hanya data yang beda, sisanya tinggal isi data.

---

## 6. Konsep yang Akan Kamu Pelajari

- JSX, komponen, props, state
- `useState`, `useEffect`, `useRef`, custom hook
- Render list dengan `map()` dan `key`
- Tailwind: layout flex/grid, responsive, transition, animation, arbitrary values
- CSS positioning, z-index layering
- Canvas API & `requestAnimationFrame`
- HTML5 Audio API & kebijakan autoplay
- Git & GitHub, build tool, deploy static

## 7. Sumber Belajar

- Dokumentasi React: react.dev (bagian "Learn")
- Dokumentasi Vite: vitejs.dev
- Dokumentasi Tailwind CSS: tailwindcss.com/docs
- tsParticles: particles.js.org
- MDN Web Docs: HTMLAudioElement, Canvas API, `requestAnimationFrame`
- Dokumentasi Netlify / Vercel / GitHub Pages untuk deploy

## 8. Tips Kerja Manual

1. Commit kecil dan sering, satu fitur = satu commit
2. Kalau error, baca pesan error dulu, lalu cek console browser (F12)
3. Jangan lanjut tahap berikutnya sebelum tahap sekarang bisa dijalankan
4. Catat hal baru yang kamu pelajari di setiap tahap
5. Kerjakan fitur opsional hanya setelah MVP (M1–M6) selesai

# Log Investigasi: Image Asset Tidak Muncul di Menu Items

Tanggal: 2026-10-14

## Kesimpulan utama

Avatar pada menu tidak muncul karena path pada `src/data/members.js` tidak sama
dengan lokasi file asset di `public`.

Komponen `SidebarItem.jsx` sudah benar memanggil gambar:

```jsx
<img src={member.face} alt={member.name} />
```

Namun data menggunakan URL seperti:

```js
face: "/members/risu/face-1.svg"
face: "/members/moona/face.png"
```

Sedangkan file yang ditemukan berada di:

```text
public/assets/members/risu/face-1.svg
public/assets/members/risu/char-1.svg
public/assets/members/risu/char-2.svg
```

## Mengapa gagal

URL yang diawali `/` dibaca dari root aplikasi. Maka browser meminta:

```text
/members/risu/face-1.svg
```

Padahal file publiknya akan diakses melalui:

```text
/assets/members/risu/face-1.svg
```

Akibatnya request gambar mengarah ke lokasi yang salah dan kemungkinan besar
menghasilkan HTTP 404. Pemeriksaan path `face` menghasilkan `MISS` untuk semua
member berikut:

```text
/members/risu/face-1.svg
/members/moona/face.png
/members/iofi/face.png
/members/ollie/face.png
/members/anya/face.png
/members/reine/face.png
/members/zeta/face.png
/members/kaela/face.png
/members/kobo/face.png
```

## Penyebab tambahan yang perlu dicek

Selain prefix `/assets`, file untuk sebagian besar member belum terlihat pada
hasil pemeriksaan asset. Pastikan file tersebut benar-benar ada. Linux juga
case-sensitive: `face.png`, `Face.png`, dan `FACE.PNG` adalah nama berbeda.

## Bukti bahwa bukan masalah build atau JSX

- `Sidebar.jsx` meneruskan object `member` ke `SidebarItem`.
- `SidebarItem.jsx` memakai `member.face` sebagai `src`.
- `npm run lint` berhasil dengan 0 warning dan 0 error.
- `npm run build` berhasil.
- Build tetap dapat berhasil walaupun URL string menunjuk file yang tidak ada;
  validasi keberadaan file perlu dilakukan saat request di browser.

## Perbaikan yang disarankan

### Opsi A — Ubah path data (disarankan)

Jika asset memang disimpan di `public/assets`, ubah semua path menjadi:

```js
face: "/assets/members/risu/face-1.svg"
character: "/assets/members/risu/char-1.svg"
```

Periksa juga path `voices`. Jika file voice berada di `public/assets/voices`,
path `/voices/...` juga harus diubah menjadi `/assets/voices/...`.

### Opsi B — Pindahkan asset

Jika ingin mempertahankan path `/members/...`, pindahkan file ke:

```text
public/members/risu/face-1.svg
```

dan buat struktur yang sama untuk member lain.

## Verifikasi setelah perbaikan

1. Buka DevTools > Network.
2. Reload aplikasi.
3. Pastikan request gambar berstatus `200`, bukan `404`.
4. Klik semua item menu dan periksa setiap avatar.
5. Jalankan `npm run lint` dan `npm run build`.

## Ringkasan akhir

Masalah utamanya adalah data memakai `/members/...`, sedangkan lokasi asset
adalah `public/assets/members/...`. Tambahkan `/assets` pada path data, atau
pindahkan asset agar cocok dengan URL yang digunakan. Setelah itu, pastikan
semua file member tersedia dan kapitalisasi namanya tepat.
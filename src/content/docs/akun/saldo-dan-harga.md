---
title: Saldo dan harga
description: Cara saldo terpotong, cara membaca harga, dan cara mengecek pemakaian.
---

## Sistem bayar sesuai pemakaian

JavaRouters memakai saldo prabayar. Setiap request memotong saldo sesuai jumlah token yang dipakai:

- **Token input**: teks yang kamu kirim (prompt, riwayat percakapan, system prompt).
- **Token output**: teks jawaban dari model.

Harga input dan output berbeda per model.

## Harga

- Harga per model ada di halaman [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing), yang selalu menampilkan angka terbaru.
- Harga input dan output sekitar **70% dari harga resmi** penyedia, dan disinkronkan otomatis setiap jam.
- Saldo dan harga ditampilkan dalam **USD**.

## Isi saldo

Buka menu **Dompet** (`/wallet`) di konsol. Metode pengisian yang aktif ditampilkan di halaman itu.

## Cek pemakaian

Buka menu **Usage Logs** di konsol untuk melihat setiap request: model, jumlah token, dan biaya.

## Batasi pemakaian per API key

Saat membuat atau mengubah API key, kamu bisa membatasi kuota, masa berlaku, dan model yang boleh dipakai. Ini berguna untuk key yang dipakai aplikasi lain atau dibagikan ke anggota tim.

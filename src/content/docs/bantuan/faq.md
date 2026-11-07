---
title: FAQ
description: Pertanyaan yang sering diajukan.
---

## Apakah kode saya perlu diubah banyak?

Tidak. Kalau kamu sudah memakai SDK OpenAI atau Anthropic, cukup ganti base URL dan API key. Lihat [Ringkasan API](/docs/api/ringkasan/).

## Bisakah memakai model Claude lewat format OpenAI?

Bisa. Endpoint `/v1/chat/completions` menerima semua model yang dijual, termasuk Claude, Gemini dan DeepSeek.

## Kenapa nama model berbeda dengan nama resmi?

Nama model mengikuti katalog JavaRouters. Selalu pakai nama dari halaman [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing) atau dari endpoint `/v1/models`.

## Kenapa sebuah model hilang dari daftar?

Daftar model mengikuti ketersediaan dari penyedia dan diperbarui otomatis. Model yang sedang tidak tersedia bisa hilang sementara dari daftar.

## Apakah ada model gambar atau video?

Belum. Saat ini yang dijual adalah model teks.

## Bagaimana cara mengecek biaya sebuah request?

Buka menu **Usage Logs** di konsol. Setiap request tercatat lengkap dengan model, jumlah token, dan biayanya.

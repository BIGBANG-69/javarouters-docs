---
title: Alat dan aplikasi lain
description: Memakai JavaRouters di Cline, Cursor, Cherry Studio dan aplikasi lain.
---

Hampir semua aplikasi yang mendukung "OpenAI-compatible" atau "Anthropic-compatible" bisa memakai JavaRouters. Cari pengaturan provider khusus (custom provider), lalu isi tiga hal:

| Isian | Nilai |
|---|---|
| Base URL (OpenAI-compatible) | `https://javarouters.talentadigitalkudus.id/v1` |
| Base URL (Anthropic) | `https://javarouters.talentadigitalkudus.id` |
| API key | Key dari menu **API Keys** |
| Model | Nama dari halaman [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing) |

Nama menu di tiap aplikasi bisa berbeda antarversi. Panduan di bawah menyebut letak yang umum.

## Cline (VS Code)

1. Buka pengaturan Cline, pilih **API Provider: OpenAI Compatible**.
2. Isi **Base URL** dengan `https://javarouters.talentadigitalkudus.id/v1`.
3. Isi **API Key** dan **Model ID**.

## Cursor

1. Buka **Settings → Models**.
2. Isi **OpenAI API Key** dengan key JavaRouters, lalu aktifkan **Override OpenAI Base URL** dengan `https://javarouters.talentadigitalkudus.id/v1`.
3. Tambahkan nama model dari daftar JavaRouters.

## Cherry Studio

1. Buka **Settings → Model Provider**, lalu tambah provider bertipe **OpenAI**.
2. Isi **API Host** dengan `https://javarouters.talentadigitalkudus.id` dan isi **API Key**.
3. Tambahkan model dengan nama dari daftar JavaRouters.

## Aplikasi lain

Kalau aplikasi hanya meminta "OpenAI API key" tanpa pilihan base URL, aplikasi itu belum bisa dipakai dengan JavaRouters.

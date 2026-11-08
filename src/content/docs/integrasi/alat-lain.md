---
title: Alat dan aplikasi lain
description: Memakai JavaRouters di Cline, Roo Code, Kilo Code, Cursor, Aider, Cherry Studio dan aplikasi lain.
---

Hampir semua aplikasi yang mendukung "OpenAI-compatible" atau "Anthropic-compatible" bisa memakai JavaRouters. Cari pengaturan provider khusus (custom provider), lalu isi:

| Isian | Nilai |
|---|---|
| Base URL (OpenAI-compatible) | `https://javarouters.talentadigitalkudus.id/v1` |
| Base URL (Anthropic) | `https://javarouters.talentadigitalkudus.id` |
| API key | Key dari menu **API Keys** |
| Model | Nama dari halaman [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing) |

Semua model bisa dipakai lewat format OpenAI. Format Anthropic hanya untuk model Claude.

Untuk Claude Code, Codex dan OpenCode ada panduan tersendiri: [Claude Code](/docs/integrasi/claude-code/), [Codex](/docs/integrasi/codex/), [OpenCode](/docs/integrasi/opencode/).

Nama menu di tiap aplikasi bisa berbeda antarversi. Panduan di bawah menyebut letak yang umum.

## Cline, Roo Code dan Kilo Code (VS Code)

Ketiga ekstensi ini pengaturannya mirip.

1. Buka panel ekstensi, lalu buka pengaturannya (ikon roda gigi).
2. Pilih **API Provider: OpenAI Compatible**.
3. Isi **Base URL** dengan `https://javarouters.talentadigitalkudus.id/v1`.
4. Isi **API Key** dengan key JavaRouters dan **Model ID** dengan nama model, misalnya `claude-sonnet-5.5`.

## Cursor

1. Buka **Settings → Models**.
2. Isi **OpenAI API Key** dengan key JavaRouters, lalu aktifkan **Override OpenAI Base URL** dengan `https://javarouters.talentadigitalkudus.id/v1`.
3. Tambahkan nama model dari daftar JavaRouters.

## Aider

Aider membaca alamat dan key dari environment variable. Nama model diberi awalan `openai/`.

macOS dan Linux:

```bash
export OPENAI_API_BASE=https://javarouters.talentadigitalkudus.id/v1
export OPENAI_API_KEY=$JAVAROUTERS_API_KEY
aider --model openai/claude-sonnet-5.5
```

Windows (jalankan sekali, lalu buka terminal baru):

```powershell
setx OPENAI_API_BASE https://javarouters.talentadigitalkudus.id/v1
setx OPENAI_API_KEY sk-...
aider --model openai/claude-sonnet-5.5
```

Aider bisa menampilkan peringatan untuk nama model yang tidak dikenalnya. Peringatan itu boleh diabaikan selama model menjawab.

## Cherry Studio

1. Buka **Settings → Model Provider**, lalu tambah provider bertipe **OpenAI**.
2. Isi **API Host** dengan `https://javarouters.talentadigitalkudus.id` dan isi **API Key**.
3. Tambahkan model dengan nama dari daftar JavaRouters.

## Aplikasi lain

Kalau aplikasi hanya meminta "OpenAI API key" tanpa pilihan base URL, aplikasi itu belum bisa dipakai dengan JavaRouters.

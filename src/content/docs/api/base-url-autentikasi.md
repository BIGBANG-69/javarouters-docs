---
title: Base URL dan autentikasi
description: Alamat endpoint JavaRouters dan cara mengirim API key.
---

## Base URL

| Format | Base URL | Endpoint utama |
|---|---|---|
| OpenAI | `https://javarouters.talentadigitalkudus.id/v1` | `POST /v1/chat/completions` |
| Anthropic | `https://javarouters.talentadigitalkudus.id` | `POST /v1/messages` |

SDK OpenAI memakai base URL **dengan** `/v1`. SDK Anthropic dan Claude Code memakai base URL **tanpa** `/v1`, karena SDK-nya menambahkan `/v1/messages` sendiri.

## Autentikasi

Kirim API key dari menu **API Keys** di konsol.

**Format OpenAI**, lewat header `Authorization`:

```http
Authorization: Bearer sk-...
```

**Format Anthropic**, lewat header `x-api-key` (header `Authorization: Bearer` juga diterima):

```http
x-api-key: sk-...
anthropic-version: 2023-06-01
```

## Keamanan API key

- Simpan key di environment variable atau secret manager, bukan di kode.
- Jangan pakai key di aplikasi frontend (browser atau aplikasi mobile), karena key bisa dibaca pengguna. Panggil JavaRouters dari backend kamu.
- Buat key terpisah untuk tiap aplikasi supaya mudah dicabut kalau bocor. Key yang bocor bisa dihapus di menu **API Keys**.

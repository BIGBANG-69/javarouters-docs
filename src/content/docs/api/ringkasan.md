---
title: Ringkasan API
description: Base URL, autentikasi, daftar endpoint, dan format respons JavaRouters.
---

JavaRouters memakai format API yang sama dengan **OpenAI** dan **Anthropic**. Library atau kode yang sudah bisa memanggil OpenAI atau Anthropic cukup diganti base URL dan API key-nya.

## Base URL

| Format | Base URL | Dipakai oleh |
|---|---|---|
| OpenAI | `https://javarouters.talentadigitalkudus.id/v1` | SDK OpenAI, LangChain, Cline, Cursor, HTTP langsung |
| Anthropic | `https://javarouters.talentadigitalkudus.id` | SDK Anthropic, Claude Code |

SDK OpenAI memakai base URL **dengan** `/v1`. SDK Anthropic memakai base URL **tanpa** `/v1`, karena SDK-nya menambahkan `/v1/messages` sendiri.

## Endpoint

| Method | Path | Fungsi |
|---|---|---|
| `POST` | `/v1/chat/completions` | Percakapan format OpenAI. Bisa untuk semua model. [Detail](/docs/api/chat-completions/) |
| `POST` | `/v1/messages` | Percakapan format Anthropic. [Detail](/docs/api/messages-anthropic/) |
| `GET` | `/v1/models` | Daftar model yang bisa dipakai key kamu. [Detail](/docs/api/daftar-model/) |
| `GET` | `/v1/dashboard/billing/subscription` | Batas saldo key. [Detail](/docs/api/saldo-key/) |
| `GET` | `/v1/dashboard/billing/usage` | Total pemakaian key. [Detail](/docs/api/saldo-key/) |

Saat ini JavaRouters menjual **model teks**. Endpoint gambar, audio, embedding, dan video belum dibuka untuk dijual.

## Autentikasi

Buat API key di menu **API Keys** (`/keys`) di konsol. Key berbentuk `sk-...`.

**Format OpenAI**, lewat header `Authorization`:

```http
Authorization: Bearer sk-...
Content-Type: application/json
```

**Format Anthropic**, lewat header `x-api-key` (header `Authorization: Bearer` juga diterima):

```http
x-api-key: sk-...
anthropic-version: 2023-06-01
Content-Type: application/json
```

## Format respons dan error

- Respons sukses mengikuti format OpenAI atau Anthropic, sesuai endpoint yang dipanggil.
- Error memakai format OpenAI dengan kode status HTTP yang sesuai:

```json
{
  "error": {
    "message": "penjelasan error",
    "type": "...",
    "code": "..."
  }
}
```

Daftar lengkapnya ada di [Kode error](/docs/api/kode-error/).

## Nama model

Pakai nama model **persis** seperti di halaman [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing) atau dari [`GET /v1/models`](/docs/api/daftar-model/), misalnya `claude-sonnet-4.6`. Nama bisa berbeda dari ID resmi penyedia.

## Keamanan API key

- Simpan key di environment variable atau secret manager, bukan di kode. Contoh di dokumentasi ini membaca key dari `JAVAROUTERS_API_KEY`.
- Jangan pakai key di frontend (browser atau aplikasi mobile), karena key bisa dibaca pengguna. Panggil JavaRouters dari backend kamu.
- Buat key terpisah per aplikasi, dan batasi kuota atau modelnya bila perlu. Key yang bocor bisa dihapus di menu **API Keys**.

---
title: HTTP (bahasa lain)
description: Memanggil JavaRouters dari bahasa apa pun lewat HTTP biasa.
---

Bahasa apa pun yang bisa mengirim request HTTPS dan mengolah JSON bisa memakai JavaRouters, misalnya Ruby, Rust, Kotlin, Dart/Flutter (dari backend), atau aplikasi no-code seperti n8n dan Make. Cukup ikuti spesifikasi ini.

## Request

```http
POST /v1/chat/completions HTTP/1.1
Host: javarouters.talentadigitalkudus.id
Authorization: Bearer sk-...
Content-Type: application/json

{
  "model": "claude-sonnet-4.6",
  "messages": [
    {"role": "system", "content": "Jawab dalam bahasa Indonesia."},
    {"role": "user", "content": "Halo"}
  ]
}
```

## Respons sukses (HTTP 200)

Ambil teks jawaban dari `choices[0].message.content`:

```json
{
  "choices": [
    { "index": 0, "message": { "role": "assistant", "content": "Halo! Ada yang bisa saya bantu?" }, "finish_reason": "stop" }
  ],
  "usage": { "prompt_tokens": 15, "completion_tokens": 9, "total_tokens": 24 }
}
```

## Respons error (HTTP 4xx/5xx)

```json
{ "error": { "message": "...", "type": "...", "code": "..." } }
```

Arti setiap kode status ada di [Kode error](/docs/api/kode-error/).

## Daftar periksa integrasi

- [ ] URL: `https://javarouters.talentadigitalkudus.id/v1/chat/completions`
- [ ] Header `Authorization: Bearer <API key>` dan `Content-Type: application/json`
- [ ] `model` diambil dari [daftar model](/docs/api/daftar-model/), ditulis persis
- [ ] Timeout minimal 60–120 detik, atau pakai [streaming](/docs/panduan/streaming/)
- [ ] Error `429` dan `5xx` dicoba ulang dengan jeda ([Retry](/docs/panduan/retry/))
- [ ] API key disimpan di server, bukan di aplikasi frontend

## Aplikasi no-code (n8n, Make, Zapier)

Pakai node atau modul **HTTP Request** dengan pengaturan di atas. Di n8n, kamu juga bisa memakai node **OpenAI** dengan kredensial yang base URL-nya diganti ke `https://javarouters.talentadigitalkudus.id/v1`.

---
title: Daftar model
description: Cara mengetahui model yang tersedia untuk API key kamu.
---

Daftar model berubah mengikuti ketersediaan dari penyedia, jadi dokumentasi ini sengaja **tidak** mencantumkan daftar tetap. Ada dua cara melihat daftar terbaru.

## Halaman Model dan harga

Buka [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing). Halaman itu menampilkan setiap model beserta harga dan format endpoint yang didukung (OpenAI, Anthropic, atau keduanya).

## Lewat API

```bash
curl https://javarouters.talentadigitalkudus.id/v1/models \
  -H "Authorization: Bearer $JAVAROUTERS_API_KEY"
```

Respons mengikuti format OpenAI, dan field `data[].id` berisi nama model yang bisa dipakai di parameter `model`.

## Penamaan model

Pakai nama **persis** seperti yang tertulis di daftar, misalnya `claude-sonnet-4.6` atau `deepseek-v4-pro`. Nama bisa berbeda dari ID resmi penyedia, jadi jangan mengandalkan nama default dari SDK atau alat yang kamu pakai.

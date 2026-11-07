---
title: Daftar model
description: GET /v1/models — model yang bisa dipakai API key kamu.
---

```http
GET https://javarouters.talentadigitalkudus.id/v1/models
```

Daftar model berubah mengikuti ketersediaan dari penyedia dan diperbarui otomatis, jadi dokumentasi ini sengaja **tidak** mencantumkan daftar tetap. Ambil daftarnya dari endpoint ini, atau lihat halaman [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing) yang juga menampilkan harga dan format endpoint yang didukung tiap model.

## Request

```bash
curl https://javarouters.talentadigitalkudus.id/v1/models \
  -H "Authorization: Bearer $JAVAROUTERS_API_KEY"
```

Dengan SDK OpenAI:

```python
for model in client.models.list():
    print(model.id)
```

## Respons

Format OpenAI. Field `data[].id` berisi nama yang dipakai di parameter `model`.

```json
{
  "object": "list",
  "data": [
    { "id": "claude-sonnet-4.6", "object": "model", "owned_by": "..." },
    { "id": "deepseek-v4-pro", "object": "model", "owned_by": "..." }
  ]
}
```

Isi contoh di atas hanya ilustrasi. Jika key kamu dibatasi ke model tertentu, daftar yang muncul menyesuaikan.

## Penamaan model

- Pakai nama **persis** seperti di daftar, misalnya `claude-sonnet-4.6`. Nama bisa berbeda dari ID resmi penyedia, jadi jangan mengandalkan nama default dari SDK atau alat yang kamu pakai.
- Model bisa hilang sementara dari daftar ketika penyedianya tidak tersedia. Simpan nama model di konfigurasi aplikasi (bukan ditulis mati di kode) supaya mudah diganti.

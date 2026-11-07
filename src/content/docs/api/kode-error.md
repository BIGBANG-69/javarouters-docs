---
title: Kode error
description: Arti kode status HTTP dari JavaRouters dan cara mengatasinya.
---

Error dikembalikan dalam format OpenAI:

```json
{
  "error": {
    "message": "penjelasan error",
    "type": "...",
    "code": "..."
  }
}
```

| Status | Arti | Yang perlu dilakukan |
|---|---|---|
| `400` | Request tidak valid | Cek format JSON dan parameter, misalnya `messages` kosong atau parameter tidak didukung model. |
| `401` | API key tidak valid | Cek key di header `Authorization: Bearer ...` atau `x-api-key`. Pastikan key belum dihapus atau kedaluwarsa. |
| `403` | Saldo tidak cukup, atau API key tidak diizinkan memakai model itu | Kalau kodenya `insufficient_user_quota`, isi saldo di menu **Dompet**. Kalau pesannya menyebut model, cek batasan model pada API key di menu **API Keys**. |
| `404` | Endpoint tidak ditemukan | Cek base URL: format OpenAI memakai `/v1`, SDK Anthropic tanpa `/v1`. |
| `429` | Terlalu banyak request | Tunggu sebentar, lalu kirim ulang dengan jeda (*exponential backoff*). |
| `503` dengan kode `model_not_found` | Model tidak tersedia | Cek ejaan nama model di halaman [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing). Model yang sedang tidak tersedia bisa hilang sementara dari daftar. |
| `500`, `502`, `503` lainnya | Gangguan di sisi server atau penyedia model | Coba lagi beberapa saat kemudian, atau pakai model lain. |

Isi `message` biasanya menjelaskan penyebab pastinya. Sertakan isi tersebut saat menghubungi dukungan.

## Error mana yang boleh dicoba ulang

| Coba ulang otomatis | Jangan dicoba ulang tanpa perubahan |
|---|---|
| `429`, `500`, `502`, `503` (selain `model_not_found`), timeout, koneksi terputus | `400`, `401`, `403`, `404`, `503 model_not_found` |

Error di kolom kanan tidak akan berubah hanya dengan mengirim ulang; perbaiki request, key, saldo, atau nama modelnya dulu. Contoh kode retry ada di [Retry dan penanganan error](/docs/panduan/retry/).

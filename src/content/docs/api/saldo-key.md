---
title: Saldo dan pemakaian key
description: Mengecek batas saldo dan total pemakaian sebuah API key lewat API.
---

Dua endpoint ini kompatibel dengan endpoint billing lama milik OpenAI, sehingga banyak aplikasi pihak ketiga bisa menampilkan saldo secara otomatis. Keduanya memakai API key yang sama dengan request inference.

Nilainya dihitung untuk **API key yang dipakai**, dalam **USD**.

## Batas saldo key

```http
GET https://javarouters.talentadigitalkudus.id/v1/dashboard/billing/subscription
```

```bash
curl https://javarouters.talentadigitalkudus.id/v1/dashboard/billing/subscription \
  -H "Authorization: Bearer $JAVAROUTERS_API_KEY"
```

```json
{
  "object": "billing_subscription",
  "has_payment_method": true,
  "soft_limit_usd": 10.0,
  "hard_limit_usd": 10.0,
  "system_hard_limit_usd": 10.0,
  "access_until": 0
}
```

| Field | Keterangan |
|---|---|
| `hard_limit_usd` | Total kuota key (sisa ditambah yang sudah terpakai), dalam USD. Untuk key tanpa batas kuota, nilainya `100000000`. |
| `access_until` | Waktu kedaluwarsa key (Unix timestamp, detik). `0` berarti tidak kedaluwarsa. |

## Total pemakaian key

```http
GET https://javarouters.talentadigitalkudus.id/v1/dashboard/billing/usage
```

```bash
curl https://javarouters.talentadigitalkudus.id/v1/dashboard/billing/usage \
  -H "Authorization: Bearer $JAVAROUTERS_API_KEY"
```

```json
{
  "object": "list",
  "total_usage": 250.0
}
```

`total_usage` adalah total pemakaian key dalam **sen USD** (dibagi 100 untuk mendapat USD). Pada contoh di atas, pemakaiannya 2,50 USD.

## Menghitung sisa saldo

```text
sisa (USD) = hard_limit_usd - total_usage / 100
```

Contoh Python:

```python
import os, requests

BASE = "https://javarouters.talentadigitalkudus.id/v1/dashboard/billing"
headers = {"Authorization": f"Bearer {os.environ['JAVAROUTERS_API_KEY']}"}

limit = requests.get(f"{BASE}/subscription", headers=headers, timeout=30).json()
usage = requests.get(f"{BASE}/usage", headers=headers, timeout=30).json()
print("Sisa:", round(limit["hard_limit_usd"] - usage["total_usage"] / 100, 4), "USD")
```

Angka di contoh hanya ilustrasi. Riwayat per request (model, token, biaya) ada di menu **Usage Logs** di konsol.

---
title: Pengenalan
description: Apa itu JavaRouters dan untuk siapa.
---

JavaRouters adalah **gateway API AI**: satu akun dan satu API key untuk mengakses banyak model AI, antara lain Claude, GPT, Gemini, Grok, DeepSeek, Kimi, Qwen, GLM dan MiniMax.

## Cara kerjanya

1. Kamu mendaftar dan mengisi saldo.
2. Kamu membuat API key di konsol.
3. Aplikasimu mengirim request ke JavaRouters, bukan ke penyedia aslinya. JavaRouters meneruskannya ke model yang kamu pilih.
4. Biaya setiap request dipotong dari saldo sesuai pemakaian token.

## Kenapa memakai JavaRouters

- **Satu key untuk banyak model.** Tidak perlu akun dan tagihan terpisah di tiap penyedia.
- **Kompatibel dengan OpenAI dan Anthropic.** SDK dan alat yang sudah ada (OpenAI SDK, Anthropic SDK, Claude Code, Cline, dan lain-lain) cukup diganti base URL dan API key-nya.
- **Harga di bawah harga resmi.** Harga input dan output sekitar 70% dari harga resmi penyedia, dan diperbarui otomatis setiap jam. Lihat [Saldo dan harga](/docs/akun/saldo-dan-harga/).
- **Setiap request tercatat.** Model, jumlah token, dan biaya setiap request bisa dilihat di menu **Usage Logs** di konsol.

## Yang perlu diketahui

- Daftar model bisa berubah karena mengikuti ketersediaan dari penyedia. Daftar terbaru selalu ada di halaman [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing) atau lewat [endpoint daftar model](/docs/api/daftar-model/).
- Saat ini yang tersedia adalah **model teks** (chat). Model gambar dan video belum dijual.

Lanjut ke [Mulai cepat](/docs/mulai/mulai-cepat/) untuk mengirim request pertama.

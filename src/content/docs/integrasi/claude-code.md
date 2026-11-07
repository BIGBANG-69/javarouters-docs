---
title: Claude Code
description: Menjalankan Claude Code dengan API key JavaRouters.
---

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) bisa diarahkan ke JavaRouters lewat environment variable.

## macOS dan Linux

```bash
export ANTHROPIC_BASE_URL=https://javarouters.talentadigitalkudus.id
export ANTHROPIC_AUTH_TOKEN=$JAVAROUTERS_API_KEY
export ANTHROPIC_MODEL=claude-sonnet-4.6
claude
```

## Windows (PowerShell)

```powershell
$env:ANTHROPIC_BASE_URL = "https://javarouters.talentadigitalkudus.id"
$env:ANTHROPIC_AUTH_TOKEN = $env:JAVAROUTERS_API_KEY
$env:ANTHROPIC_MODEL = "claude-sonnet-4.6"
claude
```

## Simpan permanen

Supaya tidak perlu mengetik ulang, tambahkan ke `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://javarouters.talentadigitalkudus.id",
    "ANTHROPIC_AUTH_TOKEN": "sk-...",
    "ANTHROPIC_MODEL": "claude-sonnet-4.6"
  }
}
```

## Catatan

- `ANTHROPIC_BASE_URL` **tanpa** `/v1`.
- Isi `ANTHROPIC_MODEL` dengan nama dari halaman [Model dan harga](https://javarouters.talentadigitalkudus.id/pricing). Nama model default bawaan Claude Code bisa jadi tidak tersedia dengan nama yang sama di JavaRouters.
- Kalau sebelumnya kamu login Claude Code dengan akun Anthropic, keluar dulu (`/logout`) supaya yang dipakai adalah API key JavaRouters.
- Biaya pemakaian bisa dicek di menu **Usage Logs** di konsol.

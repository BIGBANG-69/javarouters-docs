# AGENTS.md — JavaRouters Docs

Read this whole file before planning, writing content, or changing the build or deployment.

## What this repository is

The public user documentation for **JavaRouters**, an AI API gateway live at
https://javarouters.talentadigitalkudus.id. The site is built with
[Astro Starlight](https://starlight.astro.build) and served at
**https://javarouters.talentadigitalkudus.id/docs/**.

- The gateway itself is a separate repository, `BIGBANG-69/javarouters`, a fork of
  [QuantumNous/new-api](https://github.com/QuantumNous/new-api) (AGPLv3). Product facts,
  positioning, and brand rules live in that repository's `PRODUCT.md` and `DESIGN.md`.
- The docs are kept in their own repository on purpose: the gateway fork regularly merges
  upstream new-api, and a separate repository keeps docs changes out of those merges. Do not
  move the docs into the gateway repository.

## Audience and language

- Readers are JavaRouters customers: developers, startups, people using AI coding tools
  (Claude Code, Cline, Cursor), companies, and resellers. Most are in Indonesia.
- Write content in **Bahasa Indonesia**: plain, direct, second person ("kamu"), no hype.
  Code, API field names, menu names shown in the console, and error codes stay as they are.
- Code comments and repository files for maintainers (this file, README, workflow) are in English.

## Content rules (mandatory)

1. **Never invent facts.** Every claim about the gateway must be checkable in the gateway code,
   the live `/api/status` or `/api/pricing`, or the gateway's `PRODUCT.md`. If you cannot verify
   something, leave it out or ask the user.
2. **No hard-coded model lists or prices.** Models and prices change hourly (InferHub sync).
   Link to https://javarouters.talentadigitalkudus.id/pricing or `GET /v1/models` instead.
   A model name may appear in a code example (currently `claude-sonnet-4.6`); before changing
   examples, confirm the name exists in the live `/api/pricing`.
3. **Payments:** do not claim Rupiah, QRIS, bank transfer, or any specific payment method until
   the gateway actually offers it. Say the available methods are shown in the **Dompet** menu.
4. **No fabricated social proof:** no testimonials, customer logos, uptime figures, or usage stats.
5. **Support contact:** no support email exists yet. Do not invent one; ask the user.
6. **Attribution:** keep `bantuan/tentang.md` crediting New API by QuantumNous (AGPLv3) and
   linking the public source. Never remove or rename new-api / QuantumNous references.
7. Facts verified against the gateway code (keep consistent if you edit them):
   - OpenAI format: base URL `https://<domain>/v1`, `POST /v1/chat/completions`, header
     `Authorization: Bearer <key>`. All sold models work through this format.
   - Anthropic format: base URL `https://<domain>` (no `/v1`), `POST /v1/messages`, header
     `x-api-key` (Bearer is also accepted).
   - Errors use the OpenAI error shape. `401` invalid key; `403` with
     `insufficient_user_quota` when balance is short, or when a key is restricted from a model;
     `429` rate limit; `503` with `model_not_found` for an unknown or unavailable model.
   - Console menus: **API Keys** (`/keys`), **Dompet** / Wallet (`/wallet`), **Usage Logs**.
   - Balances and prices display in USD. Only text models are sold (no image/video yet).

## Project layout

```
astro.config.mjs            Site config: base path, locale, sidebar (edit when adding pages)
src/content/docs/           Pages (.md / .mdx). The file path is the URL slug.
  index.mdx                 Landing (splash template)
  mulai/                    Getting started
  api/                      API reference
  integrasi/                Tool and app integrations
  akun/                     Balance, pricing, usage
  bantuan/                  Errors, FAQ, about and license
src/styles/theme.css        Emerald accent matching the gateway theme
deploy/server/              Files installed on the VPS (see Deployment)
.github/workflows/deploy.yml  Build and publish pipeline
```

## Writing and editing pages

- Every page needs frontmatter `title` and `description`.
- Add every new page to the `sidebar` in `astro.config.mjs`; pages are not auto-listed.
- Use `.mdx` only when a page needs Starlight components (`Tabs`, `Steps`, `Card`); otherwise `.md`.
- **Internal links must include the base path and a trailing slash**, for example
  `[Mulai cepat](/docs/mulai/mulai-cepat/)`. Links without `/docs/` break in production.
- When adding code examples, show the OpenAI or Anthropic SDK with only the base URL and key
  changed, and read the key from the `JAVAROUTERS_API_KEY` environment variable.

## Commands

Use Bun.

```bash
bun install          # install dependencies
bun run dev          # local preview at http://localhost:4321/docs/
bun run build        # production build into dist/ (must pass before pushing)
bun run preview      # serve the production build locally
```

Before finishing any change, run `bun run build` and confirm it completes without errors.
Check that every internal link points to an existing page (the build does not fail on broken links).

## Deployment

Pull-based, no SSH credentials in GitHub:

1. A push to `main` runs `.github/workflows/deploy.yml`: it builds the site and force-pushes
   `dist/` into the `site/` folder of the orphan branch **`deploy`**. Never edit `deploy` by hand.
2. On the VPS (`srv-javarouters`, Ubuntu 24.04, user `ubuntu`), the systemd timer
   `javarouters-docs-sync.timer` runs `deploy/server/docs-sync.sh` every 5 minutes. The script
   fast-forwards the clone at `/opt/javarouters/docs-site` to `origin/deploy`.
3. The gateway's Caddy container (`javarouters-caddy`, compose project in `/opt/javarouters`)
   mounts `/opt/javarouters/docs-site/site` read-only at `/srv/docs` and serves it under `/docs/`.
   Everything else on the domain is proxied to the gateway. The Caddy snippet is
   `deploy/server/Caddyfile.docs.snippet`.

A change is live about 5 minutes after the workflow finishes. To publish immediately, run on the
VPS: `sudo systemctl start javarouters-docs-sync.service`.

### Constraints

- The domain is behind Cloudflare. Cloudflare's free certificate covers only one subdomain level,
  so a `docs.javarouters...` subdomain would not get HTTPS. That is why the docs use the `/docs/`
  path. Do not switch to a subdomain without a certificate plan.
- `base: '/docs'` in `astro.config.mjs` and the Caddy `handle_path /docs/*` must change together.
- The VPS has 2 GB RAM and no Node.js or Bun. Do not build on the server.
- The gateway's admin setting **Docs Link** (`docs_link`) points the gateway's "Dokumentasi"
  menu here. Its value must be `https://javarouters.talentadigitalkudus.id/docs/`.

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
5a. **No infrastructure details:** never name server locations, regions, hosting providers or
   upstream sources. The owner asked for this explicitly.
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
   - Cloudflare in front of the domain returns `403` plain text `error code: 1010` for the
     `Python-urllib` user-agent (checked 2026-11-08; requests, httpx, the OpenAI SDKs, okhttp,
     Java HttpClient, Guzzle, Go, axios, node, curl, Dart, Ruby and an empty UA all pass).
   - Key balance: `GET /v1/dashboard/billing/subscription` (`hard_limit_usd` = key quota in USD,
     `100000000` when unlimited) and `/v1/dashboard/billing/usage` (`total_usage` in US cents).
   - Console menus: **API Keys** (`/keys`), **Dompet** / Wallet (`/wallet`), **Usage Logs**.
   - Balances and prices display in USD. Only text models are sold (no image/video yet).

## Project layout

```
astro.config.mjs            Site config: base path, locale, theme
src/sidebar.mjs             Page order: the ONE list used by the sidebar, llms.txt and the MCP index
src/content/docs/           Pages (.md / .mdx). The file path is the URL slug.
  index.mdx                 Landing (splash template, not in the sidebar)
  mulai/                    Getting started
  api/                      API reference (endpoints, errors, key balance)
  panduan/                  Guides (streaming, tool calling, retry)
  sdk/                      Per-language integration (Python, JS/TS, Go, PHP, Java, C#, raw HTTP)
  integrasi/                Docs MCP, Claude Code, other tools
  akun/                     Balance, pricing, usage
  bantuan/                  FAQ, about and license
src/styles/theme.css        Emerald accent matching the gateway theme
scripts/build-ai-files.mjs  Builds dist/llms.txt, dist/llms-full.txt, mcp-dist/pages.json
mcp/server.ts               Read-only docs MCP server (Streamable HTTP), bundled to mcp-dist/server.mjs
deploy/server/              Files installed on the VPS (see Deployment)
.github/workflows/deploy.yml  Build and publish pipeline
```

## Writing and editing pages

- Every page needs frontmatter `title` and `description` (both feed llms.txt and the MCP index).
- Add every new page to `src/sidebar.mjs`; pages are not auto-listed, and a page missing there is
  also missing from llms.txt and the MCP server. The build fails if a listed slug has no file.
- A new language guide under `sdk/` must also be mapped in `LANGUAGE_PAGES` and the
  `get_integration_example` enum in `mcp/server.ts`.
- MDX components are flattened for AI by `scripts/build-ai-files.mjs` (`Tabs`, `TabItem`, `Steps`,
  `CardGrid`, `:::note`, `:::caution`). If you use another component, extend that script.
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
bun run build        # site (dist/) + llms.txt + MCP bundle and index (mcp-dist/); must pass
bun run preview      # serve the production build locally
bun run mcp          # run the built MCP server locally (PORT env, default 3100)
```

Before finishing any change, run `bun run build` and confirm it completes without errors.
Check that every internal link points to an existing page (the build does not fail on broken links).
After changing `mcp/server.ts`, run it locally and call every tool with an MCP client
(for example the SDK's `Client` + `StreamableHTTPClientTransport`) before pushing.

## Docs MCP server

`https://javarouters.talentadigitalkudus.id/mcp` lets customers' AI assistants search and read
these docs to write integration code. Scope is deliberately **docs only and read-only**: no login,
no access to accounts, API keys, balances or the gateway database. Do not add account tools here;
that would need authentication and a separate security review.

- Stateless Streamable HTTP with JSON responses (`enableJsonResponse`); `GET /mcp` returns 405.
  `GET /health` reports the page count.
- Tools: `list_doc_pages`, `search_docs`, `get_doc_page` (slug or URL), `get_integration_example`.
- Content is read from `pages.json` and reloaded when the file changes, so docs edits go live
  without restarting the container. A changed `server.mjs` triggers a restart from `docs-sync.sh`.
- Request bodies are capped at 64 KB; tool inputs are length-limited by zod schemas.
- `@modelcontextprotocol/sdk` and `zod` are devDependencies because the server is bundled by Bun
  into one file that runs on the stock `node:22-alpine` image.

## Deployment

Pull-based, no SSH credentials in GitHub:

1. A push to `main` runs `.github/workflows/deploy.yml`: it builds everything and force-pushes the
   orphan branch **`deploy`** with two folders: `site/` (static docs, llms files) and `mcp/`
   (`server.mjs`, `pages.json`). Never edit `deploy` by hand.
2. On the VPS (`srv-javarouters`, Ubuntu 24.04, user `ubuntu`), the systemd timer
   `javarouters-docs-sync.timer` runs `deploy/server/docs-sync.sh` every 5 minutes. The script
   resets the clone at `/opt/javarouters/docs-site` to `origin/deploy` and restarts the MCP
   container only when `mcp/server.mjs` changed.
3. Compose project `/opt/javarouters`:
   - `javarouters-caddy` mounts `docs-site/site` read-only at `/srv/docs`; it serves `/docs/`,
     `/llms.txt`, `/llms-full.txt`, proxies `/mcp` to `docs-mcp:3100`, and proxies everything else
     to the gateway. Snippet: `deploy/server/Caddyfile.docs.snippet`.
   - `javarouters-docs-mcp` (service `docs-mcp`, `node:22-alpine`, read-only, 128 MB limit) mounts
     `docs-site/mcp` at `/app`. Service block: `deploy/server/docker-compose.docs-mcp.yml`.

A change is live about 5 minutes after the workflow finishes. To publish immediately, run on the
VPS: `sudo systemctl start javarouters-docs-sync.service`. Restarting Caddy briefly interrupts the
gateway API; validate a new Caddyfile first with
`docker run --rm -e DOMAIN=... -v $PWD/Caddyfile:/etc/caddy/Caddyfile:ro caddy:2-alpine caddy validate --config /etc/caddy/Caddyfile`.

### Constraints

- The domain is behind Cloudflare. Cloudflare's free certificate covers only one subdomain level,
  so a `docs.javarouters...` subdomain would not get HTTPS. That is why the docs use the `/docs/`
  path. Do not switch to a subdomain without a certificate plan.
- `base: '/docs'` in `astro.config.mjs` and the Caddy `handle_path /docs/*` must change together.
- The VPS has 2 GB RAM and no Node.js or Bun. Do not build on the server.
- The gateway's admin setting **Docs Link** (`docs_link`) points the gateway's "Dokumentasi"
  menu here. Its value must be `https://javarouters.talentadigitalkudus.id/docs/`.

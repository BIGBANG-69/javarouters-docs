# JavaRouters Docs

Public user documentation for [JavaRouters](https://javarouters.talentadigitalkudus.id), built with
[Astro Starlight](https://starlight.astro.build). Content is written in Bahasa Indonesia.

| What | Where |
|---|---|
| Docs site | https://javarouters.talentadigitalkudus.id/docs/ |
| llms.txt | https://javarouters.talentadigitalkudus.id/llms.txt and `/llms-full.txt` |
| Docs MCP server (read-only, Streamable HTTP) | https://javarouters.talentadigitalkudus.id/mcp |

Connect the MCP server to Claude Code:

```bash
claude mcp add --transport http javarouters-docs https://javarouters.talentadigitalkudus.id/mcp
```

## Quick start

```bash
bun install
bun run dev      # http://localhost:4321/docs/
bun run build    # site, llms.txt and the MCP server bundle
bun run mcp      # run the built MCP server on :3100
```

Pages live in `src/content/docs/` and must be listed in `src/sidebar.mjs`.

## Deployment

Pushing to `main` builds everything with GitHub Actions and publishes it to the `deploy` branch.
The VPS pulls that branch every 5 minutes; Caddy serves the site and proxies `/mcp` to the MCP
container. Details, content rules, and constraints are in [AGENTS.md](AGENTS.md).

## License and attribution

JavaRouters is built on [New API](https://github.com/QuantumNous/new-api) by QuantumNous (AGPLv3).
The gateway source is public at [BIGBANG-69/javarouters](https://github.com/BIGBANG-69/javarouters).

# JavaRouters Docs

Public user documentation for [JavaRouters](https://javarouters.talentadigitalkudus.id),
served at **https://javarouters.talentadigitalkudus.id/docs/**. Built with
[Astro Starlight](https://starlight.astro.build).

## Quick start

```bash
bun install
bun run dev      # http://localhost:4321/docs/
bun run build    # production build into dist/
```

Pages live in `src/content/docs/` and must be added to the sidebar in `astro.config.mjs`.
Content is written in Bahasa Indonesia.

## Deployment

Pushing to `main` builds the site with GitHub Actions and publishes it to the `deploy` branch.
The VPS pulls that branch every 5 minutes and Caddy serves it under `/docs/`.
Details, content rules, and constraints are in [AGENTS.md](AGENTS.md).

## License and attribution

JavaRouters is built on [New API](https://github.com/QuantumNous/new-api) by QuantumNous (AGPLv3).
The gateway source is public at [BIGBANG-69/javarouters](https://github.com/BIGBANG-69/javarouters).

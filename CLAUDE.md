# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal, browser-only toolkit of work calculators for an Argentine kiosk (ARS currency, `es-AR` formatting). No backend, database, or auth: Astro builds static pages and all computation runs in client-side scripts. UI text, domain terms, and most identifiers are in Spanish — keep new code consistent with that.

Tools (one page each):
- `/` — Cierre diario (daily cash close): `src/pages/index.astro`
- `/precios` — Calculadora de precios (retail and PedidosYa pricing): `src/pages/precios.astro`

## Commands

Requires Node.js `>=22.12.0`.

```sh
npm install
npx astro dev --background   # start dev server in background (http://localhost:4321)
npx astro dev status|logs|stop
npm test                     # vitest run (all tests)
npx vitest run src/utils/calculadoraPrecios.test.ts   # single file
npx vitest run -t "redondea"                          # tests matching a name
npm run build                # static build to dist/
```

There is no lint script and no separate type-check step configured; TypeScript uses `astro/tsconfigs/strict`.

## Architecture

Each tool is split into the same layers:

- `src/types/<tool>.ts` — `…Input` / `…Result` interfaces.
- `src/utils/<tool>.ts` — pure calculation function (`calcularCierreDiario`, `calcularPrecio`) plus constants (multipliers like `IVA`, `REMARQUE_*`). This is the only place business formulas live, and it is what tests cover (`src/utils/*.test.ts`, colocated, no vitest config file).
- `src/components/<Tool>.astro` — static form + results markup and a `<script>` that reads the form via `FormData`, parses with `parsearNumero` (`src/utils/number.ts`, accepts `,` as decimal separator), validates, calls the pure function, and writes formatted values into elements keyed by `data-result="<resultKey>"` / `data-price-result="<resultKey>"`. Those attribute values must match the `Result` interface keys exactly, since the script iterates `Object.entries(result)`.
- `src/pages/<route>.astro` — wraps the component in `ToolLayout` with an `activeTool` id.

Layout chain: `Layout.astro` (html shell, includes `<ClientRouter />` for client-side navigation and imports `src/styles/global.css`) → `ToolLayout.astro` (header, `ToolNavigation`, footer). Adding a tool means extending the `'cierre' | 'precios'` union in both `ToolLayout.astro` and `ToolNavigation.astro` and adding a nav link.

Rounding conventions differ by tool and are deliberate:
- Cierre diario computes without internal rounding; only display rounds, via `formatearPesos` → `redondearACentenas` (ceil to the next hundred, including negatives). Exception: `recompraCigarrillos` is rounded inside the calculation.
- Precios rounds suggested prices to the *nearest* hundred (`redondearACentenaMasCercana`) inside the calculation, and displays with `formatearPesosExactos` (2 decimals, trailing `,00` stripped).

Since `ClientRouter` is enabled, Astro bundled `<script>`s run once per full page load rather than on every client-side navigation; code that binds to page DOM needs to account for that (e.g. `astro:page-load`).

Styling: Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config`; theme tokens in the `@theme` block of `global.css`). Shared component classes (`.panel`, `.field`, `.button-primary`, `.result-row`, `.choice`, `.price-*`, etc.) are hand-written CSS in `global.css`, mixed with Tailwind utilities in markup.

## Commits

Semantic commit messages following the existing log style (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`), grouping unrelated changes into separate commits.

## Documentation

Full Astro documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

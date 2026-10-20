# EasyPM · Landing Page 2

A new landing page for EasyPM, aimed at Ontario condominium management design partners and investors. This is independent of the EasyPM application and replaces no existing application code.

## Experience

- Minimal white, EasyPM blue (`#033AA8`), and navy visual system.
- Locally hosted Plus Jakarta Sans with its SIL OFL license.
- Three accessible, keyboard-operated product-preview tabs.
- Fictional Maple Court examples, clearly labelled as illustrative product direction.
- Dedicated design-partner and investor inquiry paths.
- Responsive mobile navigation, native modal focus handling, FAQ disclosures, and reduced-motion support.
- Dedicated inquiry privacy notice.

The marketing copy distinguishes the current report-preparation focus from the connected-workspace roadmap. It makes no customer-count, performance, certification, active-integration, or investment-return claims. Prices are not advertised as final.

## Stack and entry points

React, TypeScript, Vinext, and Cloudflare Workers through ChatGPT Sites. The supplied Sites build integration is retained.

- `app/components/LandingPage.tsx`: page content, illustrative previews, inquiry modal.
- `app/globals.css`: responsive design and typography.
- `app/api/inquiries/route.ts`: validated inquiry intake.
- `app/privacy/page.tsx`: inquiry-specific privacy notice.
- `db/schema.ts` and `drizzle/`: D1 inquiry schema and generated migration.
- `.openai/hosting.json`: Site identity and logical `DB` binding.

## Inquiry handling

Both forms save to the hosted D1 `inquiries` table. The endpoint validates all required fields and consent, checks browser request origin, limits request size, includes a honeypot, and suppresses same-email/same-audience duplicate submissions within one minute. There is no public read endpoint.

Saved fields: ID, inquiry audience, name, email, organization, role, portfolio range, message, consent version, and submission time. Use the Sites database tools to review submissions. The form does **not** send notification emails and does not subscribe visitors to a newsletter. No email provider, analytics service, or external CRM is configured.

Development tests use a separate local database. Test submissions are not copied into the hosted database.

## Development

Use Node 22.13+ and the committed pnpm lockfile. Run `pnpm install --frozen-lockfile`, then `pnpm dev`. A local D1 migration is needed before submitting a form; `pnpm build` generates the Wrangler configuration, then run:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_loud_sabretooth.sql
```

For source checks: `pnpm exec tsc --noEmit`. For a production artifact: `pnpm build`.

In ChatGPT's managed Sites environment, use its supplied setup, preview, source, and publishing helpers. New Sites are private by default. Publishing to Sites and updating this GitHub repository are separate operations; a push to this repository does not automatically deploy the hosted Site.

## Verification performed

- Production build and TypeScript checks.
- Desktop visual inspection and interactive preview tabs.
- 390px mobile frame: hero, responsive navigation, and no horizontal overflow.
- Both inquiry forms exercised through the browser; confirmation states and separate local database records verified.
- No live emails were sent during testing.

## Launch decisions

Before external promotion, confirm final brand assets and copy, the beta invitation details, inquiry follow-up ownership, privacy/retention operations, and the desired Site audience. Add an email notification integration if automatic alerts are wanted. Replace illustrative previews with approved screenshots or a recorded demo when available.

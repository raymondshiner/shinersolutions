# shinersolutions

> Planning doc. Edit before shipping Cycle 1. Cycles ship as feature branches → PRs.

## Vision

The client-facing front door for **Shiner Solutions** — bespoke software for local mom-and-pop businesses. The business grows offline (handshakes, cold calls); this site's job is **credibility and close-support, not lead generation**. A prospect who just met Raymond lands here, sees a modern professional site that proves the craft, understands the offer ("your website, handled — and you own everything"), and has one obvious async way to start a conversation. Audience: non-technical local business owners (think: a photography-studio owner with a 2008-era site).

## Non-goals

Things we are explicitly NOT building (prevents scope creep):
- Public pricing — contact-first; quotes happen in conversation
- Lead-gen machinery (SEO content engine, blog, newsletter, analytics funnels)
- Client portal / studio self-edit tools (future, per-client — not on the marketing site)
- Auth, accounts, or any user state
- /work portfolio page — deferred to Cycle 2, gated on a real before/after rebuild
- CMS — content is code; the site changes rarely

## Stack

Two-lane doctrine (`~/src/CLAUDE.md`): public URL for non-users + OG unfurls matter + pure static brochure → **Next.js lane, static export**.
- Build: Next.js (`output: 'export'`) + React 19 + TS strict
- UI: Tailwind v4 + shadcn/ui (Radix Nova), Geist via `next/font` + JetBrains Mono
- Data: none — contact form posts to a client-postable endpoint (Formspree-class) or a tiny Cloudflare Pages Function; no database
- Hosting: **Cloudflare Pages ($0)**, apex `shinersolutions.com` + www (DNS already at Cloudflare)
- Overrides / reasons: **not Vercel** — Hobby tier prohibits commercial use and this is a commercial site; Pro is $20/mo for nothing a static export needs. **No Supabase** — nothing to store; add only if a request-docket/portal materializes. **No PWA** — brochure site. **Light theme first** — clean, warm, trust-first for a non-technical local audience.

## Cycles

Each cycle is one batch of cohesive functionality, shipped together on a feature branch.

### Cycle 1 — MVP
**Theme:** Live, credible, contactable — the site a handshake points to.

**Done when:**
- [ ] `shinersolutions.com` resolves to the site on Cloudflare Pages (HTTPS, apex + www)
- [ ] Home page: promise ("Your website, handled — and you own everything"), who it's for, why-us vs template platforms
- [ ] Offer section: the three lines (managed sites / build & migrate / technical consulting) described without prices, each pointing to contact
- [ ] Contact form (name, business, message) reliably delivers to email, with success/failure states
- [ ] OG/meta/favicon — link previews look right in texts and Facebook
- [ ] verify-ui passes desktop + iPhone 13 viewports; Lighthouse ≥ 90 perf & a11y (audience is on old machines and mid phones)
- [ ] Zero broken/placeholder nav — only pages that exist are linked

**Scope:**
- Single-page layout with anchor nav (home / offer / contact), or home + /contact — whichever the design wants
- Contact form → email delivery (Formspree-class endpoint or CF Pages Function + Resend)
- `tests/verify-ui.mjs` wired (`npm run verify-ui`)

**Out of scope for this cycle (deferred to later):**
- /work portfolio (Cycle 2)
- Pricing display (revisit only if contact-first burns time on tire-kickers)
- Any backend/database

### Cycle 2 — Proof
**Theme:** The before/after portfolio.

**Done when:**
- [ ] One real local-business rebuild exists (leosphotography-style) as a case study
- [ ] /work page: before/after screenshots, what changed, what the client got
- [ ] Home links to /work as primary credibility proof

**Scope:**
- The rebuild itself is its own project (own repo/plan); this cycle consumes its artifacts
- Case-study layout reusable for client #2, #3…

### Cycle 3+ — backlog
- Second/third case studies as clients land
- Testimonials/referral quotes
- Consulting-line deep page if that side grows
- Pricing page (if contact-first proves noisy)
- Request-docket tooling (would introduce Supabase — and possibly a hosting rethink)

## Open questions

Things to decide before Cycle 1 starts:
- [ ] Form delivery: Formspree-class client-side endpoint (zero infra) vs CF Pages Function + Resend (own the pipe, needs a secret) — pick at build time
- [ ] Receiving address: personal gmail vs `hello@shinersolutions.com` via Cloudflare Email Routing (free, and looks right on the site)
- [ ] Copy voice pass: how much of the business profile's language goes verbatim vs rewritten for the page
- [ ] Logo/wordmark: text-only wordmark OK for launch?

## Risks / unknowns

- **Contact-first + no pricing** can attract the tire-kickers pricing was meant to filter — watch the first ~10 inquiries; add "starting at" anchors if noisy.
- **Thin launch (no /work)** means the site leans entirely on design quality as proof — the site itself IS the portfolio piece until Cycle 2. Design bar is therefore high.
- **Static export constraints:** no API routes/ISR — fine today, but the contact form must live client-side or in a Pages Function; revisit hosting only if server needs appear.
- **Audience device reality:** old laptops, mid phones, Facebook in-app browser — keep it light and boring-fast.

---
*Created 2026-07-23. Private ops log: `~/jarvis/claude/project-logs/shinersolutions/log.md`*

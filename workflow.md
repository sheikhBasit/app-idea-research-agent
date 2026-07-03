# Workflow

## 1. Trend Discovery

Find categories with fresh demand signals.

Suggested query patterns:

- `site:sensortower.com "State of" apps AI 2026`
- `site:appfigures.com AI apps revenue downloads`
- `site:apptweak.com app trends ASO`
- `site:mobileaction.co app marketing trends`
- `Product Hunt AI mobile app`
- `Reddit best app for [job to be done]`
- `Google Play [category] subscription app reviews`
- `Flippa AI apps tools for sale`
- `Acquire mobile app businesses for sale`

Output:

- Category
- Growth signal
- Evidence source
- Example apps
- Initial gap hypothesis

## 2. Competitor Mapping

For each niche, collect:

- App name
- Platform
- Downloads/rank estimate
- Revenue estimate if available
- Rating
- Review count
- Pricing
- Main features
- Last update date
- Main complaint themes

Use app intelligence tools if available. Otherwise use public store pages and reviews.

## 3. Review Gap Mining

Look for repeated phrases:

- "too expensive"
- "ads"
- "subscription"
- "not accurate"
- "missing"
- "doesn't work"
- "privacy"
- "hard to use"
- "crashes"
- "offline"
- "sync"
- "export"
- "customer support"
- "language"
- "country"

Turn complaints into gap statements:

```text
Users want [outcome], but current apps fail because [reason].
```

## 4. Marketplace Demand Check

Search:

- Acquire.com
- Flippa
- Microns
- Indiemaker
- SideProjectors
- Empire Flippers

Collect:

- Similar listings
- Asking price
- Claimed MRR/profit
- Traffic/downloads
- Category
- Buyer interest if visible
- Reason for sale

Use this to estimate whether the app could be sold later.

## 5. Idea Formation

Convert each market gap into an app wedge:

```text
[Specific user] needs [specific outcome] but existing tools are [gap]. Build [mobile-first workflow] with [differentiator].
```

Example:

```text
Freelancers need to turn WhatsApp voice notes into invoices, but existing transcription tools stop at text. Build a mobile app that extracts tasks, prices, client names, and invoice drafts from voice notes.
```

## 6. Revenue And Original Value Check

For each idea, answer:

- What high-revenue category does this belong to?
- What do existing apps charge for?
- What is the original value we add?
- What exact gap are we solving?
- What can we add after MVP to increase LTV?
- Could the app become a sellable asset on Acquire, Flippa, Microns, Indiemaker, or similar marketplaces?

Reject ideas where the only monetization answer is "ads someday" unless the category has high-frequency usage and clear ad inventory.

## 7. Scoring

Use `config/scorecard.json`.

Reject:

- No clear monetization.
- No repeated user pain.
- Too dependent on one fragile API.
- Too broad for MVP.
- Requires enterprise sales from day one.
- Heavy legal/medical/financial liability without compliance plan.

## 8. Final Research Brief

Use `templates/research-brief.md`.

The final answer should rank ideas and say which one to build first.

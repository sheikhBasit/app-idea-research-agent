# Missing / Next Steps

The repo is usable now, but these pieces would make it stronger.

## Missing For Production-Grade Research

- Paid API connectors for Sensor Tower, Appfigures, AppTweak, MobileAction, AppMagic, Apptopia, Similarweb, or 42matters.
- Automated Google Play and Apple App Store review collection.
- Marketplace listing collectors for Acquire.com, Flippa, Microns, Indiemaker, and SideProjectors.
- A repeatable evidence database so each idea stores source URL, date checked, revenue signal, and confidence.
- One generated PRD input JSON per top idea.
- Automated DOCX generation for the full top-10 list.

## Already Added

- Agent instructions.
- Research workflow.
- Revenue-first scoring guidance.
- Source list.
- PRD input schema.
- Dependency-free DOCX generator.
- Sample PRD input.
- Generated sample PRD DOCX.
- Revenue-ranked 2026 opportunity starter file.
- Next.js website.
- Neon-backed saved ideas API with localStorage fallback.

## Highest-Value Next Additions

1. Add `data/prd-inputs/` with one JSON file per top idea.
2. Add a batch generator to create all PRDs at once.
3. Add a review-mining script for exported app reviews.
4. Add an evidence table format with source, metric, date, and confidence.
5. Add a final ranking report generator in Markdown and DOCX.
6. Add authentication if saved ideas need named accounts or cross-device identity.

# App Idea Research Agent

Reusable agent kit for finding trending app ideas, market gaps, and acquisition/build opportunities.

This is designed for a founder or solo builder who wants to create new apps using evidence from app intelligence tools, app marketplaces, reviews, search trends, and competitor weak spots.

## What It Does

The agent researches:

- Trending app categories and fast-growing niches.
- High-revenue categories and monetization proof.
- Competitor apps and their positioning.
- Review complaints that reveal market gaps.
- Keyword/ASO opportunities.
- Paid acquisition and creative patterns.
- Startup/app marketplaces to see what apps are selling.
- Build feasibility for a solo or small team.
- Monetization paths and likely MVP scope.

It produces:

- Ranked app ideas.
- Revenue opportunity analysis.
- Original value proposition.
- Gap analysis.
- Competitor maps.
- MVP feature lists.
- "What more can be added" expansion plans.
- Validation experiments.
- Monetization strategy.
- Risk score.
- PRDs in `.docx` format.
- A Next.js website that presents the research, sources, daily idea hook, saved ideas, and generated PRD downloads.

## Main Files

- `agent.md`: the actual agent prompt/instructions.
- `workflow.md`: repeatable research workflow.
- `sources.md`: tools and data sources to use.
- `config/scorecard.json`: scoring model for ranking ideas.
- `templates/idea-card.md`: one-page output format for each idea.
- `templates/research-brief.md`: full research report format.
- `templates/prd-input.schema.json`: expected structured PRD input format.
- `data/trend-signals-2026.md`: current seed trends and opportunity areas.
- `data/revenue-ranked-opportunities-2026.md`: high-revenue opportunity starting points.
- `scripts/generate-prd-docx.js`: dependency-free DOCX generator.
- `app/`: Next.js website.
- `app/api/daily-ideas/route.js`: daily idea update endpoint.
- `app/api/saved-ideas/route.js`: Neon-backed saved ideas API.
- `lib/db.js`: Neon database helper and schema initializer.
- `vercel.json`: Vercel project config and daily cron route.

## Website

Run locally:

```bash
npm install --no-bin-links
npm run sync:docs
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

The website includes:

- Revenue-first hook and positioning.
- Current source stack.
- Research context and revenue signals.
- Ranked app ideas with market gaps and original value.
- Daily research hook.
- Save/unsave ideas.
- PRD DOCX downloads.

Saved ideas and renewed idea boards use Neon when `DATABASE_URL` or `POSTGRES_URL` is configured. If no database URL exists, the website falls back to browser `localStorage` for board state.

## Neon Storage

Create a Neon database and add this environment variable in Vercel:

```text
DATABASE_URL=postgresql://...
```

The app creates this table automatically on first save/load:

```sql
CREATE TABLE IF NOT EXISTS saved_ideas (
  id BIGSERIAL PRIMARY KEY,
  user_key TEXT NOT NULL,
  idea_id TEXT NOT NULL,
  idea_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_key, idea_id)
);
```

It also creates an `idea_boards` table for the daily 20-idea board and archived old boards:

```sql
CREATE TABLE IF NOT EXISTS idea_boards (
  id BIGSERIAL PRIMARY KEY,
  board_date DATE NOT NULL,
  ideas JSONB NOT NULL,
  summary TEXT NOT NULL,
  source TEXT NOT NULL,
  evidence_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

API routes:

- `GET /api/saved-ideas?userKey=...`
- `POST /api/saved-ideas`
- `DELETE /api/saved-ideas?userKey=...&ideaId=...`
- `GET /api/daily-ideas?daily=1`: renews the active board once per day and returns active/archive boards.
- `GET /api/daily-ideas?refresh=1&batch=20&persist=1`: manually renews all 20 ideas and stores the old board.

The current version uses an anonymous browser-generated `userKey`. Add auth later if you want accounts and cross-device identity.

Vercel runs `/api/cron/renew-ideas` daily at 00:00 UTC to refresh the board and archive the previous one.

## Vercel Deploy

Build check:

```bash
npm run build
```

Deploy:

```bash
npx vercel login
npx vercel deploy --prod
```

Or with a token:

```bash
VERCEL_TOKEN=your_token npx vercel deploy --prod --yes --token "$VERCEL_TOKEN"
```

The deployment is configured by `vercel.json`.

After adding or changing `DATABASE_URL`, redeploy:

```bash
npx vercel deploy --prod
```

## Generate A PRD DOCX

```bash
npm run sample:prd
```

Generated file:

```text
docs/generated/whatsapp-voice-note-to-invoice-prd.docx
```

Generate a PRD from your own idea input:

```bash
node scripts/generate-prd-docx.js path/to/idea.json docs/generated/my-idea-prd.docx
```

Validate the generator:

```bash
npm run check
```

## How To Use

Paste `agent.md` into your AI agent as the system/developer instruction, then give it a target like:

```text
Find 10 profitable Android-first app ideas for 2026 in AI, wellness, education, and productivity. Focus on ideas a solo developer can build in 30-45 days.
```

Or:

```text
Research the AI video summarizer niche. Find market gaps, competitor weaknesses, review complaints, monetization models, and a buildable MVP.
```

## Recommended Research Stack

Use any tools you have access to:

- App intelligence: Sensor Tower, Appfigures, AppTweak, MobileAction, AppMagic, Apptopia, Similarweb, 42matters.
- Marketplaces: Acquire.com, Flippa, Microns, Indiemaker, SideProjectors, Empire Flippers.
- Public sources: App Store, Google Play, Reddit, Product Hunt, TikTok/YouTube trends, Google Trends, Exploding Topics.

Paid tools are optional. The workflow still works with public store pages, reviews, marketplaces, and search.

## Important Rule

The agent should not recommend an idea only because it sounds interesting. Every recommended idea must have evidence from at least three signal types, for example:

- Store rankings or download/revenue trend.
- Repeated user complaints in reviews.
- Marketplace demand or acquisition listings.
- Search/social trend.
- Competitor monetization proof.
- Weak existing product quality.

## Current Limitations

See `docs/MISSING.md`.

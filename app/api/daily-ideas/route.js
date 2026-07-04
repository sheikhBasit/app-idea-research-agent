const ideas = [
  { name: "AI Review Revenue Assistant", type: "SaaS" },
  { name: "Vertical Micro-Drama Studio", type: "SaaS" },
  { name: "WhatsApp Voice Note To Invoice", type: "SaaS" },
  { name: "App Acquisition Analyzer", type: "SaaS" },
  { name: "AI Short-Video Repurposer For Local Businesses", type: "SaaS" },
  { name: "Exam-Specific AI Study Planner", type: "SaaS" },
  { name: "Receipt & Warranty Vault", type: "SaaS" },
  { name: "Subscription Cancellation Coach", type: "SaaS" },
  { name: "AI Voice CRM For Solo Services", type: "SaaS" },
  { name: "Mobile App Review Gap Miner", type: "SaaS" },
  { name: "AI Menu Margin Optimizer", type: "SaaS" },
  { name: "Clinic No-Show Reducer", type: "SaaS" },
  { name: "AI UGC Ad Brief Generator", type: "SaaS" },
  { name: "Local-Language AI Tutor", type: "SaaS" },
  { name: "AI App Listing Improver", type: "SaaS" },
  { name: "Shopify Local Delivery Route Planner", type: "SaaS" },
  { name: "Notion Portfolio PDF Publisher", type: "SaaS" },
  { name: "Idle Portfolio Manager", type: "Game" },
  { name: "Word Dungeon RPG", type: "Game" }
];

const researchTasks = [
  "Find the paid upgrade trigger in a top-grossing competitor.",
  "Mine repeated one-star review complaints.",
  "Compare acquisition listings for MRR and asking-price patterns.",
  "Identify one workflow add-on that can raise LTV.",
  "Check whether the category supports subscriptions, credits, or team plans."
];

export function GET(request) {
  const requestUrl = new URL(request.url);
  const isManualRefresh = requestUrl.searchParams.get("refresh") === "1";
  const currentIdea = requestUrl.searchParams.get("current");
  const now = new Date();
  const hourBlock = now.getUTCHours() < 12 ? 0 : 12;
  const baseSeed = Number(`${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}${hourBlock}`);
  const seed = isManualRefresh ? Date.now() : baseSeed;
  const candidates = isManualRefresh && currentIdea
    ? ideas.filter((idea) => idea.name !== currentIdea)
    : ideas;
  const selected = candidates[seed % candidates.length] || ideas[baseSeed % ideas.length];
  const nextRefresh = new Date(now);
  nextRefresh.setUTCHours(hourBlock === 0 ? 12 : 24, 0, 0, 0);

  return Response.json({
    date: now.toISOString().slice(0, 10) + (hourBlock === 0 ? " AM" : " PM") + (isManualRefresh ? " refreshed" : ""),
    idea: selected.name,
    type: selected.type,
    researchTask: researchTasks[seed % researchTasks.length],
    refreshIntervalHours: 12,
    generatedAt: now.toISOString(),
    nextRefreshAt: nextRefresh.toISOString(),
    storage: "Saved ideas use Neon when DATABASE_URL or POSTGRES_URL is configured, with localStorage fallback in the browser."
  });
}

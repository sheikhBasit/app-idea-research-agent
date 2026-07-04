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

const freshIdeas = [
  { name: "AI Tender Response Assistant", type: "SaaS", category: "B2B sales ops", devDays: 16 },
  { name: "Contract Risk Explainer For Freelancers", type: "SaaS", category: "Legal productivity", devDays: 12 },
  { name: "WhatsApp Stock Reorder Assistant", type: "SaaS", category: "Retail operations", devDays: 14 },
  { name: "AI Before-After Case Study Builder", type: "SaaS", category: "Agency marketing", devDays: 10 },
  { name: "Micro-Influencer Deal Tracker", type: "SaaS", category: "Creator commerce", devDays: 15 },
  { name: "Clinic Lab Result Follow-Up Queue", type: "SaaS", category: "Healthcare admin", devDays: 18 },
  { name: "Restaurant Complaint Recovery Inbox", type: "SaaS", category: "Local business SaaS", devDays: 12 },
  { name: "AI Course Refund Risk Monitor", type: "SaaS", category: "EdTech operations", devDays: 13 },
  { name: "Marketplace Seller Photo QA", type: "SaaS", category: "Ecommerce tooling", devDays: 11 },
  { name: "AI Grant Eligibility Screener", type: "SaaS", category: "Nonprofit operations", devDays: 14 },
  { name: "Freelance Scope Creep Detector", type: "SaaS", category: "Freelancer finance", devDays: 10 },
  { name: "Property Maintenance Quote Comparator", type: "SaaS", category: "Real estate operations", devDays: 17 },
  { name: "AI Meeting-To-SOP Converter", type: "SaaS", category: "Team documentation", devDays: 12 },
  { name: "Local Event Sponsor Matcher", type: "SaaS", category: "Community monetization", devDays: 14 },
  { name: "App Store Screenshot A/B Planner", type: "SaaS", category: "Mobile growth tooling", devDays: 9 },
  { name: "Resume Proof Pack Builder", type: "SaaS", category: "Career tooling", devDays: 11 },
  { name: "AI YouTube Comment Product Miner", type: "SaaS", category: "Creator research", devDays: 13 },
  { name: "Tenant Handover Checklist Assistant", type: "SaaS", category: "Property management", devDays: 10 },
  { name: "Shift Swap Fairness Scheduler", type: "SaaS", category: "Workforce operations", devDays: 18 },
  { name: "Vocabulary Boss Rush", type: "Game", category: "Educational mobile game", devDays: 16 }
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
  const refreshNonce = Number(requestUrl.searchParams.get("t"));
  const seed = isManualRefresh ? (Number.isFinite(refreshNonce) ? refreshNonce : Date.now()) : baseSeed;
  const candidates = isManualRefresh && currentIdea
    ? freshIdeas.filter((idea) => idea.name !== currentIdea)
    : ideas;
  const selected = candidates[seed % candidates.length] || ideas[baseSeed % ideas.length];
  const nextRefresh = new Date(now);
  nextRefresh.setUTCHours(hourBlock === 0 ? 12 : 24, 0, 0, 0);

  return Response.json({
    date: now.toISOString().slice(0, 10) + (hourBlock === 0 ? " AM" : " PM") + (isManualRefresh ? " refreshed" : ""),
    idea: selected.name,
    type: selected.type,
    category: selected.category || selected.type,
    devDays: selected.devDays || 15,
    researchTask: researchTasks[seed % researchTasks.length],
    refreshIntervalHours: 12,
    generatedAt: now.toISOString(),
    nextRefreshAt: nextRefresh.toISOString(),
    storage: "Saved ideas use Neon when DATABASE_URL or POSTGRES_URL is configured, with localStorage fallback in the browser."
  });
}

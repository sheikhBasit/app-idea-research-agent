const ideas = [
  "AI Review Revenue Assistant",
  "Vertical Micro-Drama Studio",
  "WhatsApp Voice Note To Invoice",
  "App Acquisition Analyzer",
  "AI Short-Video Repurposer For Local Businesses",
  "Exam-Specific AI Study Planner",
  "Receipt & Warranty Vault",
  "Subscription Cancellation Coach",
  "AI Voice CRM For Solo Services",
  "Mobile App Review Gap Miner",
  "AI Menu Margin Optimizer",
  "Clinic No-Show Reducer",
  "AI UGC Ad Brief Generator",
  "Local-Language AI Tutor",
  "AI App Listing Improver"
];

const researchTasks = [
  "Find the paid upgrade trigger in a top-grossing competitor.",
  "Mine repeated one-star review complaints.",
  "Compare acquisition listings for MRR and asking-price patterns.",
  "Identify one workflow add-on that can raise LTV.",
  "Check whether the category supports subscriptions, credits, or team plans."
];

export function GET() {
  const now = new Date();
  const hourBlock = now.getUTCHours() < 12 ? 0 : 12;
  const seed = Number(`${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}${hourBlock}`);
  return Response.json({
    date: now.toISOString().slice(0, 10) + (hourBlock === 0 ? " AM" : " PM"),
    idea: ideas[seed % ideas.length],
    researchTask: researchTasks[seed % researchTasks.length],
    storage: "Saved ideas use Neon when DATABASE_URL or POSTGRES_URL is configured, with localStorage fallback in the browser."
  });
}

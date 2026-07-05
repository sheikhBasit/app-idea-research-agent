import { ensureSchema, getSql, hasDatabase } from "../../../lib/db.js";

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

const liveSources = [
  {
    name: "Hacker News",
    url: "https://hn.algolia.com/api/v1/search_by_date?query=AI%20app%20SaaS%20startup&tags=story&hitsPerPage=12"
  },
  {
    name: "GitHub",
    url: "https://api.github.com/search/repositories?q=AI%20app%20created:%3E2026-01-01&sort=stars&order=desc&per_page=10"
  },
  {
    name: "Reddit SaaS",
    url: "https://www.reddit.com/r/SaaS/search.json?q=AI%20tool%20startup&restrict_sr=1&sort=new&t=week&limit=10"
  },
  {
    name: "Product Hunt",
    url: "https://www.producthunt.com/feed"
  }
];

const liveIdeaRules = [
  {
    keywords: ["invoice", "billing", "receipt", "payment", "expense"],
    idea: "AI Cashflow Follow-Up Assistant",
    category: "Small business finance",
    task: "Check invoice, receipt, and payment workflow complaints, then validate whether users pay for reminders, reconciliation, or client follow-up."
  },
  {
    keywords: ["review", "reputation", "feedback", "testimonial"],
    idea: "Review-To-Revenue Campaign Builder",
    category: "Local business marketing",
    task: "Mine review-management competitors for weak reporting, slow replies, and missed testimonial reuse."
  },
  {
    keywords: ["video", "clip", "youtube", "tiktok", "shorts", "creator"],
    idea: "Creator Clip Testing Planner",
    category: "Creator growth tooling",
    task: "Compare short-video tools and identify gaps around hook testing, repurposing, and local-business content calendars."
  },
  {
    keywords: ["resume", "job", "career", "hiring", "recruit", "interview"],
    idea: "Job Application Proof Pack Builder",
    category: "Career productivity",
    task: "Check job-search communities for repeated pain around tailored applications, proof links, and interview preparation."
  },
  {
    keywords: ["shopify", "ecommerce", "store", "seller", "marketplace"],
    idea: "Ecommerce Listing Fix Queue",
    category: "Ecommerce operations",
    task: "Review seller tooling and marketplace complaints for gaps in listing QA, photo checks, and conversion fixes."
  },
  {
    keywords: ["meeting", "notion", "docs", "slack", "knowledge", "sop"],
    idea: "Meeting-To-Operating-System Converter",
    category: "Team documentation",
    task: "Validate whether teams need meeting notes converted into SOPs, checklists, owners, and reusable templates."
  },
  {
    keywords: ["study", "course", "school", "learn", "education", "exam"],
    idea: "Exam Weakness Drill Generator",
    category: "AI education",
    task: "Check student forums and AI education apps for gaps around local curriculum, weak-topic drills, and parent reports."
  },
  {
    keywords: ["clinic", "health", "doctor", "patient", "appointment"],
    idea: "Clinic Admin Recovery Queue",
    category: "Healthcare admin",
    task: "Validate admin-only healthcare workflows: no-show recovery, result follow-up, reminder templates, and waitlist filling."
  },
  {
    keywords: ["agent", "automation", "workflow", "assistant", "ai"],
    idea: "Vertical AI Workflow Agent",
    category: "AI workflow SaaS",
    task: "Pick one narrow buyer segment and validate whether generic AI agents miss permissions, memory, exports, and repeat workflows."
  }
];

const relevantSignalWords = [
  "ai",
  "app",
  "saas",
  "startup",
  "tool",
  "agent",
  "automation",
  "workflow",
  "product",
  "creator",
  "video",
  "invoice",
  "review",
  "shopify",
  "notion",
  "github",
  "assistant",
  "business",
  "customer",
  "marketing"
];

const researchTasks = [
  "Find the paid upgrade trigger in a top-grossing competitor.",
  "Mine repeated one-star review complaints.",
  "Compare acquisition listings for MRR and asking-price patterns.",
  "Identify one workflow add-on that can raise LTV.",
  "Check whether the category supports subscriptions, credits, or team plans."
];

function fallbackPick(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function textFromHtmlOrXml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqSignals(signals) {
  const seen = new Set();
  return signals.filter((signal) => {
    const key = `${signal.source}:${signal.title}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return Boolean(signal.title);
  });
}

async function fetchJsonOrText(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(source.url, {
      cache: "no-store",
      headers: {
        "accept": "application/json,text/xml,text/html;q=0.9,*/*;q=0.8",
        "user-agent": "App-Idea-Research-Agent/0.1"
      },
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`${source.name} HTTP ${response.status}`);
    const contentType = response.headers.get("content-type") || "";
    return contentType.includes("json") ? response.json() : response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function parseSourceSignals(source, payload) {
  if (source.name === "Hacker News") {
    return (payload.hits || []).map((item) => ({
      source: source.name,
      title: item.title || item.story_title,
      url: item.url || `https://news.ycombinator.com/item?id=${item.objectID}`
    }));
  }

  if (source.name === "GitHub") {
    return (payload.items || []).map((item) => ({
      source: source.name,
      title: item.description || item.full_name,
      url: item.html_url
    }));
  }

  if (source.name === "Reddit SaaS") {
    return (payload.data?.children || []).map((item) => ({
      source: source.name,
      title: item.data?.title,
      url: item.data?.permalink ? `https://www.reddit.com${item.data.permalink}` : "https://www.reddit.com/r/SaaS/"
    }));
  }

  const matches = Array.from(String(payload).matchAll(/<item>[\s\S]*?<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>[\s\S]*?<link>([\s\S]*?)<\/link>[\s\S]*?<\/item>/gi));
  return matches.map((match) => ({
    source: source.name,
    title: textFromHtmlOrXml(match[1]),
    url: textFromHtmlOrXml(match[2])
  }));
}

async function fetchLiveSignals() {
  const settled = await Promise.allSettled(liveSources.map(async (source) => {
    const payload = await fetchJsonOrText(source);
    return parseSourceSignals(source, payload);
  }));

  return uniqSignals(settled.flatMap((result) => result.status === "fulfilled" ? result.value : []))
    .filter((signal) => {
      const text = `${signal.title} ${signal.url}`.toLowerCase();
      return signal.title && signal.title.length > 12 && relevantSignalWords.some((word) => text.includes(word));
    })
    .slice(0, 18);
}

function ideaFromLiveSignals(signals, seed, currentIdea) {
  const signal = fallbackPick(signals, seed);
  const haystack = signals.map((item) => item.title).join(" ").toLowerCase();
  const rule = liveIdeaRules.find((item) => item.keywords.some((keyword) => haystack.includes(keyword)))
    || fallbackPick(liveIdeaRules, seed);
  const ideaName = rule.idea === currentIdea ? `${rule.idea} For Niche Operators` : rule.idea;

  return {
    name: ideaName,
    type: rule.category.toLowerCase().includes("game") ? "Game" : "SaaS",
    category: rule.category,
    devDays: 10 + (Math.abs(seed) % 11),
    task: rule.task,
    evidence: signals.slice(0, 5).map((item) => ({
      source: item.source,
      title: item.title,
      url: item.url
    })),
    sourceSignal: signal
  };
}

function makeIdeaBatch(signals, seed) {
  const sourceSignals = signals.length > 0 ? signals : [];
  return Array.from({ length: 20 }, (_, index) => {
    const rule = liveIdeaRules[(seed + index) % liveIdeaRules.length];
    const backup = freshIdeas[(seed + index) % freshIdeas.length];
    const signal = sourceSignals[index % Math.max(sourceSignals.length, 1)];
    const name = sourceSignals.length > 0
      ? `${rule.idea}${index >= liveIdeaRules.length ? ` ${index + 1}` : ""}`
      : backup.name;
    return {
      rank: index + 1,
      name,
      type: rule.category.toLowerCase().includes("game") ? "Game" : (backup.type || "SaaS"),
      category: sourceSignals.length > 0 ? rule.category : backup.category,
      devDays: 10 + ((seed + index) % 21),
      score: 91 - Math.min(index, 19),
      researchTask: sourceSignals.length > 0 ? rule.task : researchTasks[(seed + index) % researchTasks.length],
      evidence: sourceSignals.slice(index, index + 3).concat(sourceSignals.slice(0, Math.max(0, 3 - (sourceSignals.length - index)))).slice(0, 3),
      sourceSignal: signal || null
    };
  });
}

function summarizeBoard(batch, source) {
  const categories = [...new Set(batch.map((idea) => idea.category).filter(Boolean))].slice(0, 5);
  const topIdeas = batch.slice(0, 3).map((idea) => idea.name).join(", ");
  return `${batch.length} ideas from ${source}. Top ideas: ${topIdeas}. Main categories: ${categories.join(", ")}.`;
}

function normalizeDbBoard(row) {
  if (!row) return null;
  return {
    id: String(row.id),
    boardDate: String(row.board_date).slice(0, 10),
    ideas: row.ideas,
    summary: row.summary,
    source: row.source,
    evidenceCount: row.evidence_count,
    isActive: row.is_active,
    createdAt: row.created_at
  };
}

async function getStoredBoards() {
  if (!hasDatabase()) {
    return { storage: "local", currentBoard: null, archivedBoards: [] };
  }

  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, board_date, ideas, summary, source, evidence_count, is_active, created_at
    FROM idea_boards
    ORDER BY is_active DESC, created_at DESC
    LIMIT 12
  `;
  return {
    storage: "neon",
    currentBoard: normalizeDbBoard(rows.find((row) => row.is_active)),
    archivedBoards: rows.filter((row) => !row.is_active).map(normalizeDbBoard)
  };
}

async function persistBoard({ batch, source, evidenceCount, now }) {
  if (!hasDatabase()) {
    return { storage: "local", currentBoard: null, archivedBoards: [] };
  }

  await ensureSchema();
  const sql = getSql();
  const today = now.toISOString().slice(0, 10);
  const summary = summarizeBoard(batch, source);
  await sql`UPDATE idea_boards SET is_active = FALSE WHERE is_active = TRUE`;
  await sql`
    INSERT INTO idea_boards (board_date, ideas, summary, source, evidence_count, is_active)
    VALUES (${today}, ${JSON.stringify(batch)}::jsonb, ${summary}, ${source}, ${evidenceCount}, TRUE)
  `;
  return getStoredBoards();
}

async function maybeRenewDailyBoard({ force, now, seed }) {
  const stored = await getStoredBoards();
  if (!hasDatabase()) return stored;

  const today = now.toISOString().slice(0, 10);
  if (!force && stored.currentBoard?.boardDate === today) {
    return stored;
  }

  const liveSignals = await fetchLiveSignals();
  const source = liveSignals.length > 0 ? "live websites" : "local fallback";
  const batch = makeIdeaBatch(liveSignals, seed);
  return persistBoard({ batch, source, evidenceCount: liveSignals.length, now });
}

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const isManualRefresh = requestUrl.searchParams.get("refresh") === "1";
  const batchSize = Number(requestUrl.searchParams.get("batch") || 0);
  const shouldPersist = requestUrl.searchParams.get("persist") === "1";
  const wantsBoards = requestUrl.searchParams.get("boards") === "1";
  const wantsDailyRenew = requestUrl.searchParams.get("daily") === "1";
  const currentIdea = requestUrl.searchParams.get("current");
  const now = new Date();
  const hourBlock = now.getUTCHours() < 12 ? 0 : 12;
  const baseSeed = Number(`${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}${hourBlock}`);
  const refreshNonce = Number(requestUrl.searchParams.get("t"));
  const seed = isManualRefresh ? (Number.isFinite(refreshNonce) ? refreshNonce : Date.now()) : baseSeed;

  if (wantsBoards) {
    return Response.json(await getStoredBoards());
  }

  if (wantsDailyRenew) {
    return Response.json(await maybeRenewDailyBoard({ force: isManualRefresh, now, seed }));
  }

  const liveSignals = isManualRefresh ? await fetchLiveSignals() : [];

  if (isManualRefresh && batchSize >= 20) {
    const batch = makeIdeaBatch(liveSignals, seed);
    const source = liveSignals.length > 0 ? "live websites" : "local fallback";
    if (shouldPersist) {
      const stored = await persistBoard({ batch, source, evidenceCount: liveSignals.length, now });
      return Response.json({
        ...stored,
        date: now.toISOString(),
        refreshSource: source,
        evidenceCount: liveSignals.length,
        ideas: batch,
        generatedAt: now.toISOString()
      });
    }
    return Response.json({
      date: now.toISOString(),
      refreshSource: source,
      evidenceCount: liveSignals.length,
      ideas: batch,
      summary: summarizeBoard(batch, source),
      generatedAt: now.toISOString()
    });
  }

  const liveIdea = liveSignals.length > 0 ? ideaFromLiveSignals(liveSignals, seed, currentIdea) : null;
  const candidates = currentIdea
    ? freshIdeas.filter((idea) => idea.name !== currentIdea)
    : freshIdeas;
  const selected = isManualRefresh
    ? (liveIdea || fallbackPick(candidates, seed))
    : fallbackPick(ideas, baseSeed);
  const nextRefresh = new Date(now);
  nextRefresh.setUTCHours(hourBlock === 0 ? 12 : 24, 0, 0, 0);

  return Response.json({
    date: now.toISOString().slice(0, 10) + (hourBlock === 0 ? " AM" : " PM") + (isManualRefresh ? " refreshed" : ""),
    idea: selected.name,
    type: selected.type,
    category: selected.category || selected.type,
    devDays: selected.devDays || 15,
    researchTask: selected.task || researchTasks[seed % researchTasks.length],
    evidence: selected.evidence || [],
    sourceSignal: selected.sourceSignal || null,
    refreshSource: liveIdea ? "live websites" : "local fallback",
    refreshIntervalHours: 12,
    generatedAt: now.toISOString(),
    nextRefreshAt: nextRefresh.toISOString(),
    storage: "Saved ideas use Neon when DATABASE_URL or POSTGRES_URL is configured, with localStorage fallback in the browser."
  });
}

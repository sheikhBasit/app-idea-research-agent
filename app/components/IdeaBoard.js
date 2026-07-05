"use client";

import { useEffect, useMemo, useState } from "react";

const ideas = [
  {
    rank: 1,
    id: "ai-review-revenue-assistant",
    name: "AI Review Revenue Assistant",
    category: "AI workflow + local business SaaS",
    score: 91,
    revenue: "$49-$299/mo per business or agency client",
    revenueValues: [
      ["Market pull", "Non-game IAP grew 21% YoY and passed games"],
      ["AI category", "GenAI app IAP exceeded $5B in 2025"],
      ["Pricing", "$19-$99/mo owner plan; $199+/mo agency tier"]
    ],
    graph: [21, 42, 63, 78, 91],
    gap: "Small businesses need review replies, complaint patterns, and marketing reuse, but enterprise reputation tools are too expensive and generic AI chat has no workflow memory.",
    original: "Turns reviews into revenue actions: reply, recover customers, improve operations, and convert praise into social proof.",
    add: ["Google Business integration", "Agency dashboard", "Multilingual replies", "Review-to-video testimonials", "Complaint trend alerts"],
    sources: ["Sensor Tower State of Mobile 2026", "Local reputation SaaS pricing patterns", "Google Business review workflow"],
    mvp: ["Paste/import reviews", "AI reply draft", "Complaint classifier", "Weekly owner report", "Social post from positive review"]
  },
  {
    rank: 2,
    id: "vertical-micro-drama-studio",
    name: "Vertical Micro-Drama Studio",
    category: "Entertainment + AI content",
    score: 89,
    revenue: "Coins, subscriptions, ads, sponsored storylines",
    revenueValues: [
      ["Market value", "$7.8B projected micro-drama revenue in 2026"],
      ["Monetization", "Coins + paid episode unlocks"],
      ["Expansion", "Localization and creator marketplace"]
    ],
    graph: [18, 35, 52, 73, 89],
    gap: "Micro-drama demand is high, but production, localization, and testing are expensive for small teams.",
    original: "Niche vertical story engine with AI-assisted scripts, dubbing, plot testing, and regional content packs.",
    add: ["AI dubbing", "User-voted endings", "Creator marketplace", "Regional story templates", "Ad-supported unlocks"],
    sources: ["Business Insider / Deloitte micro-drama projection", "Mobile entertainment monetization patterns"],
    mvp: ["One story niche", "Episode feed", "Coin unlock", "AI-assisted script workflow", "Retention analytics"]
  },
  {
    rank: 3,
    id: "whatsapp-voice-note-to-invoice",
    name: "WhatsApp Voice Note To Invoice",
    category: "AI productivity + small business",
    score: 87,
    revenue: "$9-$29/mo plus invoice/template credits",
    revenueValues: [
      ["AI apps", "3.8B GenAI app downloads in 2025"],
      ["Workflow", "Conversation-to-cash utility"],
      ["Pricing", "Free limit + subscription"]
    ],
    graph: [20, 38, 57, 74, 87],
    gap: "WhatsApp voice notes hold billable client work, but transcription apps stop at text and invoice apps require manual entry.",
    original: "Extracts service, client, amount, deadline, invoice, and follow-up from informal audio.",
    add: ["Payment links", "Client CRM", "Expense capture", "Recurring jobs", "Team account"],
    sources: ["Sensor Tower GenAI app growth", "Small business messaging workflow", "Invoice SaaS pricing patterns"],
    mvp: ["Share audio", "Transcribe", "Extract invoice fields", "Edit draft", "Export PDF"]
  },
  {
    rank: 4,
    id: "app-acquisition-analyzer",
    name: "App Acquisition Analyzer",
    category: "Startup acquisition tooling",
    score: 86,
    revenue: "$29-$149/report or buyer subscription",
    revenueValues: [
      ["Buyer intent", "Marketplace users evaluate real purchases"],
      ["Revenue model", "Paid reports and diligence packs"],
      ["Asset value", "Can expand into seller-side reports"]
    ],
    graph: [16, 31, 49, 70, 86],
    gap: "Buyers see listings on marketplaces but lack app-specific diligence around store risk, reviews, retention, code handover, and valuation.",
    original: "Turns marketplace and app-store data into risk scores, buyer questions, valuation notes, and a post-acquisition PRD.",
    add: ["Flippa parser", "Acquire parser", "Review mining", "Valuation bands", "Deal memo export"],
    sources: ["Acquire.com", "Flippa", "Microns", "Indiemaker", "SideProjectors"],
    mvp: ["Manual listing input", "Risk score", "Revenue multiple calculator", "Buyer questions", "PDF/DOCX report"]
  },
  {
    rank: 5,
    id: "local-business-video-repurposer",
    name: "AI Short-Video Repurposer",
    category: "Creator tools + local marketing",
    score: 84,
    revenue: "$19-$99/mo clip credits",
    revenueValues: [
      ["Demand", "Short-form video remains a core acquisition channel"],
      ["Buyer", "Local businesses pay for marketing content"],
      ["Expansion", "Agency dashboard raises LTV"]
    ],
    graph: [22, 41, 56, 69, 84],
    gap: "CapCut-like tools target creators, not salons, gyms, clinics, tutors, restaurants, and realtors with local offers.",
    original: "Turns raw business video into local hooks, captions, offers, post copy, and calendar slots.",
    add: ["Review-to-video", "WhatsApp status export", "Ad variants", "Monthly campaign packs", "Agency dashboard"],
    sources: ["Short-form video marketing trends", "Local business marketing SaaS pricing"],
    mvp: ["Upload video", "Choose business type", "Generate 3 clips", "Captions", "Posting copy"]
  },
  {
    rank: 6,
    id: "exam-ai-study-planner",
    name: "Exam-Specific AI Study Planner",
    category: "AI education",
    score: 82,
    revenue: "$5-$20/mo seasonal subscription",
    revenueValues: [
      ["AI education", "Students use AI but need structure"],
      ["Seasonality", "Exam windows create purchase urgency"],
      ["Expansion", "Tutor and school bundles"]
    ],
    graph: [17, 34, 51, 68, 82],
    gap: "Generic tutors do not map to local syllabus, past papers, deadlines, language, and weak-topic planning.",
    original: "A local exam execution system, not a chatbot: syllabus, schedule, past-paper plan, and parent/tutor reporting.",
    add: ["Past-paper bank", "Parent report", "Tutor dashboard", "Offline mode", "Local language explanations"],
    sources: ["AI education adoption", "App store study planner monetization"],
    mvp: ["Syllabus tracker", "Daily plan", "Weak-topic revision", "Flashcards", "Progress report"]
  },
  {
    rank: 7,
    id: "receipt-warranty-vault",
    name: "Receipt & Warranty Vault",
    category: "Household finance utility",
    score: 80,
    revenue: "$3-$10/mo family plan",
    revenueValues: [
      ["Category", "Finance utilities are high-retention when tied to reminders"],
      ["Gap", "Warranty retrieval is underserved"],
      ["Expansion", "Insurance inventory and export"]
    ],
    graph: [14, 29, 46, 63, 80],
    gap: "People lose receipts and warranty proof, while scanner apps and finance apps do not focus on claims and reminders.",
    original: "Searchable proof-of-purchase vault with warranty expiry, claim steps, and family sharing.",
    add: ["Family vault", "Insurance inventory", "Merchant warranty lookup", "Expense export", "Recall alerts"],
    sources: ["Finance utility app patterns", "Receipt scanner app reviews"],
    mvp: ["Scan receipt", "Extract item/date/store", "Warranty reminder", "Search", "Export proof"]
  },
  {
    rank: 8,
    id: "subscription-cancellation-coach",
    name: "Subscription Cancellation Coach",
    category: "Consumer finance",
    score: 78,
    revenue: "$2-$8/mo or yearly savings plan",
    revenueValues: [
      ["Pain", "Subscription fatigue is recurring"],
      ["Monetization", "Savings-based upgrade trigger"],
      ["Expansion", "Family plan and negotiation scripts"]
    ],
    graph: [12, 27, 43, 61, 78],
    gap: "Users forget renewals and trials; banking apps detect spend but often do not guide cancellation by region/app.",
    original: "Renewal warnings plus cancellation instructions, scripts, and savings dashboard.",
    add: ["Email parsing", "Family sharing", "Negotiation templates", "Calendar sync", "Alternative recommendations"],
    sources: ["Consumer subscription management trend", "Finance app monetization"],
    mvp: ["Manual subscriptions", "Renewal alerts", "Cancellation scripts", "Yearly spend", "Trial tracker"]
  },
  {
    rank: 9,
    id: "ai-voice-crm-solo-services",
    name: "AI Voice CRM For Solo Services",
    category: "Micro-CRM",
    score: 77,
    revenue: "$12-$49/mo per operator",
    revenueValues: [
      ["Buyer", "Service providers pay for leads and follow-up"],
      ["Retention", "Daily inbox workflow"],
      ["Expansion", "Team dispatch"]
    ],
    graph: [15, 30, 45, 60, 77],
    gap: "CRMs are heavy; solo service providers need voice-first follow-up, quote, and reminder workflows.",
    original: "Voice notes become lead cards, next actions, quotes, and reminders.",
    add: ["Call summary", "Job calendar", "Quote templates", "WhatsApp reminders", "Team dispatch"],
    sources: ["CRM SaaS pricing", "Messaging-first small business workflows"],
    mvp: ["Add client by voice", "Extract job", "Set reminder", "Quote draft", "Follow-up list"]
  },
  {
    rank: 10,
    id: "mobile-review-gap-miner",
    name: "Mobile App Review Gap Miner",
    category: "Developer tooling",
    score: 76,
    revenue: "$19-$99/mo or report credits",
    revenueValues: [
      ["Buyer", "App builders need product signals"],
      ["Data", "Review clustering has clear workflow value"],
      ["Expansion", "App intelligence integrations"]
    ],
    graph: [11, 25, 42, 59, 76],
    gap: "Review tools show raw reviews, but indie builders need repeated complaint themes and product opportunities.",
    original: "Turns competitor reviews into ranked feature gaps and PRD-ready opportunities.",
    add: ["Appfigures import", "Store URL parser", "Sentiment trends", "Competitor matrix", "PRD export"],
    sources: ["Appfigures review workflows", "ASO and app intelligence tools"],
    mvp: ["Paste reviews", "Cluster complaints", "Rank gaps", "Export idea brief", "Track competitors"]
  },
  {
    rank: 11,
    id: "ai-menu-margin-optimizer",
    name: "AI Menu Margin Optimizer",
    category: "Restaurant operations",
    score: 75,
    revenue: "$29-$149/mo per location",
    revenueValues: [
      ["Buyer", "Restaurants pay for operations tools"],
      ["Revenue", "Margin improvements are direct ROI"],
      ["Expansion", "POS imports and campaign suggestions"]
    ],
    graph: [13, 28, 41, 58, 75],
    gap: "Small restaurants know food costs are rising but lack simple menu profitability and promotion planning.",
    original: "Turns menu items, costs, and reviews into pricing, bundle, and promotion suggestions.",
    add: ["POS import", "Delivery app menu audit", "Review-to-menu insights", "Promo calendar", "Supplier cost tracking"],
    sources: ["Restaurant SaaS pricing", "Food delivery app category growth"],
    mvp: ["Menu input", "Cost calculator", "Margin ranking", "Bundle ideas", "Price-change notes"]
  },
  {
    rank: 12,
    id: "clinic-no-show-reducer",
    name: "Clinic No-Show Reducer",
    category: "Healthcare admin utility",
    score: 74,
    revenue: "$49-$199/mo per clinic",
    revenueValues: [
      ["Buyer", "Clinics pay for admin efficiency"],
      ["ROI", "Reduced no-shows create measurable value"],
      ["Risk", "Avoid diagnosis; admin-only scope"]
    ],
    graph: [10, 24, 40, 57, 74],
    gap: "Small clinics need simple reminder, confirmation, and reschedule workflows without full enterprise practice software.",
    original: "Admin-only appointment confirmation assistant with patient-friendly message templates and no-show analytics.",
    add: ["WhatsApp reminders", "SMS provider integration", "Waitlist filling", "Doctor schedule analytics", "Multilingual templates"],
    sources: ["Healthcare admin SaaS pricing", "Appointment reminder product patterns"],
    mvp: ["Appointment import", "Reminder templates", "Confirm/reschedule status", "No-show dashboard", "Waitlist notes"]
  },
  {
    rank: 13,
    id: "ai-ugc-ad-brief-generator",
    name: "AI UGC Ad Brief Generator",
    category: "Performance marketing",
    score: 73,
    revenue: "$29-$199/mo for brands/agencies",
    revenueValues: [
      ["Buyer", "DTC brands and agencies pay for ad creative systems"],
      ["Workflow", "Briefs, hooks, scripts, and variants"],
      ["Expansion", "Creator marketplace"]
    ],
    graph: [16, 30, 44, 58, 73],
    gap: "Brands need many UGC variants but briefs are slow, inconsistent, and not tied to competitor patterns.",
    original: "Creates structured UGC briefs from product, audience, reviews, and competitor ad angles.",
    add: ["Creator matching", "Landing page angle map", "Hook library", "Creative scoring", "Ad result feedback loop"],
    sources: ["Performance creative workflow", "Creator economy monetization"],
    mvp: ["Product input", "Audience input", "Hook variants", "UGC script", "Brief export"]
  },
  {
    rank: 14,
    id: "local-language-ai-tutor",
    name: "Local-Language AI Tutor",
    category: "AI education localization",
    score: 72,
    revenue: "$5-$15/mo student plan",
    revenueValues: [
      ["AI category", "GenAI apps crossed $5B IAP in 2025"],
      ["Gap", "Local language and curriculum are underserved"],
      ["Expansion", "Tutor and parent accounts"]
    ],
    graph: [12, 25, 39, 56, 72],
    gap: "Global AI tutors often miss local language explanations, examples, syllabus, and cultural context.",
    original: "Explains lessons in local language with curriculum-aware examples and parent-friendly summaries.",
    add: ["Voice answers", "Parent reports", "Teacher packs", "Offline lessons", "Exam mode"],
    sources: ["Sensor Tower GenAI app growth", "Education app subscription patterns"],
    mvp: ["Ask question", "Local language explanation", "Examples", "Quiz", "Progress summary"]
  },
  {
    rank: 15,
    id: "ai-listing-improver-for-sellers",
    name: "AI App Listing Improver",
    category: "Seller-side acquisition tooling",
    score: 71,
    revenue: "$49-$199/report",
    revenueValues: [
      ["Buyer", "Sellers want higher acquisition price"],
      ["Marketplace", "Apps and SaaS are traded assets"],
      ["Expansion", "Broker/agency workflow"]
    ],
    graph: [9, 22, 37, 55, 71],
    gap: "Founders listing apps for sale do not know which metrics, screenshots, risks, and growth plans increase buyer confidence.",
    original: "Transforms a weak marketplace listing into a buyer-ready package with proof, risks, roadmap, and PRD.",
    add: ["Listing score", "Screenshot checklist", "Buyer FAQ", "Data room checklist", "Broker mode"],
    sources: ["Acquire.com seller workflows", "Flippa listing patterns"],
    mvp: ["Paste listing", "Score gaps", "Improve copy", "Buyer FAQ", "Export report"]
  },
  {
    rank: 16,
    id: "shopify-local-delivery-planner",
    name: "Shopify Local Delivery Route Planner",
    category: "Shopify Micro-SaaS",
    score: 83,
    revenue: "$15-$49/mo based on active routing limits",
    revenueValues: [
      ["Demand", "Local merchants want low-cost in-house delivery tools"],
      ["Integration", "Direct Shopify order sync"],
      ["Pricing", "Tiered subscriptions by order volume"]
    ],
    graph: [14, 32, 53, 69, 83],
    gap: "Enterprise route planners are overly complex and expensive; small shop owners need a 3-button Shopify interface to dispatch optimized routes to their own drivers.",
    original: "Instantly routes active local orders on a simple mobile map, generating a single driver dispatch link.",
    add: ["Shopify order sync", "SMS driver notification", "Proof of delivery photo", "Live tracking link", "Custom delivery windows"],
    sources: ["Shopify app store demand", "Local merchant forums", "Route optimization SaaS models"],
    mvp: ["Shopify API connector", "Address geocoding", "TSP route calculation", "Interactive map", "Driver share link"]
  },
  {
    rank: 17,
    id: "notion-portfolio-publisher",
    name: "Notion Portfolio PDF Publisher",
    category: "Notion Ecosystem SaaS",
    score: 81,
    revenue: "Free 1 export/mo; $5/one-time or $12/mo unlimited",
    revenueValues: [
      ["Demand", "Notion users want clean resume exports"],
      ["Monetization", "Pay-per-export or monthly plan"],
      ["Expansion", "Corporate team resume branding templates"]
    ],
    graph: [12, 28, 45, 62, 81],
    gap: "Exporting Notion pages to PDF natively breaks margins, page breaks, and column alignments; current page builders build sites, not print-ready documents.",
    original: "Wraps Notion pages into gorgeous, pixel-perfect, printer-friendly PDF resumes or portfolios in one click.",
    add: ["Custom CSS templates", "Page-break controls", "Custom headers/footers", "Fonts styling selector", "Multi-page preview"],
    sources: ["Notion reddit communities", "Student and freelance portfolios", "SaaS export utilities"],
    mvp: ["Notion page URL importer", "Clean styling templates", "PDF renderer", "Page-break insertion", "Direct PDF download"]
  },
  {
    rank: 18,
    id: "idle-portfolio-manager",
    name: "Idle Portfolio Manager",
    category: "Educational Idle Game",
    score: 79,
    revenue: "Ad-supported speed boosts + premium ad-free pass ($4.99)",
    revenueValues: [
      ["Category", "Idle clicker games are cheap to build and highly addictive"],
      ["Value", "Teaches compounding interest and market cycles"],
      ["Monetization", "Optional rewarded video ads + microtransactions"]
    ],
    graph: [10, 26, 43, 60, 79],
    gap: "Finance simulations are boring and complex, while typical idle clicker games are mindless and offer no educational value.",
    original: "An addictive idle clicker where you compound wealth, navigate simulated economic cycles, and diversify into virtual assets.",
    add: ["Bull/Bear market events", "Virtual Real Estate buying", "Compound interest calculator dashboard", "Crypto and ETF assets", "Leaderboards"],
    sources: ["Idle clicker game mechanics", "Gamified financial education trends", "AdMagic analytics"],
    mvp: ["Click-to-earn loop", "Automatic compounding upgrades", "Simple asset buyer (ETFs/Real Estate)", "Market crash events", "Daily statistics"]
  },
  {
    rank: 19,
    id: "word-dungeon",
    name: "Word Dungeon RPG",
    category: "Puzzle RPG Game",
    score: 77,
    revenue: "$0.99 ad-free version or in-game coin packs",
    revenueValues: [
      ["Demand", "Word games have high daily active users (DAU)"],
      ["Retention", "Daily puzzles + level progression"],
      ["Pricing", "Rewarded ads + coin booster purchases"]
    ],
    graph: [8, 20, 39, 58, 77],
    gap: "Daily word puzzles like Wordle lack engaging RPG progression or level systems, while mobile RPGs are too complex for casual word lovers.",
    original: "A word puzzle RPG where you fight monsters, loot dungeons, and level up your hero by spelling words from a randomized grid.",
    add: ["Hero gear upgrades", "Elemental word bonuses", "Boss battle mode", "Daily challenge dungeon", "Achievements and skins"],
    sources: ["Wordle retention patterns", "Casual RPG app store performance", "Rewarded ad metrics"],
    mvp: ["Word grid generator", "Turn-based combat system", "Hero health/damage stats", "Simple dungeon map", "Coin rewards"]
  }
];

const devDaysMap = {
  "ai-review-revenue-assistant": 20,
  "vertical-micro-drama-studio": 45,
  "whatsapp-voice-note-to-invoice": 15,
  "app-acquisition-analyzer": 12,
  "local-business-video-repurposer": 30,
  "exam-ai-study-planner": 25,
  "receipt-warranty-vault": 14,
  "subscription-cancellation-coach": 10,
  "ai-voice-crm-solo-services": 20,
  "mobile-review-gap-miner": 15,
  "ai-menu-margin-optimizer": 18,
  "clinic-no-show-reducer": 15,
  "ai-ugc-ad-brief-generator": 12,
  "local-language-ai-tutor": 25,
  "ai-listing-improver-for-sellers": 10,
  "shopify-local-delivery-planner": 14,
  "notion-portfolio-publisher": 8,
  "idle-portfolio-manager": 15,
  "word-dungeon": 20
};

ideas.forEach((idea) => {
  idea.devDays = devDaysMap[idea.id] || 30;
  idea.type = /game/i.test(idea.category) ? "Game" : "SaaS";
});

const dailySignals = [
  "Check one top-grossing AI app and extract its paid upgrade trigger.",
  "Mine 30 one-star reviews in a high-revenue category and group repeated complaints.",
  "Open three Flippa or Acquire listings and record asking price, MRR, and risk signals.",
  "Compare App Store screenshots from five competitors and find missing positioning.",
  "Search Reddit for a repeated complaint around one app workflow.",
  "Find one utility category with old apps, high ratings, and weak UX.",
  "Validate whether an idea can add team plans, credits, templates, or paid reports."
];

const tabs = ["Overview", "Market", "Competitors", "Gaps", "MVP", "Revenue", "Validation", "Risks", "Roadmap"];
const storageKey = "app-idea-research-agent.savedIdeas";
const userKeyStorageKey = "app-idea-research-agent.userKey";
const dailyCacheKey = "app-idea-research-agent.dailyHook";
const currentIdeasStorageKey = "app-idea-research-agent.currentIdeas";
const archivedIdeasStorageKey = "app-idea-research-agent.archivedIdeas";
const dailyRefreshMs = 12 * 60 * 60 * 1000;

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hydrateFreshIdea(item, index) {
  const category = item.category || `${item.type || "SaaS"} opportunity`;
  const score = item.score || Math.max(70, 92 - index);
  const type = item.type || (/game/i.test(category) ? "Game" : "SaaS");
  const evidenceTitles = Array.isArray(item.evidence) && item.evidence.length > 0
    ? item.evidence.map((signal) => `${signal.source}: ${signal.title}`)
    : ["Live source evidence collected during refresh"];

  return {
    rank: index + 1,
    id: `live-${slugify(item.name)}-${index + 1}`,
    name: item.name,
    category,
    type,
    score,
    revenue: type === "Game"
      ? "Ads, premium unlock, content packs, and optional in-app purchases"
      : "$19-$199/mo, paid reports, credits, or team plans depending on buyer segment",
    revenueValues: [
      ["Live signal", item.sourceSignal?.source || item.refreshSource || "Website research"],
      ["Evidence", `${Array.isArray(item.evidence) ? item.evidence.length : 0} linked signals`],
      ["Build", `${item.devDays || 15} day MVP estimate`]
    ],
    graph: [24, 42, 58, 73, score],
    gap: item.researchTask || "Live sources suggest a workflow with buyer pain, weak tooling, or a packaging gap worth validating.",
    original: `A focused ${category.toLowerCase()} product generated from fresh website signals, packaged around one narrow workflow instead of broad generic AI features.`,
    add: ["Team workspace", "Evidence dashboard", "PDF/export reports", "Templates", "Usage-based credits"],
    sources: evidenceTitles,
    mvp: ["Capture/import source input", "Generate ranked recommendations", "Review/edit output", "Export/share report", "Track follow-up actions"],
    devDays: item.devDays || 15,
    evidence: item.evidence || []
  };
}

const competitorExamples = {
  "AI workflow + local business SaaS": ["Birdeye", "Podium", "ChatGPT", "Google Business Profile"],
  "Entertainment + AI content": ["ReelShort", "DramaBox", "TikTok", "YouTube Shorts"],
  "AI productivity + small business": ["Otter", "Notta", "Invoice Maker", "Zoho Invoice"],
  "Startup acquisition tooling": ["Acquire.com", "Flippa", "Microns", "Indiemaker"],
  "Creator tools + local marketing": ["CapCut", "Canva", "OpusClip", "Buffer"],
  "AI education": ["Duolingo Max", "Quizlet", "Photomath", "ChatGPT"],
  "Household finance utility": ["Expensify", "Evernote", "Google Drive", "Warranty Keeper"],
  "Consumer finance": ["Rocket Money", "Bobby", "Subby", "Banking apps"],
  "Micro-CRM": ["HubSpot", "Notion", "Airtable", "WhatsApp Business"],
  "Developer tooling": ["Appfigures", "AppTweak", "Sensor Tower", "Google Play Console"],
  "Restaurant operations": ["Toast", "Square", "MarketMan", "Excel"],
  "Healthcare admin utility": ["Calendly", "SimplePractice", "Zocdoc", "SMS reminder tools"],
  "Performance marketing": ["Canva", "Foreplay", "Motion", "ChatGPT"],
  "AI education localization": ["Khan Academy", "ChatGPT", "Quizlet", "Local tutoring centers"],
  "Seller-side acquisition tooling": ["Acquire.com", "Flippa", "Google Docs", "Broker templates"],
  "Shopify Micro-SaaS": ["Route4Me", "Shopify Apps", "RoadWarrior", "LogiNext"],
  "Notion Ecosystem SaaS": ["Super.so", "Potion", "Notion PDF Export", "Adobe Acrobat"],
  "Educational Idle Game": ["AdVenture Capitalist", "Idle Miner", "Finance Simulators"],
  "Puzzle RPG Game": ["Bookworm Adventures", "Wordle", "Spellspire", "Scrabble"]
};

function getOrCreateUserKey() {
  const existing = window.localStorage.getItem(userKeyStorageKey);
  if (existing) return existing;

  const generated = crypto.randomUUID();
  window.localStorage.setItem(userKeyStorageKey, generated);
  return generated;
}

function RevenueGraph({ values }) {
  const height = 120;
  const width = 300;
  const padding = 20;

  // Calculate coordinates
  const points = values.map((val, idx) => {
    const x = padding + (idx * (width - 2 * padding)) / (values.length - 1);
    const y = height - padding - (val / 100) * (height - 2 * padding);
    return { x, y, val };
  });

  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="revenueGraphWrapper">
      <div className="revenueGraph" aria-label="Revenue opportunity score trend">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ display: "block" }}>
          {/* Grid lines */}
          {[25, 50, 75, 100].map((level) => {
            const y = height - padding - (level / 100) * (height - 2 * padding);
            return (
              <line
                key={level}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="var(--line)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Polyline line graph */}
          <polyline
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePoints}
          />

          {/* Value circles & labels */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r="5" fill="var(--accent)" opacity="0.2" />
              <circle cx={p.x} cy={p.y} r="3" fill="#ffffff" stroke="var(--accent)" strokeWidth="2" />
              <text
                x={p.x}
                y={p.y - 7}
                fontSize="9"
                fontWeight="800"
                textAnchor="middle"
                fill="var(--accent-dark)"
              >
                {p.val}%
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="graphLabels">
        {values.map((_, idx) => (
          <span key={idx}>Y{idx + 1}</span>
        ))}
      </div>
    </div>
  );
}

function getCompetitors(idea) {
  return (competitorExamples[idea.category] || ["Generic incumbents", "Manual workflow", "Spreadsheets", "AI chat tools"])
    .map((name, index) => ({
      name,
      strength: ["Distribution", "Feature depth", "Brand trust", "Low friction"][index % 4],
      weakness: [
        "Too broad for the target wedge",
        "Weak mobile-first workflow",
        "Not priced for small operators",
        "Does not convert insight into action"
      ][index % 4],
      opportunity: [
        "Package the workflow for one specific buyer",
        "Use better defaults and simpler onboarding",
        "Add reports and exports buyers can act on",
        "Create niche-specific templates"
      ][index % 4]
    }));
}

function getResearch(idea) {
  return {
    market: [
      `Category: ${idea.category}.`,
      `Revenue thesis: ${idea.revenue}.`,
      `Score: ${idea.score}/100 based on trend, pain, monetization, feasibility, and risk.`,
      "Use paid app-intelligence tools later to replace these static estimates with live ranks, revenue estimates, and review counts."
    ],
    pain: [
      "Users currently rely on generic apps, manual spreadsheets, or broad platforms.",
      idea.gap,
      "The wedge works if the product completes one job end-to-end instead of adding another disconnected tool."
    ],
    validation: [
      "Interview 10 target users and ask what they use today, what they pay for, and what they dislike.",
      "Collect 50-100 competitor reviews and group repeated complaint themes.",
      "Create a landing page with the exact paid offer and measure waitlist conversion.",
      "Run a concierge test manually for 5 users before building the full product.",
      "Reject the idea if users like the concept but will not pay or switch workflows."
    ],
    risks: [
      "Revenue values are directional until validated with live app-intelligence data.",
      "AI output quality must be reviewable by the user before it affects customers or money.",
      "Platform/API access may change, so MVP should support manual import first.",
      "Broad positioning will fail; the product needs a narrow first audience."
    ],
    roadmap: [
      ["Week 1", "Landing page, user interviews, competitor review mining, pricing hypothesis"],
      ["Week 2", `Build core workflow: ${idea.mvp.slice(0, 3).join(", ")}`],
      ["Week 3", "Private beta with 10-20 users, measure activation and correction rate"],
      ["Week 4", "Launch v1, add analytics, publish case study, start ASO/content tests"],
      ["V2", idea.add.slice(0, 3).join(", ")]
    ],
    gtm: [
      `Positioning: ${idea.name} for ${idea.category.toLowerCase()}.`,
      "Launch in niche communities before broad app stores.",
      "Turn each market gap into one comparison page and one short-form video angle.",
      "Use saved reports, PDF exports, templates, or credits as upgrade triggers."
    ]
  };
}

export default function IdeaBoard() {
  const [currentIdeas, setCurrentIdeas] = useState(ideas);
  const [archivedIdeas, setArchivedIdeas] = useState([]);
  const [saved, setSaved] = useState([]);
  const [userKey, setUserKey] = useState("");
  const [storageMode, setStorageMode] = useState("local");
  const [selectedId, setSelectedId] = useState(ideas[0].id);
  const [activeTab, setActiveTab] = useState("Overview");
  const [filterDays, setFilterDays] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [daily, setDaily] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isRefreshingDaily, setIsRefreshingDaily] = useState(false);
  const [isRenewingIdeas, setIsRenewingIdeas] = useState(false);

  async function loadSavedIdeas(key) {
    if (!key) return;
    try {
      const response = await fetch(`/api/saved-ideas?userKey=${encodeURIComponent(key)}`);
      const data = await response.json();
      if (data.storage) setStorageMode(data.storage);
      if (Array.isArray(data.savedIdeas) && data.storage === "neon") {
        setSaved(data.savedIdeas.map((item) => item.ideaId));
      }
    } catch {
      setStorageMode("local");
    }
  }

  async function loadDailyHook({ force = false } = {}) {
    const cached = window.localStorage.getItem(dailyCacheKey);
    if (!force && cached) {
      try {
        const parsed = JSON.parse(cached);
        const fetchedAt = new Date(parsed.fetchedAt).getTime();
        if (Number.isFinite(fetchedAt) && Date.now() - fetchedAt < dailyRefreshMs) {
          setDaily(parsed.daily);
          return;
        }
      } catch {
        window.localStorage.removeItem(dailyCacheKey);
      }
    }

    setIsRefreshingDaily(true);
    try {
      const params = new URLSearchParams();
      if (force) {
        params.set("refresh", "1");
        if (daily?.idea?.name) params.set("current", daily.idea.name);
        params.set("t", String(Date.now()));
      }
      const response = await fetch(`/api/daily-ideas${params.size ? `?${params.toString()}` : ""}`, { cache: "no-store" });
      const data = await response.json();
      const matchedIdea = currentIdeas.find((idea) => idea.name === data.idea);
      const displayedIdea = matchedIdea || {
        id: `fresh-${slugify(data.idea)}`,
        name: data.idea,
        category: data.category || `${data.type || "SaaS"} opportunity`,
        type: data.type || "SaaS",
        devDays: data.devDays || 15
      };
      const nextDaily = {
        date: data.date,
        idea: displayedIdea,
        signal: data.researchTask,
        type: data.type || displayedIdea.type,
        evidence: Array.isArray(data.evidence) ? data.evidence : [],
        refreshSource: data.refreshSource,
        generatedAt: data.generatedAt,
        nextRefreshAt: data.nextRefreshAt
      };
      setDaily(nextDaily);
      window.localStorage.setItem(dailyCacheKey, JSON.stringify({
        fetchedAt: new Date().toISOString(),
        daily: nextDaily
      }));
    } catch {
      const now = new Date();
      const hourBlock = now.getHours() < 12 ? 0 : 12;
      const seed = Number(`${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${hourBlock}`);
      const fallbackIdea = ideas[seed % ideas.length];
      setDaily({
        date: now.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) + (hourBlock === 0 ? " AM" : " PM"),
        idea: fallbackIdea,
        signal: dailySignals[seed % dailySignals.length],
        type: fallbackIdea.type
      });
    } finally {
      setIsRefreshingDaily(false);
    }
  }

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) setSaved(JSON.parse(stored));

    const storedCurrentIdeas = window.localStorage.getItem(currentIdeasStorageKey);
    if (storedCurrentIdeas) {
      try {
        const parsed = JSON.parse(storedCurrentIdeas);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCurrentIdeas(parsed);
          setSelectedId(parsed[0].id);
        }
      } catch {
        window.localStorage.removeItem(currentIdeasStorageKey);
      }
    }

    const storedArchive = window.localStorage.getItem(archivedIdeasStorageKey);
    if (storedArchive) {
      try {
        const parsed = JSON.parse(storedArchive);
        if (Array.isArray(parsed)) setArchivedIdeas(parsed);
      } catch {
        window.localStorage.removeItem(archivedIdeasStorageKey);
      }
    }

    const key = getOrCreateUserKey();
    setUserKey(key);
    loadSavedIdeas(key);
    loadDailyHook();
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    window.localStorage.setItem(currentIdeasStorageKey, JSON.stringify(currentIdeas));
  }, [currentIdeas]);

  useEffect(() => {
    window.localStorage.setItem(archivedIdeasStorageKey, JSON.stringify(archivedIdeas));
  }, [archivedIdeas]);

  async function refreshSaved() {
    setIsSyncing(true);
    await loadSavedIdeas(userKey);
    setTimeout(() => setIsSyncing(false), 500);
  }

  function refreshDaily() {
    loadDailyHook({ force: true });
  }

  async function renewAllIdeas() {
    setIsRenewingIdeas(true);
    try {
      const response = await fetch(`/api/daily-ideas?refresh=1&batch=20&t=${Date.now()}`, { cache: "no-store" });
      const data = await response.json();
      if (!Array.isArray(data.ideas) || data.ideas.length === 0) {
        throw new Error("No new ideas returned");
      }

      const nextIdeas = data.ideas.slice(0, 20).map((item, index) => hydrateFreshIdea({
        ...item,
        refreshSource: data.refreshSource
      }, index));
      setArchivedIdeas((current) => [
        {
          id: `archive-${Date.now()}`,
          savedAt: new Date().toISOString(),
          source: data.refreshSource || "refresh",
          ideas: currentIdeas
        },
        ...current
      ].slice(0, 10));
      setCurrentIdeas(nextIdeas);
      setSelectedId(nextIdeas[0].id);
      setFilterType("all");
      setFilterDays("all");
      setDaily({
        date: new Date().toISOString().slice(0, 10) + " refreshed",
        idea: nextIdeas[0],
        signal: nextIdeas[0].gap,
        type: nextIdeas[0].type,
        evidence: nextIdeas[0].evidence || [],
        refreshSource: data.refreshSource,
        generatedAt: data.generatedAt
      });
    } finally {
      setIsRenewingIdeas(false);
    }
  }

  const filteredIdeas = useMemo(() => {
    let nextIdeas = currentIdeas;
    if (filterType !== "all") {
      nextIdeas = nextIdeas.filter((idea) => idea.type === filterType);
    }
    if (filterDays === "all") return nextIdeas;
    const maxDays = parseInt(filterDays, 10);
    return nextIdeas.filter((idea) => idea.devDays <= maxDays);
  }, [currentIdeas, filterDays, filterType]);

  const selected = useMemo(() => {
    return filteredIdeas.find((idea) => idea.id === selectedId) || filteredIdeas[0] || currentIdeas[0] || ideas[0];
  }, [currentIdeas, filteredIdeas, selectedId]);

  const savedIdeas = currentIdeas.filter((idea) => saved.includes(idea.id));
  const research = getResearch(selected);
  const competitors = getCompetitors(selected);

  async function toggleSaved(id) {
    const idea = currentIdeas.find((item) => item.id === id);
    if (!idea) return;
    const isSaved = saved.includes(id);

    setSaved((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);

    if (!userKey) return;

    try {
      if (isSaved) {
        const params = new URLSearchParams({ userKey, ideaId: id });
        const response = await fetch(`/api/saved-ideas?${params.toString()}`, { method: "DELETE" });
        const data = await response.json();
        if (data.storage) setStorageMode(data.storage);
      } else {
        const response = await fetch("/api/saved-ideas", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userKey, ideaId: id, ideaName: idea.name })
        });
        const data = await response.json();
        if (data.storage) setStorageMode(data.storage);
      }
    } catch {
      setStorageMode("local");
    }
  }

  async function saveAll() {
    const unsaved = currentIdeas.filter((idea) => !saved.includes(idea.id));
    if (unsaved.length === 0) return;

    setSaved((current) => [...current, ...unsaved.map((idea) => idea.id)]);

    if (!userKey) return;

    try {
      await Promise.all(
        unsaved.map((idea) =>
          fetch("/api/saved-ideas", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ userKey, ideaId: idea.id, ideaName: idea.name })
          })
        )
      );
    } catch {
      setStorageMode("local");
    }
  }

  async function clearAll() {
    if (saved.length === 0) return;
    const toDelete = [...saved];
    setSaved([]);

    if (!userKey) return;

    try {
      await Promise.all(
        toDelete.map((id) => {
          const params = new URLSearchParams({ userKey, ideaId: id });
          return fetch(`/api/saved-ideas?${params.toString()}`, { method: "DELETE" });
        })
      );
    } catch {
      setStorageMode("local");
    }
  }

  function downloadPdf() {
    window.print();
  }

  return (
    <>
      <section id="daily" className="section dailySection">
        <div className="sectionTitle">
          <p className="eyebrow">Daily update</p>
          <h2>Today&apos;s premium research hook</h2>
        </div>
        <div className="dailyGrid">
          <article className="dailyCard premium3d">
            {daily ? (
              <>
                <div className="cardHeaderRow">
                  <span>{daily.date}</span>
                  <div className="savedControls noPrint">
                    <button type="button" onClick={refreshDaily} disabled={isRefreshingDaily || isRenewingIdeas} className="miniButton ghost">
                      {isRefreshingDaily ? "Refreshing..." : "Refresh one"}
                    </button>
                    <button type="button" onClick={renewAllIdeas} disabled={isRenewingIdeas} className="miniButton accent">
                      {isRenewingIdeas ? "Renewing..." : "Renew all 20"}
                    </button>
                  </div>
                </div>
                <h3>{daily.idea.name}</h3>
                <p className="dailyMeta">
                  {daily.type} idea
                  {daily.nextRefreshAt ? ` • next 12-hour fetch ${new Date(daily.nextRefreshAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : " • fetches every 12 hours"}
                </p>
                <p>{daily.signal}</p>
                {daily.evidence?.length > 0 && (
                  <div className="evidenceList">
                    {daily.evidence.slice(0, 3).map((item) => (
                      <a href={item.url} target="_blank" rel="noreferrer" key={`${item.source}-${item.title}`}>
                        <span>{item.source}</span>
                        <strong>{item.title}</strong>
                      </a>
                    ))}
                  </div>
                )}
                <div className="dailyActions">
                  {currentIdeas.some((idea) => idea.id === daily.idea.id) ? (
                    <>
                      <button type="button" onClick={() => setSelectedId(daily.idea.id)}>Open idea</button>
                      <button type="button" onClick={() => toggleSaved(daily.idea.id)}>
                        {saved.includes(daily.idea.id) ? "Saved" : "Save idea"}
                      </button>
                    </>
                  ) : (
                    <button type="button" disabled>Fresh research idea</button>
                  )}
                </div>
              </>
            ) : (
              <p>Loading hook...</p>
            )}
          </article>
          <article id="saved" className="savedCard premium3d soft">
            <div className="cardHeaderRow">
              <span>{savedIdeas.length} saved • Storage: {storageMode === "neon" ? "Neon" : "Local fallback"}</span>
              <div className="savedControls noPrint">
                <button type="button" onClick={refreshSaved} disabled={isSyncing} className="miniButton">
                  {isSyncing ? "Syncing..." : "Refresh saved list"}
                </button>
                {saved.length < currentIdeas.length && (
                  <button type="button" onClick={saveAll} className="miniButton accent">
                    Save All
                  </button>
                )}
                {saved.length > 0 && (
                  <button type="button" onClick={clearAll} className="miniButton ghost">
                    Clear All
                  </button>
                )}
              </div>
            </div>
            <h3>Saved ideas</h3>
            {savedIdeas.length === 0 ? (
              <p>No saved ideas yet. Save the strongest opportunities for follow-up research.</p>
            ) : (
              <ul>{savedIdeas.map((idea) => <li key={idea.id}>{idea.name}</li>)}</ul>
            )}
          </article>
        </div>
      </section>

      <section id="archive" className="section compact archiveSection">
        <div className="sectionTitle">
          <p className="eyebrow">Old ideas</p>
          <h2>Archived idea boards from previous refreshes</h2>
        </div>
        {archivedIdeas.length === 0 ? (
          <article className="savedCard soft">
            <p>No archived boards yet. Use <strong>Renew all 20</strong> and the previous board will be saved here.</p>
          </article>
        ) : (
          <div className="archiveGrid">
            {archivedIdeas.map((archive) => (
              <article className="savedCard soft" key={archive.id}>
                <span>{new Date(archive.savedAt).toLocaleString()} • {archive.source}</span>
                <h3>{archive.ideas.length} old ideas</h3>
                <ul>{archive.ideas.slice(0, 20).map((idea) => <li key={idea.id}>{idea.name}</li>)}</ul>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="ideas" className="section ideasExplorer">
        <div className="sectionTitle">
          <p className="eyebrow">
            {filterDays === "all" && filterType === "all" ? `${currentIdeas.length} ranked SaaS and game opportunities` : `${filteredIdeas.length} of ${currentIdeas.length} ideas match filters`}
          </p>
          <div className="cardHeaderRow">
            <h2>Click an idea to inspect revenue, gaps, values, and expansion paths</h2>
            <button type="button" onClick={renewAllIdeas} disabled={isRenewingIdeas} className="miniButton accent noPrint">
              {isRenewingIdeas ? "Renewing..." : "Renew all 20 from websites"}
            </button>
          </div>
          
          <div className="filterPanel noPrint" aria-label="Idea filters">
            <div className="typeSegment" role="group" aria-label="Idea type">
              {[
                { label: "All", value: "all", count: currentIdeas.length },
                { label: "SaaS", value: "SaaS", count: currentIdeas.filter((idea) => idea.type === "SaaS").length },
                { label: "Games", value: "Game", count: currentIdeas.filter((idea) => idea.type === "Game").length }
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={filterType === opt.value ? "active" : ""}
                  onClick={() => setFilterType(opt.value)}
                >
                  <span>{opt.label}</span>
                  <strong>{opt.count}</strong>
                </button>
              ))}
            </div>

            <div className="buildFilter">
              <span className="filterLabel">Development days through vibe coding</span>
              <div className="filterChips">
                {[
                  { label: "All", value: "all" },
                  { label: "10 days", value: "10" },
                  { label: "15 days", value: "15" },
                  { label: "20 days", value: "20" },
                  { label: "30 days", value: "30" }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`filterBtn ${filterDays === opt.value ? "active" : ""}`}
                    onClick={() => {
                      setFilterDays(opt.value);
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="explorerGrid">
          <div className="ideaTiles">
            {filteredIdeas.map((idea) => (
              <button
                className={`ideaTile premium3d ${idea.id === selected.id ? "active" : ""}`}
                key={idea.id}
                type="button"
                onClick={() => {
                  setSelectedId(idea.id);
                  setActiveTab("Overview");
                }}
              >
                <span className="tileRank">#{idea.rank}</span>
                <strong>{idea.name}</strong>
                <small>{idea.type} • {idea.category} • {idea.devDays}d vibe-coding build</small>
                <em>{idea.score}/100</em>
              </button>
            ))}
            {filteredIdeas.length === 0 && (
              <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--muted)" }}>
                No ideas match the selected build time filter.
              </p>
            )}
          </div>

          <article className="ideaDetail printArea">
            <div className="detailHero">
              <div>
                <p className="eyebrow">Selected idea</p>
                <h3>{selected.name}</h3>
                <p>{selected.category}</p>
                <p className="dailyMeta">{selected.type} • {selected.devDays} days through vibe coding</p>
              </div>
              <div className="scoreOrb">{selected.score}</div>
            </div>

            <div className="detailActions noPrint">
              <button type="button" onClick={() => toggleSaved(selected.id)}>
                {saved.includes(selected.id) ? "Saved" : "Save idea"}
              </button>
              <button type="button" onClick={downloadPdf}>Download PDF</button>
            </div>

            <div className="tabs noPrint">
              {tabs.map((tab) => (
                <button
                  className={activeTab === tab ? "active" : ""}
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="tabPanel">
              {activeTab === "Overview" && (
                <div className="detailGrid">
                  <section>
                    <h4>Revenue thesis</h4>
                    <p>{selected.revenue}</p>
                    <RevenueGraph values={selected.graph} />
                  </section>
                  <section>
                    <h4>Original value</h4>
                    <p>{selected.original}</p>
                  </section>
                  <section>
                    <h4>Market gap</h4>
                    <p>{selected.gap}</p>
                  </section>
                  <section>
                    <h4>Estimated Build Time</h4>
                    <p style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--accent)", margin: 0 }}>
                      {selected.devDays} Days MVP Build Through Vibe Coding
                    </p>
                  </section>
                  <section>
                    <h4>Research sources</h4>
                    <ul>{selected.sources.map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                </div>
              )}

              {activeTab === "Market" && (
                <div className="detailGrid">
                  <section>
                    <h4>Market size and trend</h4>
                    <ul>{research.market.map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                  <section>
                    <h4>Real values to track</h4>
                    <div className="valueTable">
                      {selected.revenueValues.map(([label, value]) => (
                        <div key={label}><span>{label}</span><strong>{value}</strong></div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h4>Go-to-market angles</h4>
                    <ul>{research.gtm.map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                </div>
              )}

              {activeTab === "Competitors" && (
                <section className="wideSection">
                  <h4>Competitor map</h4>
                  <div className="competitorTable">
                    <div className="tableHead"><span>Competitor</span><span>Strength</span><span>Weakness</span><span>Opportunity</span></div>
                    {competitors.map((item) => (
                      <div key={item.name}>
                        <span>{item.name}</span>
                        <span>{item.strength}</span>
                        <span>{item.weakness}</span>
                        <span>{item.opportunity}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === "Gaps" && (
                <div className="detailGrid">
                  <section>
                    <h4>Gap explanation</h4>
                    <ul>{research.pain.map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                  <section>
                    <h4>Why this can be better</h4>
                    <p>{selected.original}</p>
                  </section>
                </div>
              )}

              {activeTab === "MVP" && (
                <div className="detailGrid">
                  <section>
                    <h4>Must-have MVP</h4>
                    <ul>{selected.mvp.map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                  <section>
                    <h4>Avoid in v1</h4>
                    <ul>
                      <li>Complex integrations before manual import is validated.</li>
                      <li>Broad multi-segment positioning.</li>
                      <li>Enterprise permissions before repeat usage is proven.</li>
                      <li>Heavy automation without user review.</li>
                    </ul>
                  </section>
                </div>
              )}

              {activeTab === "Revenue" && (
                <div className="detailGrid">
                  <section>
                    <h4>Revenue model</h4>
                    <p>{selected.revenue}</p>
                    <RevenueGraph values={selected.graph} />
                  </section>
                  <section>
                    <h4>Expansion revenue</h4>
                    <ul>{selected.add.map((item) => <li key={item}>{item}</li>)}</ul>
                  </section>
                </div>
              )}

              {activeTab === "Validation" && (
                <section className="wideSection">
                  <h4>Validation plan</h4>
                  <ol>{research.validation.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
              )}

              {activeTab === "Risks" && (
                <section className="wideSection">
                  <h4>Risks and mitigations</h4>
                  <ul>{research.risks.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              )}

              {activeTab === "Roadmap" && (
                <section className="wideSection">
                  <h4>Build roadmap</h4>
                  <div className="roadmap">
                    {research.roadmap.map(([phase, item]) => (
                      <div key={phase}><span>{phase}</span><p>{item}</p></div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

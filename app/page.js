import IdeaBoard from "./components/IdeaBoard";

const sources = [
  ["Sensor Tower", "Mobile revenue, downloads, IAP, category movement, ad intelligence"],
  ["Appfigures", "App analytics, ASO, reviews, SDK intelligence, API-backed reports"],
  ["AppTweak", "Keyword opportunity, ASO metadata, competitor visibility"],
  ["MobileAction", "Apple Search Ads, ASO, creative and market intelligence"],
  ["AppMagic", "Mobile games and high-grossing app revenue estimates"],
  ["Similarweb", "Web/app traffic, acquisition channels, audience behavior"],
  ["Acquire / Flippa / Microns", "Acquisition demand, MRR claims, asking prices, sellability"],
  ["Google Play / App Store", "Review pain, ratings, update recency, pricing, screenshots"],
  ["Reddit / Product Hunt / TikTok", "Raw user pain, trend language, early adopter demand"]
];

const evidence = [
  {
    label: "Global app monetization",
    value: "$167B",
    detail: "Global IAP revenue in 2025 per Sensor Tower State of Mobile 2026."
  },
  {
    label: "Non-game app shift",
    value: "+21%",
    detail: "Non-game IAP revenue grew YoY and surpassed games for the first time."
  },
  {
    label: "Generative AI apps",
    value: "$5B+",
    detail: "GenAI app IAP revenue exceeded $5B in 2025, with 3.8B downloads."
  },
  {
    label: "Micro-drama market",
    value: "$7.8B",
    detail: "2026 revenue projection cited by Business Insider from Deloitte."
  }
];

const workflow = [
  "Find high-revenue categories, not just popular categories.",
  "Map competitors, pricing, ranks, reviews, and update recency.",
  "Mine repeated user complaints into market-gap statements.",
  "Check acquisition marketplaces for sellability and MRR patterns.",
  "Score ideas by trend, pain, monetization, feasibility, distribution, and risk.",
  "Open any idea, inspect the complete thesis, then download the selected idea as PDF."
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div className="brand">App Idea Research Agent</div>
          <div className="navLinks">
            <a href="#research">Research</a>
            <a href="#ideas">Ideas</a>
            <a href="#saved">Saved</a>
            <a href="#archive">Old ideas</a>
            <a href="#prd">Workflow</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Revenue-first app discovery</p>
            <h1>Inspect premium app ideas with full research tabs and revenue graphs.</h1>
            <p className="lead">
              This agent researches high-revenue app categories, real market gaps, competitor weaknesses,
              acquisition demand, original value, MVP plans, validation steps, risks, and roadmaps.
            </p>
            <div className="actions">
              <a className="primary" href="#ideas">Open idea explorer</a>
              <a className="secondary" href="#research">View source context</a>
            </div>
          </div>

          <div className="agentPanel" aria-label="Agent workflow summary">
            <div className="panelHeader">
              <span>Agent Output</span>
              <strong>PDF-ready thesis</strong>
            </div>
            <div className="signalList">
              <div><span>Research</span><b>Sources + context</b></div>
              <div><span>Validation</span><b>Gaps + pain</b></div>
              <div><span>Business</span><b>Revenue + add-ons</b></div>
              <div><span>Build</span><b>MVP + roadmap</b></div>
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="section">
        <div className="sectionTitle">
          <p className="eyebrow">Market context</p>
          <h2>Research signals the agent uses</h2>
        </div>
        <div className="metrics">
          {evidence.map((item) => (
            <article className="metric" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section compact">
        <div className="sectionTitle">
          <p className="eyebrow">Source stack</p>
          <h2>Where ideas are validated</h2>
        </div>
        <div className="sourceGrid">
          {sources.map(([name, use]) => (
            <article className="source" key={name}>
              <h3>{name}</h3>
              <p>{use}</p>
            </article>
          ))}
        </div>
      </section>

      <IdeaBoard />

      <section id="prd" className="section split">
        <div>
          <p className="eyebrow">Workflow</p>
          <h2>From signal to PRD</h2>
          <ol className="workflow">
            {workflow.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
        <div className="commandCard">
          <h3>PDF workflow</h3>
          <code>Open idea {"->"} Download PDF</code>
          <p>
            Each selected idea has revenue thesis, source-backed values, market gap, MVP,
            expansion features, and a print-to-PDF export.
          </p>
          <p>
            DOCX generation still exists in the repo for internal PRD generation, but the public website
            now focuses on idea-first exploration.
          </p>
        </div>
      </section>
    </main>
  );
}

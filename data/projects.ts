export interface ProjectSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface ProjectDetailContent {
  overview: string;
  sections: ProjectSection[];
  architectureDiagram?: string;
  keyFeatures?: string[];
  dataSources?: { name: string; type: string; details: string }[];
  apiEndpoints?: { method: string; path: string; description: string }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  mediaUrl: string;
  mediaType: "video" | "gif" | "image";
  heroMediaUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: "geospatial" | "ml" | "data-engineering" | "fullstack" | "ai";
  gridSpan: "large" | "tall" | "wide" | "normal";
  detailContent?: ProjectDetailContent;
}

export const projects: Project[] = [
  {
    id: "neurovault",
    slug: "neurovault",
    title: "NeuroVault",
    subtitle: "Local-first AI memory for Claude",
    description:
      "A Tauri desktop app that gives Claude persistent memory across conversations. Markdown vault + knowledge graph + hybrid retrieval (semantic + BM25 + graph) - outperforms RAG at 96% hit@3, ~275 tokens/answer, and runs entirely on your machine.",
    techStack: [
      "Tauri 2",
      "React 19",
      "TypeScript",
      "Rust",
      "SQLite",
      "sqlite-vec",
      "fastembed-rs",
      "MCP",
      "Tailwind v4",
      "Axum",
    ],
    mediaUrl: "/images/projects/neurovault.svg",
    mediaType: "image",
    heroMediaUrl: "/images/projects/heroes/neurovault-hero.svg",
    githubUrl: "https://github.com/sirdath/NeuroVault",
    featured: true,
    category: "ai",
    gridSpan: "large",
    detailContent: {
      overview:
        "NeuroVault is a local-first AI memory system that fixes the central failure of LLM agents: they forget you after every conversation. Built as a Tauri 2 desktop app, NeuroVault stores notes as plain markdown in your home directory, indexes them with a Rust-powered hybrid retrieval engine (semantic + BM25 + knowledge graph), and exposes them to Claude over MCP. Most agent-memory products today are RAG pipelines in disguise. NeuroVault treats memory as a structured, updatable, inspectable knowledge base - what you get when you stop chunking-and-praying and start treating memory as a living wiki.",
      architectureDiagram: `+-------------------------------------------------+
|  Tauri 2 desktop app (React 19 + TypeScript)    |
|  Editor / Graph / Compile / Sidebar / Palette   |
+-----------------------+-------------------------+
                        | Tauri commands  +  HTTP :8765
+-----------------------v-------------------------+
|  In-process Rust backend                        |
|  - axum HTTP server (the MCP proxy talks here)  |
|  - hybrid retriever (semantic + BM25 + graph)   |
|  - fastembed-rs (BGE-small ONNX, local)         |
|  - notify file watcher                          |
+-----------------------+-------------------------+
                        | SQL + vec0
+-----------------------v-------------------------+
|  SQLite + sqlite-vec  (~/.neurovault/...)       |
|  brain.db, vault/*.md, raw/, assets/, cache/    |
+-------------------------------------------------+`,
      keyFeatures: [
        "Hybrid retrieval - semantic (BGE-small) + BM25 + knowledge graph fused via Reciprocal Rank Fusion",
        "Silent fact capture - UserPromptSubmit hook runs an 8-pattern regex extractor that promotes casual statements into first-class memories with provenance wiki-links",
        "Multi-brain support - separate vaults for separate projects, switch instantly via dropdown or MCP",
        "Knowledge graph view - force-directed layout with three automatic link types (semantic, entity, wikilink) plus opt-in PageRank node sizing",
        "Memory strength via Ebbinghaus decay - used facts stay strong, unused ones fade, contradictions get a recency penalty",
        "100% local - markdown files in your home directory, no telemetry, no cloud sync, no account",
        "MCP-native - connects to any MCP client (Claude Desktop, Claude Code, Cursor) with 18+ tools",
        "Cost: $0.55/year vs Mem0 Pro at $2,988/year (1k notes, comparable feature set)",
      ],
      sections: [
        {
          heading: "Why this is not RAG",
          body: "RAG is an answer-pipeline: question → chunk → embed → retrieve → stuff context → generate → repeat. The corpus is dead data. Contradictions are invisible. Provenance is a prayer. NeuroVault is a knowledge layer - it differs from RAG in five specific ways that map directly to what a living internal wiki needs.",
          bullets: [
            "Accumulates via Ebbinghaus strength decay + access reinforcement (RAG re-chunks)",
            "Structured with Karpathy's 3-layer raw/wiki/schema pattern (RAG is flat chunks)",
            "Three automatic link types: semantic similarity, shared entities, explicit wikilinks (RAG has none)",
            "Silent fact capture promotes casually-dropped facts with wiki-link provenance (RAG cites the chunk)",
            "Temporal fact tracking - when new facts contradict old, supersession + recency penalty stops pollution (RAG cannot challenge or update)",
          ],
        },
        {
          heading: "Performance benchmarks",
          body: "All numbers are reproducible locally. Run cd server && uv run python ../benchmarks/run_recall.py to verify. The benchmark uses 25 hand-crafted notes and 25 queries (5 easy, 10 medium, 10 hard).",
          bullets: [
            "Hybrid retrieval: 92% Top-1, 96% Top-3 hit, 0.94 MRR, 73ms median latency",
            "With cross-encoder rerank: 92% Top-1, 100% Top-3, 0.96 MRR, 133ms latency",
            "Hard queries (no keyword overlap): 9/10 top-1 without reranker",
            "Embed a note: ~20ms · Full vault ingest (25 notes): ~4s cold start",
            "Tokens per answer: ~275 flat regardless of vault size (paste-whole-vault baseline: 93k+ growing linearly)",
          ],
        },
        {
          heading: "The silent fact-capture pipeline",
          body: "The killer feature: drop a fact in conversation and NeuroVault picks it up without you saying \"remember this.\" A UserPromptSubmit lifecycle hook pipes every prompt through a regex extractor that recognizes 8 patterns: preferences, decisions, stack choices, deadlines, identity, anti-preferences, deployment targets, and explicit \"remember that...\" callouts. End-to-end bench: 80% Hit@1, 100% Hit@3 on 15 paraphrased questions that never use original wording.",
        },
        {
          heading: "Tech stack rationale",
          body: "Each layer was chosen for local-first guarantees: Tauri 2 over Electron (~30MB vs ~200MB installed), Rust backend in-process (no Python sidecar at boot), sqlite-vec for KNN in pure SQL (no separate vector DB), fastembed-rs for ONNX-quantized embeddings (no API keys, no internet), MCP as the agent contract (works with Claude Desktop, Claude Code, Cursor, any MCP-speaking client).",
        },
      ],
      apiEndpoints: [
        { method: "POST", path: "recall", description: "Hybrid search: semantic + BM25 + graph fused via RRF (optional cross-encoder rerank)" },
        { method: "POST", path: "recall_chunks", description: "Same retrieval but returns matching paragraphs (cheaper)" },
        { method: "POST", path: "remember", description: "Save a memory - triggers chunk + embed + entity extract + graph link" },
        { method: "POST", path: "related", description: "Direct neighbours of an engram via the graph (~50x cheaper than fresh recall)" },
        { method: "POST", path: "session_start", description: "Wake-up tool - brain stats + L0 identity + top memories + open todos" },
        { method: "POST", path: "core_memory_set", description: "Persona-style always-included blocks (Letta pattern)" },
        { method: "POST", path: "list_brains", description: "Multi-brain navigation - separate memory spaces" },
        { method: "POST", path: "switch_brain", description: "Switch active brain instantly without restart" },
        { method: "POST", path: "create_brain", description: "Create new memory space for a separate project/context" },
        { method: "POST", path: "check_duplicate", description: "Pure cosine pre-check before remember() to avoid duplicate storage" },
        { method: "POST", path: "list_unnamed_clusters", description: "Agent-driven cluster naming for the graph view's Analytics mode" },
        { method: "POST", path: "add_todo", description: "Multi-agent coordination via append-only todos.jsonl" },
      ],
    },
  },
  {
    id: "aegis",
    slug: "aegis",
    title: "AEGIS",
    subtitle: "Maritime Shipping Risk Intelligence Platform",
    description:
      "A data engineering platform aggregating maritime intelligence from 7+ sources across 4 database technologies, with LLM-powered CrewAI agents for risk assessment, route planning, and trade compliance.",
    techStack: [
      "FastAPI",
      "React 19",
      "CrewAI",
      "PostgreSQL/PostGIS",
      "MongoDB",
      "Neo4j",
      "ChromaDB",
      "Docker",
      "Groq/LiteLLM",
      "sentence-transformers",
      "deck.gl",
      "react-globe.gl",
    ],
    mediaUrl: "/images/projects/aegis.png",
    mediaType: "image",
    heroMediaUrl: "/images/projects/heroes/aegis-hero.svg",
    featured: true,
    category: "ai",
    gridSpan: "large",
    detailContent: {
      overview:
        "AEGIS (Automated Environmental & Geopolitical Intelligence for Shipping) is a production-grade data engineering platform that aggregates maritime intelligence from multiple sources, stores it across four database technologies, and exposes it to LLM-powered agents for intelligent decision making. The system monitors shipping risks, calculates optimal routes, checks trade compliance, and provides real-time analysis through a React dashboard with 3D globe visualization.",
      architectureDiagram: `                    +------------------+
                    |  React Frontend  |
                    |  (Vite + deck.gl)|
                    +--------+---------+
                             |
                             | REST / SSE
                             v
                    +------------------+
                    |   FastAPI (8080) |
                    |   7 API routes   |
                    +--------+---------+
                             |
          +------------------+------------------+
          |                  |                  |
 +--------v-------+ +-------v-------+ +--------v--------+
 | CrewAI Agents  | | MCP Server    | | RAG Pipeline    |
 | 3 agents       | | 9 tools       | | sentence-       |
 | 9 tools        | | 2 resources   | | transformers    |
 +--------+-------+ +-------+-------+ +--------+--------+
          |                  |                  |
 +--------v------------------v------------------v--------+
 |                    Data Layer                          |
 |  PostgreSQL/PostGIS | MongoDB | Neo4j | ChromaDB      |
 +-------------------------------------------------------+`,
      keyFeatures: [
        "Polyglot persistence across 4 database technologies, each optimized for its domain",
        "3 specialized CrewAI agents with 9 tool functions for maritime intelligence",
        "SSE streaming for real-time tool call progress and agent reasoning visibility",
        "Dynamic confidence scoring (0.05\u20130.99) based on tool success, data freshness, and coverage",
        "Hallucination checking \u2014 numeric claims verified against tool outputs with 5% tolerance",
        "W3C PROV-inspired data lineage tracking across all ingestion steps",
        "16,559 ports indexed from UN/LOCODE with full geospatial metadata",
        "RAG pipeline with sentence-transformers + ChromaDB for semantic news search",
      ],
      sections: [
        {
          heading: "Agent System",
          body: "Three specialized CrewAI agents orchestrate tool-based reasoning with full execution tracing persisted to MongoDB. The system uses intent detection for automatic tool selection and supports both JSON and SSE streaming responses.",
          bullets: [
            "Maritime Disruption Analyst \u2014 monitors news, weather, chokepoints, and risk zones",
            "Maritime Route Planner \u2014 calculates routes, assesses risks, compares alternatives",
            "Trade Compliance Officer \u2014 checks tariffs, sanctions screening (local-only), currency conversion",
          ],
        },
        {
          heading: "Data Ingestion Pipeline",
          body: "A 7-step automated pipeline ingests data from diverse sources into the polyglot database layer. Each step is tracked with W3C PROV-inspired lineage recording, stored in both an append-only JSONL audit trail and a PostgreSQL data_lineage table.",
          bullets: [
            "UN/LOCODE port data \u2192 PostgreSQL (16,559 ports)",
            "Maritime RSS feeds (8 sources) \u2192 MongoDB (92+ articles)",
            "Open-Meteo Marine API \u2192 MongoDB (20 waypoints)",
            "OFAC SDN sanctions list \u2192 PostgreSQL (10,000+ entities)",
            "UK Trade Tariff API \u2192 PostgreSQL (40 HS codes)",
            "Frankfurter API (ECB) \u2192 MongoDB (17 currencies)",
            "Neo4j seed data \u2192 knowledge graph (30 countries, 47 ports, 25 routes)",
          ],
        },
        {
          heading: "Security & Privacy",
          body: "The system is designed with data privacy as a first-class concern. Sanctions screening uses a local database only \u2014 no sensitive data is sent to external LLMs. The platform supports running with a local LLM via Ollama for zero data exfiltration scenarios.",
        },
      ],
      dataSources: [
        { name: "UN/LOCODE", type: "CSV download", details: "16,559 ports" },
        {
          name: "Maritime RSS feeds",
          type: "Web scraping",
          details: "92+ articles from 8 sources",
        },
        {
          name: "Open-Meteo Marine API",
          type: "REST API",
          details: "20 waypoints",
        },
        {
          name: "UK Trade Tariff API",
          type: "REST API",
          details: "40 HS codes",
        },
        {
          name: "OFAC SDN List",
          type: "Bulk download",
          details: "10,000+ entities",
        },
        {
          name: "Frankfurter API (ECB)",
          type: "REST API",
          details: "17 currencies",
        },
        {
          name: "Neo4j seed data",
          type: "Manual curation",
          details: "30 countries, 47 ports, 25 routes",
        },
      ],
      apiEndpoints: [
        { method: "GET", path: "/api/health", description: "Service health check" },
        {
          method: "GET",
          path: "/api/ports",
          description: "List/search ports (16,559 worldwide)",
        },
        {
          method: "GET",
          path: "/api/ports/{unlocode}",
          description: "Get port details by UNLOCODE",
        },
        {
          method: "GET",
          path: "/api/routes",
          description: "Calculate maritime route (searoute/Dijkstra)",
        },
        {
          method: "GET",
          path: "/api/risk/zones",
          description: "List active risk zones",
        },
        {
          method: "GET",
          path: "/api/risk/score",
          description: "Composite risk score for a route",
        },
        {
          method: "GET",
          path: "/api/risk/chokepoints",
          description: "Chokepoint status (10 major straits/canals)",
        },
        {
          method: "GET",
          path: "/api/tariffs",
          description: "HS code tariff lookup",
        },
        {
          method: "GET",
          path: "/api/disruptions",
          description: "Active maritime disruptions",
        },
        {
          method: "GET",
          path: "/api/viz/*",
          description: "Pre-formatted visualization data",
        },
        {
          method: "POST",
          path: "/api/agent/query",
          description: "AI agent query (JSON response)",
        },
        {
          method: "POST",
          path: "/api/agent/stream",
          description: "AI agent query (SSE streaming)",
        },
      ],
    },
  },
  {
    id: "london-synergy",
    slug: "london-synergy-index",
    title: "London Synergy Index",
    subtitle: "Predictive Site Selection",
    description:
      "Architected an end-to-end geospatial pipeline for 55,000 H3 hexagons, integrating LandScan satellite rasters, ONS Census data, and OSM POIs enriched with graph-centrality and competition-density features. Modeled underserved retail locations using spatially cross-validated XGBoost classifiers; applied Burt\u2019s Structural Hole Theory to identify market gaps.",
    techStack: ["Python", "XGBoost", "H3", "NetworkX", "Streamlit", "Pydeck"],
    mediaUrl: "/images/projects/london-synergy.svg",
    mediaType: "image",
    heroMediaUrl: "/images/projects/heroes/london-synergy-hero.svg",
    githubUrl: "https://github.com/sirdath",
    liveUrl: "https://geospatialondon.dathproject.com",
    featured: true,
    category: "geospatial",
    gridSpan: "large",
    detailContent: {
      overview:
        "The London Synergy Index is a geospatial intelligence platform that identifies underserved retail locations across Greater London. By tessellating the city into 55,000 H3 hexagons and enriching each with satellite-derived population data, census demographics, and POI density features, the system builds a comprehensive spatial understanding of commercial opportunity. A spatially cross-validated XGBoost classifier then scores each hexagon for investment potential.",
      keyFeatures: [
        "55,000 H3 hexagons tessellating Greater London at resolution 8",
        "LandScan satellite raster integration for population density estimation",
        "ONS Census 2021 data fusion for demographic profiling per hexagon",
        "OSM POI extraction with graph-centrality scoring via NetworkX",
        "Burt\u2019s Structural Hole Theory applied to identify market gaps in retail networks",
        "Spatially cross-validated XGBoost to prevent spatial autocorrelation leakage",
        "Interactive Streamlit dashboard with Pydeck 3D hexagon visualization",
      ],
      sections: [
        {
          heading: "Spatial Feature Engineering",
          body: "Each H3 hexagon is enriched with multi-source features: LandScan satellite rasters provide population estimates, ONS Census data adds demographic dimensions (income, age, employment), and OpenStreetMap POIs are processed through a NetworkX graph to compute centrality and competition-density metrics. These features are combined into a unified feature matrix for modeling.",
        },
        {
          heading: "Modeling Approach",
          body: "The classification pipeline uses XGBoost with spatial cross-validation \u2014 a critical design decision that prevents spatial autocorrelation from inflating model performance. Traditional k-fold CV would leak spatial information between folds; spatial CV ensures train/test splits respect geographic boundaries, producing realistic accuracy estimates.",
        },
        {
          heading: "Structural Hole Analysis",
          body: "Burt\u2019s Structural Hole Theory from network science is adapted to identify gaps in London\u2019s retail network. By modeling retail locations as nodes in a spatial graph, the system detects areas where new businesses could bridge disconnected clusters \u2014 these structural holes represent high-potential investment opportunities.",
        },
      ],
    },
  },
  {
    id: "housing-crime",
    slug: "housing-crime-analysis",
    title: "London Housing & Crime",
    subtitle: "Geospatial Analysis",
    description:
      "Developed a Spatio-Temporal pipeline merging 1M+ records to engineer a predictive \u2018Opportunity Index,\u2019 transforming raw crime and housing data into an actionable investment strategy. Optimized an XGBoost regressor via Optuna, achieving an R\u00B2 of 0.92.",
    techStack: ["Python", "Scikit-learn", "XGBoost", "Optuna", "Pandas"],
    mediaUrl: "/images/projects/housing-crime.svg",
    mediaType: "image",
    heroMediaUrl: "/images/projects/heroes/housing-crime-hero.svg",
    githubUrl: "https://github.com/sirdath",
    featured: true,
    category: "geospatial",
    gridSpan: "tall",
    detailContent: {
      overview:
        "This project merges over 1 million records from London\u2019s housing market and metropolitan police crime data to construct a predictive Opportunity Index \u2014 a composite score that identifies neighborhoods where property values are likely underpriced relative to their safety trajectory. An Optuna-optimized XGBoost regressor achieves R\u00B2 = 0.92 on held-out test data.",
      keyFeatures: [
        "1M+ records merged across housing transactions and crime incidents",
        "Custom \u2018Opportunity Index\u2019 combining price trends, crime trajectories, and spatial features",
        "Optuna hyperparameter optimization for XGBoost (R\u00B2 = 0.92)",
        "Temporal feature engineering: rolling crime rates, seasonal decomposition, price velocity",
        "Spatial join pipeline linking crime hotspots to LSOA-level housing data",
        "Actionable investment strategy output with ranked neighborhood recommendations",
      ],
      sections: [
        {
          heading: "Data Pipeline",
          body: "The pipeline ingests Land Registry price-paid data and Met Police crime records, performs spatial joins at the LSOA (Lower Layer Super Output Area) level, and engineers temporal features including rolling crime rates, seasonal decomposition, and price velocity indicators. Missing data is handled through spatial interpolation rather than simple imputation.",
        },
        {
          heading: "Opportunity Index",
          body: "The Opportunity Index is a composite metric that identifies neighborhoods where crime rates are declining faster than property prices are rising. This gap represents an investment window \u2014 areas becoming safer but not yet repriced by the market. The index combines normalized crime trajectory, price momentum, transport accessibility, and green space proximity.",
        },
        {
          heading: "Model Optimization",
          body: "Optuna\u2019s TPE (Tree-structured Parzen Estimator) sampler explores the XGBoost hyperparameter space across 200 trials, optimizing max_depth, learning_rate, subsample, colsample_bytree, and regularization terms. The final model achieves R\u00B2 = 0.92 with strong generalization verified through temporal train-test splits (training on historical data, testing on recent transactions).",
        },
      ],
    },
  },
  {
    id: "risk-terrain",
    slug: "risk-terrain",
    title: "RiskTerrain",
    subtitle: "S&P 500 Risk Intelligence",
    description:
      "Engineered a 6-node LangGraph pipeline that ingests live geopolitical events (USGS, NewsAPI), performs multi-hop supply chain graph traversal across 154 companies in SurrealDB, and scores cascading risk exposure in under 8 seconds. Implemented hybrid graph-vector retrieval with sentence-transformer embeddings.",
    techStack: ["Python", "LangGraph", "SurrealDB", "Three.js", "Docker"],
    mediaUrl: "/images/projects/risk-terrain.svg",
    mediaType: "image",
    heroMediaUrl: "/images/projects/heroes/risk-terrain-hero.svg",
    githubUrl: "https://github.com/sirdath",
    featured: true,
    category: "ai",
    gridSpan: "wide",
    detailContent: {
      overview:
        "RiskTerrain is an AI-powered risk intelligence platform that maps how geopolitical disruptions cascade through S&P 500 supply chains. A 6-node LangGraph pipeline ingests real-time events from USGS earthquake feeds and NewsAPI, traverses a supply chain knowledge graph of 154 companies stored in SurrealDB, and scores cascading risk exposure \u2014 all in under 8 seconds. The frontend renders an interactive 3D risk terrain using Three.js.",
      keyFeatures: [
        "6-node LangGraph pipeline for event ingestion, classification, and risk scoring",
        "154 S&P 500 companies modeled as a supply chain knowledge graph in SurrealDB",
        "Multi-hop graph traversal to trace cascading risk through supplier networks",
        "Hybrid graph-vector retrieval combining structural queries with semantic search",
        "sentence-transformer embeddings for event-to-company relevance matching",
        "Sub-8-second end-to-end latency from event ingestion to risk score output",
        "3D risk terrain visualization built with Three.js",
      ],
      sections: [
        {
          heading: "LangGraph Pipeline",
          body: "The pipeline consists of 6 sequential nodes: event ingestion (USGS + NewsAPI), event classification (type, severity, region), entity extraction (affected companies/regions), graph traversal (multi-hop supply chain propagation), risk scoring (weighted by proximity, dependency strength, and event severity), and output formatting. Each node is independently testable and the pipeline supports both batch and streaming modes.",
        },
        {
          heading: "Supply Chain Graph",
          body: "SurrealDB stores a multi-relational graph of 154 S&P 500 companies with edges representing supplier, customer, and competitor relationships. The graph includes geographic metadata enabling region-based traversal \u2014 when an earthquake hits Taiwan, the system traces semiconductor supply chains to identify exposed companies across multiple hops.",
        },
        {
          heading: "Hybrid Retrieval",
          body: "The system combines structural graph queries (\"find all companies within 2 hops of affected suppliers\") with semantic vector search (\"find companies whose business descriptions are relevant to this event type\"). This hybrid approach catches both direct supply chain exposure and indirect thematic risk that pure graph traversal would miss.",
        },
      ],
    },
  },
  {
    id: "data-engineering",
    slug: "data-engineering-pipeline",
    title: "Data Engineering Pipeline",
    subtitle: "Star Schema Lakehouse",
    description:
      "Architected a centralized Star Schema Lakehouse to unify semi-structured NoSQL and CSV datasets; utilized PyMongo and Pandas to flatten nested JSON and engineer derived geographical dimensions. Streamlined performance with columnar Parquet formats and DuckDB for high-speed SQL aggregations.",
    techStack: ["Python", "PySpark", "MongoDB", "DuckDB", "Parquet"],
    mediaUrl: "/images/projects/data-engineering.svg",
    mediaType: "image",
    heroMediaUrl: "/images/projects/heroes/data-engineering-hero.svg",
    githubUrl: "https://github.com/sirdath",
    featured: false,
    category: "data-engineering",
    gridSpan: "normal",
    detailContent: {
      overview:
        "A centralized Star Schema Lakehouse architecture that unifies disparate data sources \u2014 semi-structured MongoDB documents, CSV flat files, and nested JSON \u2014 into a clean, queryable analytical layer. The pipeline flattens nested structures, engineers derived geographical dimensions, and materializes everything as columnar Parquet files for high-speed aggregation via DuckDB.",
      keyFeatures: [
        "Star Schema design with fact and dimension tables for analytical workloads",
        "PyMongo extraction and flattening of deeply nested JSON documents",
        "Derived geographical dimensions engineered from raw coordinate data",
        "Columnar Parquet storage for 10\u201350x compression vs raw JSON",
        "DuckDB for in-process SQL aggregations with zero infrastructure overhead",
        "PySpark integration for distributed processing of larger datasets",
      ],
      sections: [
        {
          heading: "Schema Design",
          body: "The Star Schema centers on fact tables capturing transactional events, surrounded by dimension tables for geography, time, and entity attributes. This denormalized structure optimizes analytical queries by minimizing joins while maintaining referential integrity through surrogate keys.",
        },
        {
          heading: "ETL Pipeline",
          body: "The extraction layer pulls from MongoDB (via PyMongo) and CSV sources, applying schema inference and type coercion. The transformation layer flattens nested JSON structures, engineers geographical dimensions from coordinate data (reverse geocoding, region classification), and handles temporal features. The load phase writes to Parquet with Snappy compression, partitioned by date for efficient range queries.",
        },
      ],
    },
  },
  {
    id: "dataportfolio",
    slug: "dataportfolio",
    title: "Dataportfolio.co.uk",
    subtitle: "Full Stack SaaS Platform",
    description:
      "Launched a production-ready SaaS platform that automates portfolio creation for data professionals, featuring a \u2018coding-less\u2019 GUI to manage backend data persistence and dynamic metadata updates.",
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind"],
    mediaUrl: "/images/projects/dataportfolio.svg",
    mediaType: "image",
    heroMediaUrl: "/images/projects/heroes/dataportfolio-hero.svg",
    liveUrl: "https://dataportfolio.co.uk",
    featured: false,
    category: "fullstack",
    gridSpan: "normal",
    detailContent: {
      overview:
        "Dataportfolio is a production SaaS platform that enables data professionals to create polished portfolio websites without writing code. Users manage their projects, skills, and experience through an intuitive GUI, while the platform handles backend data persistence, dynamic metadata generation, and responsive deployment. Built with Next.js for server-side rendering and PostgreSQL for reliable data storage.",
      keyFeatures: [
        "No-code GUI for portfolio management \u2014 add projects, skills, and experience visually",
        "Dynamic metadata generation for SEO optimization per portfolio page",
        "PostgreSQL-backed data persistence with real-time preview",
        "Responsive design system built on Tailwind CSS",
        "Production-deployed on custom domain with SSL",
      ],
      sections: [
        {
          heading: "Platform Architecture",
          body: "The platform uses Next.js for hybrid server-side and static rendering, providing fast initial page loads with dynamic content capabilities. The Node.js API layer handles CRUD operations against PostgreSQL, with optimistic UI updates for a responsive editing experience. Tailwind CSS powers a consistent design system across all generated portfolio pages.",
        },
        {
          heading: "User Experience",
          body: "The \u2018coding-less\u2019 approach means users interact with form-based editors and drag-and-drop interfaces rather than code. Changes are previewed in real-time before publishing, and the platform generates SEO-friendly metadata (Open Graph tags, structured data) automatically from the user\u2019s content.",
        },
      ],
    },
  },
  {
    id: "datascrub",
    slug: "datascrub",
    title: "DataScrub",
    subtitle: "AI-powered data cleaning agent",
    description:
      "A privacy-first browser-based data cleaning tool that combines rule-based automation with LLM insights. Upload raw datasets, fix common inconsistencies automatically, and use an AI agent for advanced profiling and cleaning. Runs entirely client-side with optional Local (Ollama) or Cloud (Groq, OpenAI, OpenRouter) inference.",
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript ES6+",
      "PapaParse",
      "SheetJS",
      "Ollama",
      "Groq",
      "OpenAI",
    ],
    mediaUrl: "/images/projects/datascrub.svg",
    mediaType: "image",
    heroMediaUrl: "/images/projects/heroes/datascrub-hero.svg",
    featured: true,
    category: "ai",
    gridSpan: "wide",
    detailContent: {
      overview:
        "DataScrub is a client-side data cleaning utility that pairs deterministic rule-based automation with optional LLM intelligence. The whole application runs in the browser as a single self-contained static file - no backend, no server, no data ever leaves your machine in Local Mode. Users can upload raw datasets, automatically rectify common inconsistencies (whitespace, missing-value indicators, duplicates), and engage an AI agent for advanced profiling, imputation suggestions, and outlier handling. Multi-provider support (Ollama for local privacy-first inference, Groq for low-latency cloud, OpenAI/OpenRouter for frontier reasoning) means it adapts to whatever environment a data scientist needs.",
      keyFeatures: [
        "Automatic cleaning: whitespace trimming, standardized missing-value indicators (NULL/N/A/None/-), exact duplicate removal",
        "Statistical imputation suggestions (mean, median, mode) for missing values",
        "Outlier detection via Interquartile Range (IQR) method with capping or removal strategies",
        "Context-aware AI processing - users define domain rules to guide the agent's decisions",
        "Natural language interface for data interrogation and cleaning queries",
        "Multi-provider LLM support: Ollama (local), Groq (low-latency), OpenAI/OpenRouter (frontier models)",
        "Privacy-first architecture - browser-only execution, no DataScrub servers, API keys stored locally",
        "Full undo/redo history stack with version control for safe data manipulation",
        "Nine professional color themes plus resizable workspace and control panel",
      ],
      sections: [
        {
          heading: "Privacy-first by design",
          body: "DataScrub is architected as a pure client-side application. In Local Mode (Ollama), data processing happens entirely on the user's device and no data crosses the network. In Cloud Mode (third-party APIs), only necessary snippets - schema, summaries, or specific queries - are transmitted to the chosen provider for processing. API keys live in the browser's localStorage for convenience and can be cleared at any time. The application has no telemetry and no server backend.",
        },
        {
          heading: "Local inference with Ollama",
          body: "For sensitive data, DataScrub recommends running a local LLM via Ollama. After installing Ollama and pulling a model (qwen2.5:7b, llama3.1:8b, mistral, or gemma2), users configure CORS and connect DataScrub to the local Ollama endpoint. From that moment forward, no internet connection is required and no data leaves the machine.",
          bullets: [
            "Install Ollama from the official site",
            "Run: ollama pull qwen2.5:7b",
            "Configure CORS: OLLAMA_ORIGINS=\"*\" ollama serve",
            "Select Ollama in DataScrub settings",
          ],
        },
        {
          heading: "AI agent capabilities",
          body: "Beyond rule-based automation, the AI agent layer offers deeper analytical assistance. It can profile a dataset's structure, suggest column-by-column imputation strategies based on data type and distribution, flag outliers with statistical justification, and respond to natural language queries about the data. Users can supply project-specific context (e.g., \"this is healthcare data, prefer median imputation for age\") so the agent's recommendations align with domain rules.",
        },
        {
          heading: "Self-contained deployment",
          body: "DataScrub ships as a single self-contained set of static files. No build step, no server, no database. Users can run it by opening index.html directly, or fork the repo to host on any static-page provider (GitHub Pages, Cloudflare Pages, Netlify, etc). The whole project is MIT licensed for personal or commercial use.",
        },
      ],
    },
  },
  {
    id: "megagym",
    slug: "megagym",
    title: "MegaGym",
    subtitle: "Premium Greek fitness brand pitch site",
    description:
      "A full bilingual website pitch for MegaGym, one of Greece's largest gym chains (7 Athens locations, 15,000+ members, est. 1993). Vanilla HTML/CSS/JS with sophisticated interactive features: Leaflet locations finder with bidirectional card-to-pin linking, runtime EL/EN language switching, equipment carousel with peek cards, scroll-driven parallax hero, and a custom branded cursor.",
    techStack: [
      "HTML5",
      "CSS3",
      "Vanilla JS",
      "Leaflet.js",
      "Custom i18n",
      "Intersection Observer",
      "Schema.org",
      "GitHub Pages",
    ],
    mediaUrl: "/images/projects/megagym.svg",
    mediaType: "image",
    heroMediaUrl: "/images/projects/heroes/megagym-hero.svg",
    liveUrl: "https://megagym.dathproject.com",
    featured: true,
    category: "fullstack",
    gridSpan: "large",
    detailContent: {
      overview:
        "MegaGym is a pitch website for one of Greece's largest premium fitness chains: 7 Athens-area clubs, 15,000+ active members, three decades in business since 1993. The brief was a polished, bilingual marketing site that conveys premium positioning while staying fast and dependency-free. Built with zero frameworks (vanilla HTML/CSS/JS) but engineered with real attention to detail: an interactive Leaflet locations finder with bidirectional card-to-pin linking, runtime Greek/English language switching with localStorage persistence, an equipment carousel with blurred peek cards, scroll-driven parallax hero, custom branded cursor, full dark mode, and a preloader gated by sessionStorage.",
      keyFeatures: [
        "Interactive locations finder: 7-card list + sticky Leaflet map with bidirectional hover/click linking and Google Maps directions",
        "Runtime EL/EN language switching with 150+ translation keys, localStorage persistence, and a custom event for JS-rendered content",
        "Equipment slideshow with peek cards (blurred prev/next, flip-X for symmetry, edge-fade gradient masks)",
        "Custom yellow-M-on-black branded cursor with hover-state pointer variant (desktop only)",
        "Hero parallax slideshow (4 images), pulsing 33-year heritage badge, marquee scroller of 7 location names",
        "Comprehensive dark mode (40+ scoped overrides), full schema.org markup (FAQPage + SportsActivityLocation)",
        "Layout-shift prevention: reserved scrollbar gutter, language-width compensation on nav CTA, non-breaking-space tuning",
        "AI-friendly llms.txt + llms-full.txt, structured data, OpenGraph meta tags",
      ],
      sections: [
        {
          heading: "8 pages, all in Greek",
          body: "All page filenames in Greek (gymnastiria, proponisi, pilates, dokimastiki, epikoinonia) reflecting the local market focus. Each specializes in one service while sharing navigation and footer.",
          bullets: [
            "Homepage: hero, services, locations finder, video tour, pricing, trainers, FAQ",
            "Locations directory: 7 gym exterior shots + Fitness Club vs EXCLUSIVE comparison",
            "Group Personal Training: TRX, MEGA ZONE, MEGA CAGE, SKILLMILL programs",
            "Personal Training & Transformation: 45-day and 90-day programs at EXCLUSIVE centers",
            "Pilates Studio: split intro, full equipment slideshow, accessories",
            "Trial booking + contact pages with translated forms and side-by-side map+list rebuild",
          ],
        },
        {
          heading: "Locations finder",
          body: "Side-by-side card list and Leaflet map (sticky on scroll, 600px each on desktop). Custom teardrop SVG pins (black body, yellow border, M-logo overlay) with HQ Kifissia distinguished by a larger size + permanent drop-shadow glow filter.",
          bullets: [
            "Hover a card: matching pin scales up and glows",
            "Hover a pin: matching card highlights and scrolls into view",
            "Click a pin: map flyTo + popup with address, phone, tags, and Google Maps directions",
            "Pop-ups translate live when language switches via custom mg:langchange event",
          ],
        },
        {
          heading: "Equipment carousel",
          body: "Pilates page features a 7-slide carousel with three visible at once: active in full focus, prev/next as blurred peek cards. Smooth 0.55s cubic-bezier transitions, staggered content fade-in, edge-fade gradients on container ::before/::after to hide cutoffs. The prev card is flipped on the X-axis for visual symmetry.",
        },
        {
          heading: "Attention to detail (the polish)",
          body: "Beyond the headline features, the build invests heavily in the small things that make a site feel premium.",
          bullets: [
            "overflow-y: scroll on html prevents layout shift between scrollable and non-scrollable pages",
            "min-width on nav CTA prevents reflow on language switch (Greek text is wider than English)",
            "Non-breaking spaces in translations keep brand phrases like '\u0396\u03a9\u0397 \u039c\u039f\u03a5' on one line",
            "display: inline-flex on Services dropdown maintains baseline alignment with sibling links",
            "Service card buttons use margin-top: auto so different content lengths still align",
            "Preloader gated to first-visit-per-session via sessionStorage (skip on internal navigation)",
            "Lazy-loaded images, semantic HTML, OpenGraph + Twitter card tags, custom 404 page",
          ],
        },
      ],
    },
  },
];

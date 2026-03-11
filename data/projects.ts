export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  mediaUrl: string;
  mediaType: "video" | "gif" | "image";
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: "geospatial" | "ml" | "data-engineering" | "fullstack" | "ai";
  gridSpan: "large" | "tall" | "wide" | "normal";
}

export const projects: Project[] = [
  {
    id: "london-synergy",
    slug: "london-synergy-index",
    title: "London Synergy Index",
    subtitle: "Predictive Site Selection",
    description:
      "Architected an end-to-end geospatial pipeline for 55,000 H3 hexagons, integrating LandScan satellite rasters, ONS Census data, and OSM POIs enriched with graph-centrality and competition-density features. Modeled underserved retail locations using spatially cross-validated XGBoost classifiers; applied Burt's Structural Hole Theory to identify market gaps.",
    techStack: ["Python", "XGBoost", "H3", "NetworkX", "Streamlit", "Pydeck"],
    mediaUrl: "/images/projects/london-synergy.svg",
    mediaType: "image",
    githubUrl: "https://github.com/daththeanalyst",
    featured: true,
    category: "geospatial",
    gridSpan: "large",
  },
  {
    id: "housing-crime",
    slug: "housing-crime-analysis",
    title: "London Housing & Crime",
    subtitle: "Geospatial Analysis",
    description:
      "Developed a Spatio-Temporal pipeline merging 1M+ records to engineer a predictive 'Opportunity Index,' transforming raw crime and housing data into an actionable investment strategy. Optimized an XGBoost regressor via Optuna, achieving an R\u00B2 of 0.92.",
    techStack: ["Python", "Scikit-learn", "XGBoost", "Optuna", "Pandas"],
    mediaUrl: "/images/projects/housing-crime.svg",
    mediaType: "image",
    githubUrl: "https://github.com/daththeanalyst",
    featured: true,
    category: "geospatial",
    gridSpan: "tall",
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
    githubUrl: "https://github.com/daththeanalyst",
    featured: true,
    category: "ai",
    gridSpan: "wide",
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
    githubUrl: "https://github.com/daththeanalyst",
    featured: false,
    category: "data-engineering",
    gridSpan: "normal",
  },
  {
    id: "dataportfolio",
    slug: "dataportfolio",
    title: "Dataportfolio.co.uk",
    subtitle: "Full Stack SaaS Platform",
    description:
      "Launched a production-ready SaaS platform that automates portfolio creation for data professionals, featuring a 'coding-less' GUI to manage backend data persistence and dynamic metadata updates.",
    techStack: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind"],
    mediaUrl: "/images/projects/dataportfolio.svg",
    mediaType: "image",
    liveUrl: "https://dataportfolio.co.uk",
    featured: false,
    category: "fullstack",
    gridSpan: "normal",
  },
];

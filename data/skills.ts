export interface Skill {
  name: string;
  category: "programming" | "ml" | "data-engineering" | "geospatial" | "tools";
}

export const skills: Skill[] = [
  // Programming
  { name: "Python", category: "programming" },
  { name: "SQL", category: "programming" },
  { name: "R", category: "programming" },
  { name: "JavaScript", category: "programming" },

  // ML
  { name: "XGBoost", category: "ml" },
  { name: "PyTorch", category: "ml" },
  { name: "TensorFlow", category: "ml" },
  { name: "Scikit-learn", category: "ml" },
  { name: "LangChain", category: "ml" },
  { name: "Ollama", category: "ml" },
  { name: "Optuna", category: "ml" },
  { name: "SHAP", category: "ml" },
  { name: "Graph Theory", category: "ml" },

  // Data Engineering
  { name: "AWS (S3, Glue, Athena)", category: "data-engineering" },
  { name: "Databricks", category: "data-engineering" },
  { name: "PySpark", category: "data-engineering" },
  { name: "Docker", category: "data-engineering" },
  { name: "Kubernetes", category: "data-engineering" },
  { name: "Git", category: "data-engineering" },
  { name: "DuckDB", category: "data-engineering" },
  { name: "Star Schema", category: "data-engineering" },

  // Geospatial
  { name: "H3 Indexing", category: "geospatial" },
  { name: "Pydeck", category: "geospatial" },
  { name: "LandScan Raster", category: "geospatial" },
  { name: "OSM Data", category: "geospatial" },
  { name: "Spatio-Temporal Analytics", category: "geospatial" },
  { name: "Graph Centrality", category: "geospatial" },

  // Tools
  { name: "LangGraph", category: "tools" },
  { name: "NetworkX", category: "tools" },
  { name: "Streamlit", category: "tools" },
  { name: "Pandas", category: "tools" },
  { name: "NumPy", category: "tools" },
  { name: "MongoDB", category: "tools" },
];

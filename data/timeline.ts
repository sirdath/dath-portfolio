export interface TimelineEvent {
  id: string;
  type: "experience" | "education";
  title: string;
  organization: string;
  date: string;
  description: string;
  skills?: string[];
}

export const timeline: TimelineEvent[] = [
  {
    id: "exp-2",
    type: "experience",
    title: "Geospatial Data Scientist",
    organization: "Intelmatix (Dissertation Placement), London",
    date: "Apr 2026 - Sep 2026",
    description:
      "Engineering a spatial network of 1M+ POIs using Python and NetworkX. Architecting serverless pipelines via AWS (S3, Glue, Athena) to automate processing of high-dimensional geospatial datasets at scale. Analyzing ecosystem-level insights using clustering and co-occurrence matrices.",
    skills: ["Python", "NetworkX", "AWS", "Clustering"],
  },
  {
    id: "edu-2",
    type: "education",
    title: "MSc Business Analytics",
    organization: "UCL School of Management, London",
    date: "Sep 2025 - Sep 2026",
    description:
      "Current Grade: 75% Distinction. Modules in Data Engineering (MLOps, Docker, AWS, Git, SQL), Operational Analytics, Machine Learning, and Predictive Analytics.",
  },
  {
    id: "exp-1",
    type: "experience",
    title: "Data Scientist",
    organization: "Globassure, Athens, Greece",
    date: "May 2024 - Aug 2024",
    description:
      "Built a data scraping pipeline to identify and extract potential client leads, securing 7 start-up businesses for employee insurance coverage. Cleaned and processed 120,000+ records, performed EDA, and surfaced actionable business insights.",
    skills: ["Python", "Pandas", "Web Scraping", "EDA"],
  },
  {
    id: "edu-1",
    type: "education",
    title: "BSc Business Management (Data Analytics)",
    organization: "Henley Business School, University of Reading",
    date: "Sep 2022 - Jun 2025",
    description:
      "First Class Honours. Modules in Data Analytics, Machine Learning Introduction, and Information Systems. Co-Founded the Data Analytics Society.",
  },
];

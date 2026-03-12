"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { getAssetPath } from "@/lib/assets";

interface SiteProject {
  name: string;
  description: string;
  url: string;
  tags: string[];
  image: string;
}

const sites: SiteProject[] = [
  {
    name: "Global Team Plans",
    description:
      "Employee Assistance Programme offering 24/7 mental health support and counselling across 180+ countries.",
    url: "https://globalteamplans.com/",
    tags: ["Corporate", "Healthcare", "Responsive"],
    image: "/images/frontend/global-team-plans.jpg",
  },
  {
    name: "TempSite",
    description:
      "AI-powered platform that generates professional websites for events, meetings, and proposals — customise and publish instantly.",
    url: "https://daththeanalyst.github.io/Tempsite/",
    tags: ["AI", "SaaS", "Full-Stack"],
    image: "/images/frontend/tempsite.jpg",
  },
  {
    name: "DataPortfolio",
    description:
      "Portfolio builder platform for data professionals to create and showcase their work with integrated analytics.",
    url: "https://dataportfolio.co.uk",
    tags: ["Platform", "Data", "Analytics"],
    image: "/images/frontend/dataportfolio.jpg",
  },
  {
    name: "GlassStudio",
    description:
      "Dependency-free visual website editor — edit CSS, HTML, layouts, effects, and typography in real time.",
    url: "https://daththeanalyst.github.io/website-html-css-js-editor/",
    tags: ["Developer Tool", "Editor", "No Dependencies"],
    image: "/images/frontend/glassstudio.jpg",
  },
  {
    name: "DataScrub",
    description:
      "AI-powered data cleaning agent that detects and fixes quality issues in CSV, Excel, and JSON files automatically.",
    url: "https://daththeanalyst.github.io/DataScrub/",
    tags: ["AI", "Data Tool", "Automation"],
    image: "/images/frontend/datascrub.jpg",
  },
  {
    name: "Michael Saffell Antiques",
    description:
      "Specialist antiques dealer in Bath offering vintage biscuit tins, tobacco cases, and decorative collectibles since 1975.",
    url: "https://daththeanalyst.github.io/michael-saffell-antiques/",
    tags: ["E-Commerce", "Small Business", "Bath"],
    image: "/images/frontend/michael-saffell.jpg",
  },
  {
    name: "Skoobs Books",
    description:
      "Second-hand bookshop in Bath's Guildhall Market — thousands of quality pre-loved paperbacks across every genre.",
    url: "https://daththeanalyst.github.io/skoobs-books/",
    tags: ["Retail", "Small Business", "Bath"],
    image: "/images/frontend/skoobs-books.jpg",
  },
  {
    name: "Dream of Olwen",
    description:
      "Exotic textiles and scarves — handpicked from artisan workshops across India, sold at Bath's Guildhall Market.",
    url: "https://daththeanalyst.github.io/dream-of-olwen/",
    tags: ["Retail", "Small Business", "Bath"],
    image: "/images/frontend/dream-of-olwen.jpg",
  },
  {
    name: "Halepi Restaurant",
    description:
      "Authentic Greek Cypriot family taverna bringing Mediterranean warmth to London since 1966.",
    url: "https://daththeanalyst.github.io/halepi-website-mock/",
    tags: ["Restaurant", "Hospitality", "London"],
    image: "/images/frontend/halepi.jpg",
  },
  {
    name: "LinkTree",
    description:
      "Custom-built link-in-bio page with a modern glassmorphism design for social and professional links.",
    url: "https://daththeanalyst.github.io/LinkTree/",
    tags: ["Personal", "Social", "Minimal"],
    image: "/images/frontend/linktree.jpg",
  },
];

export function FrontendShowcase() {
  return (
    <section
      id="frontend"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-magenta">
            Client & Personal Work
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Frontend Designs
          </h2>
          <motion.div
            className="mt-3 mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-accent-magenta to-accent-purple"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="mt-4 max-w-xl mx-auto text-text-muted text-sm sm:text-base">
            Websites designed and built for local businesses, startups, and
            personal tools — from restaurants to AI platforms.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sites.map((site, index) => (
            <motion.a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-accent-magenta/20 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.15)] transition-all duration-500 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {/* Screenshot */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={getAssetPath(site.image)}
                  alt={`${site.name} screenshot`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient fade at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void/80 to-transparent" />
                {/* Visit badge */}
                <div className="absolute top-3 right-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/50 backdrop-blur-sm border border-white/[0.1] text-text-primary">
                    Visit
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-5 flex flex-col">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-magenta group-hover:to-accent-purple transition-all duration-300">
                  {site.name}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed flex-1">
                  {site.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {site.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.03] border border-white/[0.05] text-text-dim group-hover:border-white/10 group-hover:text-text-muted transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

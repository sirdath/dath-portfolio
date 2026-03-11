"use client";

import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";

const certifications = [
  {
    title: "Mathematics for Machine Learning Specialisation",
    issuer: "Imperial College London",
  },
  {
    title: "Google Advanced Data Analytics",
    issuer: "Google",
  },
  {
    title: "Microsoft Power BI Desktop",
    issuer: "Microsoft",
  },
  {
    title: "IBM Data Analyst",
    issuer: "IBM",
  },
];

const extracurriculars = [
  {
    title: "Co-Founder & President, Data Analytics Society",
    description: "University of Reading (2023-2025). Led a student community, organizing technical workshops and industry networking events.",
  },
  {
    title: "Martial Arts & Fitness",
    description: "Karate Black Belt 1-dan, Kickboxing. Committed to personal growth through discipline, guided by Kaizen principles.",
  },
];

export function CertificationsSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 bg-void">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-accent-cyan" />
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-text-primary">
                Certifications
              </h2>
            </div>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-accent-cyan/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <h3 className="text-text-primary font-medium">{cert.title}</h3>
                    <p className="text-sm text-text-muted mt-1">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Extracurriculars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 text-accent-purple" />
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-text-primary">
                Beyond the Code
              </h2>
            </div>
            <div className="space-y-4">
              {extracurriculars.map((item) => (
                <div
                  key={item.title}
                  className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-accent-purple/20 transition-all duration-300"
                >
                  <h3 className="text-text-primary font-medium">{item.title}</h3>
                  <p className="text-sm text-text-muted mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

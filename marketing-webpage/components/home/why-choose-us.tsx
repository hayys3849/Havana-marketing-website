"use client";

import { motion } from "framer-motion";
import { Truck, Flower2, Gem, Headphones, Palette, Leaf } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { useLanguageStore } from "@/store/language-store";
import { getDictionary } from "@/i18n";

const features = [
  { key: "sameDay" as const, icon: Truck },
  { key: "freshness" as const, icon: Flower2 },
  { key: "premium" as const, icon: Gem },
  { key: "support" as const, icon: Headphones },
  { key: "personalized" as const, icon: Palette },
  { key: "eco" as const, icon: Leaf },
];

export function WhyChooseUs() {
  const locale = useLanguageStore((s) => s.locale);
  const t = getDictionary(locale);

  return (
    <section id="about" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader title={t.whyChooseUs.title} subtitle={t.whyChooseUs.subtitle} />

        {/* First 2 features — wide cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {features.slice(0, 2).map((feature, i) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 lg:p-10 hover:border-gold/30 transition-colors duration-300"
            >
              {/* Large decorative number */}
              <span className="absolute -top-4 -right-2 rtl:-left-2 rtl:right-auto font-serif text-[8rem] lg:text-[10rem] font-bold text-gold/[0.06] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-maroon/10 dark:bg-gold/10 transition-colors group-hover:bg-maroon/20 dark:group-hover:bg-gold/20">
                    <feature.icon className="h-7 w-7 text-maroon dark:text-gold" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-gold/20 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-3">
                  {t.whyChooseUs[feature.key].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {t.whyChooseUs[feature.key].description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Last 4 features — 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.slice(2).map((feature, i) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 2) * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 lg:p-8 hover:border-gold/30 transition-colors duration-300"
            >
              {/* Large decorative number */}
              <span className="absolute -top-4 -right-2 rtl:-left-2 rtl:right-auto font-serif text-[6rem] lg:text-[8rem] font-bold text-gold/[0.06] leading-none select-none pointer-events-none">
                {String(i + 3).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon/10 dark:bg-gold/10 transition-colors group-hover:bg-maroon/20 dark:group-hover:bg-gold/20">
                    <feature.icon className="h-6 w-6 text-maroon dark:text-gold" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-gold/20 tabular-nums">
                    {String(i + 3).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-lg lg:text-xl font-semibold text-foreground mb-2">
                  {t.whyChooseUs[feature.key].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {t.whyChooseUs[feature.key].description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
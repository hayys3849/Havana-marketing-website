"use client";

import { motion } from "framer-motion";
import { Download, Smartphone, MapPin, Tag, Heart, ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { useLanguageStore } from "@/store/language-store";
import { getDictionary } from "@/i18n";
import { APP_DOWNLOAD } from "@/lib/config";

const features = [
  { icon: Smartphone, titleKey: "feature1Title", descKey: "feature1Desc" },
  { icon: MapPin, titleKey: "feature2Title", descKey: "feature2Desc" },
  { icon: Tag, titleKey: "feature3Title", descKey: "feature3Desc" },
  { icon: Heart, titleKey: "feature4Title", descKey: "feature4Desc" },
] as const;

export default function DownloadPageClient() {
  const locale = useLanguageStore((s) => s.locale);
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon/5 via-transparent to-gold/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold mb-6">
                  <Download className="h-3.5 w-3.5" />
                  {t.download.badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
              >
                {t.download.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gold font-medium mb-6"
              >
                {t.download.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
              >
                {t.download.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                {/* Google Play Button */}
                <a
                  href={APP_DOWNLOAD.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-dark-bg hover:bg-dark-bg/90 dark:bg-white dark:hover:bg-white/90 px-6 py-3.5 text-white dark:text-dark-bg transition-colors shadow-lg hover:shadow-xl"
                >
                  <Play className="h-8 w-8" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider opacity-80">Get it on</div>
                    <div className="text-sm font-semibold -mt-0.5">{t.download.playStoreButton}</div>
                  </div>
                </a>

                {/* APK Direct Download Button */}
                {APP_DOWNLOAD.apkDirectUrl && (
                  <a
                    href={APP_DOWNLOAD.apkDirectUrl}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card hover:bg-muted px-6 py-3.5 text-foreground transition-colors shadow-sm"
                  >
                    <Download className="h-5 w-5" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">{t.download.apkButton}</div>
                      <div className="text-[10px] text-muted-foreground">{t.download.apkNote}</div>
                    </div>
                  </a>
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 text-xs text-muted-foreground"
              >
                {t.download.minVersion} · v{APP_DOWNLOAD.appVersion}
              </motion.p>
            </div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <div className="relative w-[280px] sm:w-[320px] lg:w-[360px]">
                {/* Phone frame */}
                <div className="relative rounded-[3rem] border-[8px] border-gray-800 dark:border-gray-700 bg-gray-800 shadow-2xl overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 dark:bg-gray-700 rounded-b-2xl z-10" />
                  {/* Screen content */}
                  <div className="aspect-[9/19.5] bg-gradient-to-br from-maroon via-maroon/80 to-gold/30 rounded-[2.5rem] overflow-hidden relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <span className="text-3xl font-serif font-bold text-white mb-2">HAVANA</span>
                      <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase mb-8">Flowers</span>
                      <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6">
                        <Download className="h-8 w-8 text-gold" />
                      </div>
                      <div className="space-y-2 w-full max-w-[200px]">
                        <div className="h-2 bg-white/20 rounded-full w-3/4 mx-auto" />
                        <div className="h-2 bg-white/20 rounded-full w-1/2 mx-auto" />
                        <div className="h-2 bg-white/20 rounded-full w-2/3 mx-auto" />
                      </div>
                      <div className="mt-8 bg-gold rounded-xl px-6 py-2.5 text-dark-bg text-xs font-semibold">
                        {t.download.playStoreButton}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-gold/10 rounded-[4rem] blur-2xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Use the App Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader title={t.download.whyAppTitle} subtitle={t.download.whyAppSubtitle} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-6 text-center hover:border-gold/30 transition-colors duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-maroon/10 dark:bg-gold/10 mx-auto mb-4 transition-colors group-hover:bg-maroon/20 dark:group-hover:bg-gold/20">
                  <feature.icon className="h-7 w-7 text-maroon dark:text-gold" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {t.download[feature.titleKey]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.download[feature.descKey]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-maroon" />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon via-maroon/90 to-gold/20" />
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/30" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold/30" />

        <div className="container mx-auto px-4 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t.download.ctaTitle}
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
              {t.download.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={APP_DOWNLOAD.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-gold hover:bg-gold-dark px-8 py-4 text-dark-bg font-semibold transition-colors shadow-lg"
              >
                <Play className="h-6 w-6" />
                {t.download.playStoreButton}
              </a>
              <Link href="/">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <ArrowLeft className="h-4 w-4" />
                  {t.download.backToHome}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
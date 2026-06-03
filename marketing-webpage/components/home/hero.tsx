"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/language-store";
import { getDictionary } from "@/i18n";

export function Hero() {
  const router = useRouter();
  const locale = useLanguageStore((s) => s.locale);
  const t = getDictionary(locale);

  const handleShopCollection = () => router.push("/download");
  const handleCustomOrders = () => router.push("/download");

  return (
    <section className="relative h-screen min-h-[700px] max-h-[1000px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero/hero-bg.png')" }} />
      <div className="absolute inset-0 bg-maroon/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/80" />
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/40" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold/40" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold/40" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold/40" />

      <div className="relative container mx-auto px-4 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-sm font-medium text-gold backdrop-blur-sm mb-6"
        >
          {t.hero.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="gold" size="xl" onClick={handleShopCollection}>
            {t.hero.shopCollection}
          </Button>
          <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10" onClick={handleCustomOrders}>
            {t.hero.customOrders}
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/50 uppercase tracking-widest">{t.hero.scroll}</span>
        <ChevronDown className="h-5 w-5 text-gold animate-bounce" />
      </motion.div>
    </section>
  );
}
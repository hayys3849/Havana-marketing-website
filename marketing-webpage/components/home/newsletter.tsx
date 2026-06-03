"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/shared/section-header";
import { useLanguageStore } from "@/store/language-store";
import { getDictionary } from "@/i18n";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const locale = useLanguageStore((s) => s.locale);
  const t = getDictionary(locale);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <SectionHeader title={t.newsletter.title} subtitle="" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-5 w-5" />
                <p className="font-medium">{t.newsletter.thankYou}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder={t.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" variant="gold" size="lg" className="gap-2">
                  <Send className="h-4 w-4" />
                  {t.newsletter.subscribe}
                </Button>
              </form>
            )}
            <p className="mt-4 text-xs text-muted-foreground">{t.newsletter.privacy}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
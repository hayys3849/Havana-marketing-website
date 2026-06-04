"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { useAppStrings } from "../hooks/use-app-strings";
import { useHavanaStore } from "../state/havana-store";

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToSignup: () => void;
}

export function LoginScreen({ onLoginSuccess, onNavigateToSignup }: LoginScreenProps) {
  const t = useAppStrings();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const signIn = useHavanaStore((s) => s.signIn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError(t.login_error_empty_fields);
      return;
    }
    setError("");
    signIn({ email: email.trim() });
    onLoginSuccess();
  };

  return (
    <AppShell className="max-w-md justify-center px-6 py-14 md:mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[var(--havana-maroon)]/10 text-3xl dark:bg-[var(--havana-gold)]/10">
          🌸
        </div>
        <h1 className="mt-4 font-serif text-3xl font-bold havana-primary">{t.login_brand}</h1>
        <p className="text-sm text-[var(--havana-text-muted)]">{t.login_tagline}</p>
      </div>
      <h2 className="mt-12 text-2xl font-semibold">{t.login_welcome}</h2>
      <p className="mt-1 text-sm text-[var(--havana-text-muted)]">{t.login_subtitle}</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">{t.login_email_label}</label>
          <input
            className="havana-input"
            type="email"
            placeholder={t.login_email_placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{t.login_password_label}</label>
          <div className="relative">
            <input
              className="havana-input pr-10"
              type={showPassword ? "text" : "password"}
              placeholder={t.login_password_placeholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--havana-text-muted)]"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? t.login_hide_password : t.login_show_password}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-[var(--havana-error)]">{error}</p>}
        <button type="submit" className="havana-btn-primary w-full rounded-xl py-3 font-semibold">
          {t.login_button}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--havana-text-muted)]">
        {t.login_no_account}
        <button type="button" onClick={onNavigateToSignup} className="havana-primary font-medium underline">
          {t.login_signup_link}
        </button>
      </p>
    </AppShell>
  );
}

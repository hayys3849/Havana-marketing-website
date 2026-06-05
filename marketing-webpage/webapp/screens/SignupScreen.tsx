/**
 * Reserved for future authentication integration.
 * Not wired into the active /app navigation flow.
 */
"use client";

import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAppStrings } from "../hooks/use-app-strings";
import { useHavanaStore } from "../state/havana-store";

interface SignupScreenProps {
  onNavigateToLogin: () => void;
  onSignupSuccess: () => void;
}

export function SignupScreen({ onNavigateToLogin, onSignupSuccess }: SignupScreenProps) {
  const t = useAppStrings();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const signIn = useHavanaStore((s) => s.signIn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t.signup_error_name);
      return;
    }
    if (!email.includes("@")) {
      setError(t.signup_error_email);
      return;
    }
    if (password.length < 8) {
      setError(t.signup_error_password_length);
      return;
    }
    if (password !== confirm) {
      setError(t.signup_error_password_mismatch);
      return;
    }
    if (!phone.trim()) {
      setError(t.signup_error_phone);
      return;
    }
    setError("");
    signIn({ name, email, phone });
    onSignupSuccess();
  };

  return (
    <AppShell className="max-w-md md:mx-auto">
      <ScreenHeader title={t.signup_title} onBack={onNavigateToLogin} backLabel />
      <div className="px-6 pb-8">
        <p className="mt-1 text-sm text-[var(--havana-text-muted)]">{t.signup_subtitle}</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">{t.signup_name_label}</label>
            <input className="havana-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t.signup_email_label}</label>
            <input className="havana-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t.signup_phone_label}</label>
            <input className="havana-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t.signup_password_label}</label>
            <input className="havana-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t.signup_confirm_password_label}</label>
            <input className="havana-input" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          {error && <p className="text-sm text-[var(--havana-error)]">{error}</p>}
          <button type="submit" className="havana-btn-primary w-full rounded-xl py-3 font-semibold">
            {t.signup_button}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {t.signup_has_account}
          <button type="button" onClick={onNavigateToLogin} className="havana-primary font-medium underline">
            {t.signup_signin_link}
          </button>
        </p>
      </div>
    </AppShell>
  );
}

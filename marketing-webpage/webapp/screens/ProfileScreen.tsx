"use client";

import { useState } from "react";
import { Pencil, MapPin } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { useAppStrings } from "../hooks/use-app-strings";
import { profileLanguageLabel, profileLanguageSubtitle } from "../i18n";
import { useHavanaStore } from "../state/havana-store";
import type { EditableField, ThemeMode, UserProfile } from "../types";
import { profileDisplayName } from "../types";

interface ProfileScreenProps {
  onBackClick: () => void;
  onHomeClick: () => void;
  onCartClick: () => void;
  onOrdersClick: () => void;
  onLogoutClick: () => void;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="mb-2 mt-4 text-[11px] font-semibold tracking-wide text-[var(--havana-text-muted)]">
      {title}
    </p>
  );
}

function ProfileInfoRow({
  label,
  value,
  editable,
  onEdit,
  leadingIcon,
}: {
  label: string;
  value: string;
  editable?: boolean;
  onEdit?: () => void;
  leadingIcon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 px-3 py-3">
      {leadingIcon}
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[var(--havana-text-muted)]">{label}</p>
        <p className="mt-0.5 text-sm font-medium break-words">{value}</p>
      </div>
      {editable && onEdit && (
        <button type="button" onClick={onEdit} className="shrink-0 p-1 havana-primary" aria-label="Edit">
          <Pencil className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function FieldEditor({
  label,
  fields,
  onSave,
  onCancel,
  t,
}: {
  label: string;
  fields: { key: string; label: string; value: string; multiline?: boolean }[];
  onSave: (values: Record<string, string>) => void;
  onCancel: () => void;
  t: ReturnType<typeof useAppStrings>;
}) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.value])),
  );

  return (
    <div className="space-y-3 px-3 py-3">
      <p className="text-sm font-semibold">{label}</p>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="text-xs text-[var(--havana-text-muted)]">{f.label}</label>
          {f.multiline ? (
            <textarea
              className="havana-input mt-1 min-h-[80px]"
              value={values[f.key]}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            />
          ) : (
            <input
              className="havana-input mt-1"
              value={values[f.key]}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
            />
          )}
        </div>
      ))}
      <div className="flex gap-2">
        <button type="button" className="havana-btn-primary flex-1 rounded-lg py-2 text-sm font-semibold" onClick={() => onSave(values)}>
          {t.profile_save}
        </button>
        <button type="button" className="flex-1 rounded-lg border py-2 text-sm" onClick={onCancel}>
          {t.profile_cancel}
        </button>
      </div>
    </div>
  );
}

function ProfileHeader({ profile, t }: { profile: UserProfile; t: ReturnType<typeof useAppStrings> }) {
  const initial = (profile.firstName[0] ?? "?").toUpperCase();
  return (
    <div className="havana-card rounded-2xl bg-[var(--havana-maroon)]/[0.06] p-5 dark:bg-[var(--havana-gold)]/[0.06]">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full havana-btn-primary text-2xl font-bold">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-bold">{profileDisplayName(profile)}</p>
          <p className="text-[13px] text-[var(--havana-text-muted)]">{profile.email}</p>
          {profile.emailVerified && (
            <span className="mt-1 inline-block rounded-md bg-[var(--havana-success)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--havana-success)]">
              {t.profile_verified}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const THEME_OPTIONS: { mode: ThemeMode; labelEn: string; labelAr: string }[] = [
  { mode: "light", labelEn: "Light", labelAr: "فاتح" },
  { mode: "dark", labelEn: "Dark", labelAr: "داكن" },
  { mode: "system", labelEn: "System", labelAr: "النظام" },
];

export function ProfileScreen({
  onBackClick,
  onHomeClick,
  onCartClick,
  onOrdersClick,
  onLogoutClick,
}: ProfileScreenProps) {
  const t = useAppStrings();
  const profile = useHavanaStore((s) => s.profile);
  const updateProfile = useHavanaStore((s) => s.updateProfile);
  const themeMode = useHavanaStore((s) => s.themeMode);
  const setThemeMode = useHavanaStore((s) => s.setThemeMode);
  const locale = useHavanaStore((s) => s.locale);
  const toggleArabic = useHavanaStore((s) => s.toggleArabic);
  const isArabic = locale === "ar";

  const [editingField, setEditingField] = useState<EditableField | null>(null);

  const saveProfile = (values: Record<string, string>) => {
    if (editingField === "FULL_NAME") {
      updateProfile({ firstName: values.firstName, lastName: values.lastName });
    } else if (editingField === "CONTACT_NUMBER") {
      updateProfile({ phone: values.phone });
    } else if (editingField === "DELIVERY_ADDRESS") {
      updateProfile({ deliveryAddressFull: values.address || null });
    }
    setEditingField(null);
  };

  return (
    <AppShell
      withBottomNav
      className="pb-24 lg:pb-0"
      nav={{
        active: "profile",
        onHome: onHomeClick,
        onCart: onCartClick,
        onOrders: onOrdersClick,
        onProfile: () => {},
      }}
    >
      <ScreenHeader title={t.profile_title} onBack={onBackClick} />

      <div className="flex-1 px-4 pb-6 md:px-6">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
          <div>
            <ProfileHeader profile={profile} t={t} />

            <SectionHeader title={t.profile_section_personal} />
            <div className="havana-card overflow-hidden">
              {editingField === "FULL_NAME" ? (
                <FieldEditor
                  label={t.profile_full_name}
                  t={t}
                  fields={[
                    { key: "firstName", label: t.profile_first_name, value: profile.firstName },
                    { key: "lastName", label: t.profile_last_name, value: profile.lastName },
                  ]}
                  onSave={saveProfile}
                  onCancel={() => setEditingField(null)}
                />
              ) : (
                <ProfileInfoRow
                  label={t.profile_full_name}
                  value={profileDisplayName(profile)}
                  editable
                  onEdit={() => setEditingField("FULL_NAME")}
                />
              )}
              <hr className="havana-divider mx-3" />
              <ProfileInfoRow label={t.profile_email} value={profile.email} />
              <hr className="havana-divider mx-3" />
              {editingField === "CONTACT_NUMBER" ? (
                <FieldEditor
                  label={t.profile_contact}
                  t={t}
                  fields={[{ key: "phone", label: t.profile_phone_hint, value: profile.phone }]}
                  onSave={saveProfile}
                  onCancel={() => setEditingField(null)}
                />
              ) : (
                <ProfileInfoRow
                  label={t.profile_contact}
                  value={profile.phone}
                  editable
                  onEdit={() => setEditingField("CONTACT_NUMBER")}
                />
              )}
            </div>

            <SectionHeader title={t.profile_section_address} />
            <div className="havana-card overflow-hidden">
              {editingField === "DELIVERY_ADDRESS" ? (
                <FieldEditor
                  label={t.profile_address}
                  t={t}
                  fields={[
                    {
                      key: "address",
                      label: t.profile_address_hint,
                      value: profile.deliveryAddressFull ?? "",
                      multiline: true,
                    },
                  ]}
                  onSave={saveProfile}
                  onCancel={() => setEditingField(null)}
                />
              ) : (
                <ProfileInfoRow
                  label={t.profile_address}
                  value={profile.deliveryAddressFull ?? t.profile_address_not_set}
                  editable
                  onEdit={() => setEditingField("DELIVERY_ADDRESS")}
                  leadingIcon={<MapPin className="mt-1 h-[18px] w-[18px] havana-primary" />}
                />
              )}
            </div>
          </div>

          <div>
            <SectionHeader title={t.profile_section_preferences} />
            <div className="havana-card overflow-hidden">
              <div className="px-3 py-3">
                <p className="text-sm font-medium">{t.profile_dark_mode}</p>
                <p className="text-xs text-[var(--havana-text-muted)]">{t.profile_dark_mode_desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {THEME_OPTIONS.map((opt) => (
                    <button
                      key={opt.mode}
                      type="button"
                      onClick={() => setThemeMode(opt.mode)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                        themeMode === opt.mode
                          ? "havana-btn-primary"
                          : "border border-[var(--havana-text-muted)]/30"
                      }`}
                    >
                      {isArabic ? opt.labelAr : opt.labelEn}
                    </button>
                  ))}
                </div>
              </div>
              <hr className="havana-divider mx-3" />
              <label className="flex cursor-pointer items-center justify-between gap-3 px-3 py-3">
                <div>
                  <p className="text-sm font-medium">{profileLanguageLabel(t, isArabic)}</p>
                  <p className="text-xs text-[var(--havana-text-muted)]">
                    {profileLanguageSubtitle(t, isArabic)}
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-9 cursor-pointer accent-[var(--havana-maroon)] dark:accent-[var(--havana-gold)]"
                  checked={isArabic}
                  onChange={(e) => toggleArabic(e.target.checked)}
                  role="switch"
                  aria-checked={isArabic}
                />
              </label>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-xl border border-[var(--havana-error)]/50 py-3 text-[15px] font-semibold text-[var(--havana-error)]"
              onClick={onLogoutClick}
            >
              {t.profile_logout}
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

import type { ReactNode } from "react";
import { LICENSE_LABEL, type EntryDetail, type MediaAsset, type LocalizedString } from "../data/types.ts";
import { useLanguage } from "../context/LanguageContext.tsx";

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string | LocalizedString;
  title: string | LocalizedString;
  action?: ReactNode;
}) {
  const { locale, tData } = useLanguage();

  const eyebrowText = typeof eyebrow === "string" ? eyebrow : tData(eyebrow);
  const titleText = typeof title === "string" ? title : tData(title);

  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="text-eyebrow">{eyebrowText}</p>
        <h2
          className={`mt-1.5 text-2xl md:text-3xl font-medium text-foreground ${
            locale === "km" ? "font-khmer leading-snug" : "font-display"
          }`}
        >
          {titleText}
        </h2>
      </div>
      {action}
    </div>
  );
}

export function Badge({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "stone" | "crimson";
}) {
  const tones = {
    gold: "border-primary/40 text-primary",
    stone: "border-border text-muted-foreground",
    crimson: "border-crimson/60 text-foreground/80 bg-crimson/20",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function LicenseBadge({ asset }: { asset: MediaAsset }) {
  return (
    <span className="rounded-sm bg-background/80 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-primary backdrop-blur">
      {LICENSE_LABEL[asset.license]}
    </span>
  );
}

export interface EntryCardProps {
  key?: string | number;
  entry: EntryDetail;
  wide?: boolean;
  onSelect?: (slug: string) => void;
}

export function EntryCard({
  entry,
  wide = false,
  onSelect,
}: EntryCardProps) {
  const { locale, tData } = useLanguage();

  const title = tData(entry.title);
  const summary = tData(entry.summary);
  const era = tData(entry.era);

  return (
    <div
      onClick={() => onSelect?.(entry.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(entry.slug);
        }
      }}
      className={`surface-card group block overflow-hidden transition-transform duration-500 hover:-translate-y-1 cursor-pointer text-left ${
        wide ? "w-[264px] shrink-0" : ""
      }`}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={entry.coverMedia.url}
          alt={title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <LicenseBadge asset={entry.coverMedia} />
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-primary/80 font-medium">{era}</p>
        <h3
          className={`mt-1.5 text-lg leading-snug text-foreground font-medium ${
            locale === "km" ? "font-khmer" : ""
          }`}
        >
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
          {summary}
        </p>
      </div>
    </div>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-12">{children}</div>;
}

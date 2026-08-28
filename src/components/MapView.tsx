import { useState } from "react";
import { ArrowRight, Compass, Filter, MapPin, Sparkles } from "lucide-react";
import { Badge, Page, SectionHeading } from "./heritage.tsx";
import { sites, eras } from "../data/heritage.ts";
import type { HeritageSite } from "../data/types.ts";
import { useLanguage } from "../context/LanguageContext.tsx";

export function MapView({ onSelectEntry }: { onSelectEntry: (slug: string) => void }) {
  const { locale, tData, tNum, dict } = useLanguage();
  const [selectedSite, setSelectedSite] = useState<HeritageSite>(sites[0]);
  const [selectedEra, setSelectedEra] = useState<string>("all");
  const [unescoOnly, setUnescoOnly] = useState(false);

  const filteredSites = sites.filter((site) => {
    if (selectedEra !== "all" && site.era !== selectedEra) return false;
    if (unescoOnly && !site.unesco) return false;
    return true;
  });

  return (
    <Page>
      <SectionHeading
        eyebrow={dict.map.eyebrow}
        title={dict.map.title}
        action={
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="size-4 text-primary" />
            <span className={locale === "km" ? "font-khmer" : ""}>
              {tNum(filteredSites.length)} {dict.map.mappedCount}
            </span>
          </div>
        }
      />

      {/* Filter Bar */}
      <div className="surface-card p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mr-2">
            <Filter className="size-3.5" /> {dict.map.filterEra}
          </span>
          <button
            onClick={() => setSelectedEra("all")}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              selectedEra === "all"
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-secondary/70 text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className={locale === "km" ? "font-khmer" : ""}>{dict.map.allEras}</span>
          </button>
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                selectedEra === era.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-secondary/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={locale === "km" ? "font-khmer" : ""}>{tData(era.label)}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setUnescoOnly((v) => !v)}
          className={`px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-colors cursor-pointer border ${
            unescoOnly
              ? "border-primary bg-primary/15 text-primary font-medium"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="size-3.5" />
          <span className={locale === "km" ? "font-khmer" : ""}>{dict.map.unescoOnly}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Visual Map Stage */}
        <div className="lg:col-span-2 surface-card p-6 min-h-[460px] relative flex flex-col justify-between overflow-hidden">
          {/* Decorative Grid Lines representing Coordinates */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="size-4 text-primary animate-pulse" />
              <span className={locale === "km" ? "font-khmer" : ""}>{dict.map.coordinatesGrid}</span>
            </div>
            <span className={locale === "km" ? "font-khmer" : ""}>{tNum("10")}°N–{tNum("15")}°N · {tNum("102")}°E–{tNum("108")}°E</span>
          </div>

          {/* Coordinate Pins Scatter Canvas */}
          <div className="relative flex-1 my-6 min-h-[280px] flex items-center justify-center">
            {filteredSites.map((site) => {
              const isSelected = selectedSite.id === site.id;
              const top = 100 - ((site.coordinates.latitude - 11.2) / (14.6 - 11.2)) * 80 - 10;
              const left = ((site.coordinates.longitude - 102.8) / (105.5 - 102.8)) * 80 + 10;

              return (
                <div
                  key={site.id}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                >
                  <button
                    onClick={() => setSelectedSite(site)}
                    className={`relative p-2 rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground scale-125 shadow-lg shadow-primary/40 ring-4 ring-primary/20"
                        : "bg-secondary text-foreground hover:bg-primary/80 hover:text-primary-foreground"
                    }`}
                  >
                    <MapPin className="size-4" />
                    {site.unesco && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-background" />
                    )}
                  </button>

                  <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-background/90 text-foreground text-[10px] px-2 py-0.5 rounded shadow border border-border">
                    {tData(site.name)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 text-[11px] text-muted-foreground flex items-center justify-between pt-3 border-t border-border/60">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span className={locale === "km" ? "font-khmer" : ""}>{dict.map.unescoMonument}</span>
            </span>
            <span className={locale === "km" ? "font-khmer" : ""}>{dict.map.clickPinHint}</span>
          </div>
        </div>

        {/* Selected Site Details Panel */}
        <div className="surface-card p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge>{tData(selectedSite.province)} {dict.map.province}</Badge>
              {selectedSite.unesco && <Badge tone="crimson">UNESCO</Badge>}
            </div>

            <div>
              <h3
                className={`text-2xl font-medium text-foreground ${
                  locale === "km" ? "font-khmer" : "font-display"
                }`}
              >
                {tData(selectedSite.name)}
              </h3>
            </div>

            <div className="gold-rule" />

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">{dict.map.style}</span>
                <span className="text-foreground font-medium">{tData(selectedSite.style)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">{dict.map.status}</span>
                <span className="capitalize font-medium text-amber-300">
                  {selectedSite.condition.replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">{dict.map.latitude}</span>
                <span className="text-foreground font-mono">{tNum(selectedSite.coordinates.latitude.toFixed(4))}° N</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">{dict.map.longitude}</span>
                <span className="text-foreground font-mono">{tNum(selectedSite.coordinates.longitude.toFixed(4))}° E</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border/60">
            <button
              onClick={() => onSelectEntry(selectedSite.entrySlug)}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 px-4 text-xs font-medium text-primary-foreground hover:opacity-90 transition cursor-pointer shadow-md shadow-primary/20"
            >
              <span className={locale === "km" ? "font-khmer" : ""}>{dict.map.readDossier}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}

import { useState, useRef } from "react";
import { Music4, Volume2, Sparkles, Play, Square } from "lucide-react";
import { Badge, Page, SectionHeading } from "./heritage.tsx";
import { instruments } from "../data/heritage.ts";
import type { Instrument } from "../data/types.ts";
import { useLanguage } from "../context/LanguageContext.tsx";

export function SoundView({ onSelectEntry }: { onSelectEntry: (slug: string) => void }) {
  const { locale, tData, tNum, dict } = useLanguage();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeEnsemble, setActiveEnsemble] = useState<string>("All");
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = (inst: Instrument) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      setPlayingId(inst.id);

      inst.toneHz.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const famStr = inst.family.en.toLowerCase();

        if (famStr.includes("flute")) {
          osc.type = "sine";
        } else if (famStr.includes("lute") || famStr.includes("fiddle")) {
          osc.type = "sawtooth";
        } else if (famStr.includes("xylophone") || famStr.includes("gong")) {
          osc.type = "triangle";
        } else {
          osc.type = "sine";
        }

        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.22);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + index * 0.22);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + index * 0.22 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.22 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + index * 0.22);
        osc.stop(ctx.currentTime + index * 0.22 + 0.65);
      });

      setTimeout(() => {
        setPlayingId(null);
      }, inst.toneHz.length * 220 + 700);
    } catch (e) {
      console.warn("Web Audio playback note:", e);
      setPlayingId(null);
    }
  };

  const ensembles = [
    { id: "All", label: dict.sound.allEnsembles },
    { id: "Pinpeat", label: "Pinpeat" },
    { id: "Mohori", label: "Mohori" },
    { id: "Ayai", label: "Ayai" },
    { id: "Kar", label: "Kar" },
  ];

  const filteredInstruments =
    activeEnsemble === "All"
      ? instruments
      : instruments.filter((i) => i.ensemble === activeEnsemble);

  return (
    <Page>
      <SectionHeading
        eyebrow={dict.sound.eyebrow}
        title={dict.sound.title}
        action={
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Music4 className="size-4 text-primary" />
            <span>{dict.sound.subtitle}</span>
          </div>
        }
      />

      {/* Ensemble Category Filter */}
      <div className="surface-card p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted-foreground mr-2">
            {dict.sound.ensemble}
          </span>
          {ensembles.map((ens) => (
            <button
              key={ens.id}
              onClick={() => setActiveEnsemble(ens.id)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                activeEnsemble === ens.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-secondary/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className={locale === "km" ? "font-khmer" : ""}>{ens.label}</span>
            </button>
          ))}
        </div>

        <div className="text-xs text-stone-400 flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-amber-400" />
          <span className={locale === "km" ? "font-khmer" : ""}>{dict.sound.microtonalNote}</span>
        </div>
      </div>

      {/* Instruments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInstruments.map((inst) => {
          const isPlaying = playingId === inst.id;
          return (
            <div key={inst.id} className="surface-card p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3
                      className={`text-xl font-medium text-foreground ${
                        locale === "km" ? "font-khmer" : "font-display"
                      }`}
                    >
                      {tData(inst.name)}
                    </h3>
                  </div>
                  <Badge tone={inst.ensemble === "Pinpeat" ? "gold" : "stone"}>{inst.ensemble}</Badge>
                </div>

                <div className="gold-rule my-3" />

                <div className="text-xs space-y-1 text-muted-foreground">
                  <p>
                    <strong className="text-foreground/80">{dict.sound.family}</strong> {tData(inst.family)}
                  </p>
                  <p className="leading-relaxed pt-1">{tData(inst.origin)}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                <button
                  onClick={() => playTone(inst)}
                  disabled={isPlaying}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                    isPlaying
                      ? "bg-amber-400 text-stone-900 animate-pulse"
                      : "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Square className="size-3 fill-current" />
                      <span className={locale === "km" ? "font-khmer" : ""}>{dict.sound.resonating}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="size-3.5" />
                      <span className={locale === "km" ? "font-khmer" : ""}>{dict.sound.playTuning}</span>
                    </>
                  )}
                </button>

                <span className="text-[11px] text-muted-foreground font-mono">
                  {inst.toneHz.map((h) => `${tNum(Math.round(h))}Hz`).join(" · ")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Repertoire Dossier Link */}
      <div className="surface-card mt-8 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className={`text-lg font-medium text-foreground ${locale === "km" ? "font-khmer" : ""}`}>
            {dict.sound.orchestraTitle}
          </h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {dict.sound.orchestraDesc}
          </p>
        </div>
        <button
          onClick={() => onSelectEntry("pinpeat")}
          className="inline-flex items-center gap-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground border border-border px-5 py-2.5 text-xs font-medium transition cursor-pointer shrink-0"
        >
          <Play className="size-3.5" />
          <span className={locale === "km" ? "font-khmer" : ""}>{dict.sound.openArticle}</span>
        </button>
      </div>
    </Page>
  );
}

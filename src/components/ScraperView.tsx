import React, { useState } from "react";
import {
  Download,
  Search,
  Sparkles,
  CheckCircle2,
  Database,
  ShieldCheck,
  FileJson,
  ArrowRight,
  ExternalLink,
  Eye,
  RefreshCw,
  Layers,
  CheckSquare,
  Square,
  AlertCircle,
} from "lucide-react";
import {
  HeritageScraperService,
  ScrapedDataResult,
  BatchScrapeProgress,
  CURATED_BATCH_COLLECTIONS,
} from "../services/scraperService.ts";
import { EntryDetail } from "../data/types.ts";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useHeritageData } from "../context/HeritageDataContext.tsx";
import { SectionHeading, Badge } from "./heritage.tsx";

interface ScraperViewProps {
  onIngestEntry: (newEntry: EntryDetail) => void;
  onViewEntry: (slug: string) => void;
}

export function ScraperView({ onIngestEntry, onViewEntry }: ScraperViewProps) {
  const { locale } = useLanguage();
  const { ingestMultipleEntries, totalEntriesCount, resetToDefault } = useHeritageData();

  // Mode: Single scrape vs. Batch Ingestion
  const [activeMode, setActiveMode] = useState<"batch" | "single">("batch");

  // Single Scrape State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{ title: string; snippet: string; pageid: number }>>([]);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedResult, setScrapedResult] = useState<ScrapedDataResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("architecture");
  const [ingestedStatus, setIngestedStatus] = useState<string | null>(null);
  const [jsonTab, setJsonTab] = useState<"en" | "km">("en");

  // Batch Ingestion State
  const [selectedCollectionId, setSelectedCollectionId] = useState("angkor_monuments");
  const [selectedTopicList, setSelectedTopicList] = useState<string[]>(
    CURATED_BATCH_COLLECTIONS[0].topics
  );
  const [batchProgress, setBatchProgress] = useState<BatchScrapeProgress | null>(null);
  const [batchResults, setBatchResults] = useState<ScrapedDataResult[]>([]);
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [batchIngestedDone, setBatchIngestedDone] = useState(false);

  const activeCollection =
    CURATED_BATCH_COLLECTIONS.find((c) => c.id === selectedCollectionId) ||
    CURATED_BATCH_COLLECTIONS[0];

  const handleToggleTopic = (topic: string) => {
    if (selectedTopicList.includes(topic)) {
      setSelectedTopicList(selectedTopicList.filter((t) => t !== topic));
    } else {
      setSelectedTopicList([...selectedTopicList, topic]);
    }
  };

  const handleSelectAllTopics = () => {
    setSelectedTopicList(activeCollection.topics);
  };

  const handleDeselectAllTopics = () => {
    setSelectedTopicList([]);
  };

  const handleStartBatchScrape = async () => {
    if (selectedTopicList.length === 0) return;
    setIsBatchRunning(true);
    setBatchIngestedDone(false);
    setBatchResults([]);

    try {
      const { results } = await HeritageScraperService.scrapeBatch(
        selectedTopicList,
        activeCollection.category,
        (progress) => {
          setBatchProgress({ ...progress });
        }
      );
      setBatchResults(results);
    } catch (err: any) {
      alert(`Batch error: ${err?.message || "Batch scraping failed"}`);
    } finally {
      setIsBatchRunning(false);
    }
  };

  const handleCommitAllBatch = () => {
    if (batchResults.length === 0) return;
    const entriesToIngest = batchResults.map((r) => r.entry);
    ingestMultipleEntries(entriesToIngest);
    setBatchIngestedDone(true);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setIngestedStatus(null);
    try {
      const results = await HeritageScraperService.searchTopics(searchQuery);
      setSearchResults(results);
    } finally {
      setIsSearching(false);
    }
  };

  const handleScrapeTopic = async (topicTitle: string, cat?: string) => {
    setIsScraping(true);
    setIngestedStatus(null);
    try {
      const result = await HeritageScraperService.scrapeAndParseTopic(
        topicTitle,
        cat || selectedCategory
      );
      setScrapedResult(result);
    } catch (err: any) {
      alert(`Scraper error: ${err?.message || "Failed to fetch topic"}`);
    } finally {
      setIsScraping(false);
    }
  };

  const handleCommitSingleIngestion = () => {
    if (!scrapedResult) return;
    onIngestEntry(scrapedResult.entry);
    setIngestedStatus(scrapedResult.entry.slug);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 space-y-8">
      <SectionHeading
        title={
          locale === "km"
            ? "ប្រព័ន្ធប្រមូលទិន្នន័យ hàng loạt (Batch Ingestion Engine)"
            : "Heritage Data Scraper & Batch Ingestion Engine"
        }
        eyebrow={
          locale === "km"
            ? `ទំហំឃ្លាំងទិន្នន័យបច្ចុប្បន្ន៖ ${totalEntriesCount} អត្ថបទ · គាំទ្រការទាញយកទិន្នន័យ hàng loạt និង thẩm định bản quyền tự động`
            : `Live Encyclopedia Pool: ${totalEntriesCount} entries · Supports bulk scraping, license verification & R2 export.`
        }
        action={
          <div className="flex items-center gap-2">
            <Badge tone="stone">
              <Database className="mr-1 size-3 inline" /> Cloudflare R2 Standard
            </Badge>
            <Badge tone="crimson">
              <ShieldCheck className="mr-1 size-3 inline" /> CC-BY Verified
            </Badge>
          </div>
        }
      />

      {/* Mode Switcher: Batch Mode vs Single Mode */}
      <div className="flex items-center gap-2 border-b border-border/70 pb-3">
        <button
          onClick={() => setActiveMode("batch")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer transition ${
            activeMode === "batch"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-card/70 text-muted-foreground hover:text-foreground hover:bg-card"
          }`}
        >
          <Layers className="size-3.5" />
          <span>
            {locale === "km" ? "ទាញយកទិន្នន័យ hàng loạt (Batch Scrape)" : "1. Bulk / Batch Collection Scraper"}
          </span>
        </button>

        <button
          onClick={() => setActiveMode("single")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold cursor-pointer transition ${
            activeMode === "single"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-card/70 text-muted-foreground hover:text-foreground hover:bg-card"
          }`}
        >
          <Search className="size-3.5" />
          <span>
            {locale === "km" ? "ស្វែងរក និងទាញយកតែមួយ (Single Topic)" : "2. Custom Topic Scraper"}
          </span>
        </button>
      </div>

      {/* ======================= BATCH SCRAPER MODE ======================= */}
      {activeMode === "batch" && (
        <div className="space-y-6">
          {/* Collection Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CURATED_BATCH_COLLECTIONS.map((col) => {
              const isSelected = selectedCollectionId === col.id;
              return (
                <button
                  key={col.id}
                  onClick={() => {
                    setSelectedCollectionId(col.id);
                    setSelectedTopicList(col.topics);
                    setBatchResults([]);
                    setBatchProgress(null);
                    setBatchIngestedDone(false);
                  }}
                  disabled={isBatchRunning}
                  className={`surface-card p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-primary border-transparent bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {col.category}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground bg-stone-200/60 dark:bg-stone-800/80 px-1.5 py-0.5 rounded">
                      {col.topics.length} topics
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mt-1">
                    {locale === "km" ? col.nameKm : col.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {col.topics.slice(0, 3).join(", ")}...
                  </p>
                </button>
              );
            })}
          </div>

          {/* Topics Checklist Card */}
          <div className="surface-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {locale === "km" ? "ជ្រើសរើសប្រធានបទដើម្បីទាញយក hàng loạt" : "Select Articles for Ingestion"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {locale === "km"
                    ? `បានជ្រើស ${selectedTopicList.length}/${activeCollection.topics.length} ប្រធានបទ`
                    : `Selected ${selectedTopicList.length} of ${activeCollection.topics.length} topics in "${activeCollection.name}"`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllTopics}
                  disabled={isBatchRunning}
                  className="text-xs text-primary hover:underline cursor-pointer"
                >
                  Select all
                </button>
                <span className="text-muted-foreground text-xs">·</span>
                <button
                  type="button"
                  onClick={handleDeselectAllTopics}
                  disabled={isBatchRunning}
                  className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Deselect all
                </button>
              </div>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {activeCollection.topics.map((topic) => {
                const checked = selectedTopicList.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleToggleTopic(topic)}
                    disabled={isBatchRunning}
                    className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-xs text-left transition cursor-pointer ${
                      checked
                        ? "border-primary/60 bg-primary/10 text-foreground font-medium"
                        : "border-border/60 bg-background/50 text-muted-foreground hover:border-border"
                    }`}
                  >
                    {checked ? (
                      <CheckSquare className="size-4 text-primary shrink-0" />
                    ) : (
                      <Square className="size-4 text-muted-foreground shrink-0" />
                    )}
                    <span className="truncate">{topic}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Trigger */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/50">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-500" />
                <span>
                  Automatic license auditing & bilingual synthesis (EN + KM) enabled.
                </span>
              </div>

              <button
                type="button"
                onClick={handleStartBatchScrape}
                disabled={isBatchRunning || selectedTopicList.length === 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition cursor-pointer"
              >
                {isBatchRunning ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    <span>Scraping ({batchProgress?.current}/{batchProgress?.total})...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    <span>Cào dữ liệu {selectedTopicList.length} bài cùng lúc (Start Batch Scrape)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar & Batch Output */}
          {batchProgress && (
            <div className="surface-card p-6 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  {batchProgress.status === "completed"
                    ? "✨ Batch Crawling Completed Successfully!"
                    : `Crawling: ${batchProgress.currentTopic || "Fetching topics..."}`}
                </span>
                <span className="font-mono text-primary font-bold">
                  {batchProgress.current} / {batchProgress.total} (
                  {Math.round((batchProgress.current / batchProgress.total) * 100)}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{
                    width: `${(batchProgress.current / batchProgress.total) * 100}%`,
                  }}
                />
              </div>

              {/* Batch Finished Action Bar */}
              {batchProgress.status === "completed" && batchResults.length > 0 && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/50">
                  <div className="text-xs text-foreground font-medium">
                    Đã chuẩn hóa thành công{" "}
                    <strong className="text-primary">{batchResults.length} bài viết</strong> theo chuẩn Cloudflare R2.
                  </div>

                  {batchIngestedDone ? (
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 className="size-4" />
                      <span>Đã nạp toàn bộ {batchResults.length} bài vào kho di sản!</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleCommitAllBatch}
                      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition cursor-pointer"
                    >
                      <Download className="size-4" />
                      Nạp tất cả {batchResults.length} bài vào Live App (Ingest All)
                    </button>
                  )}
                </div>
              )}

              {/* Scraped Entries Grid */}
              {batchResults.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {batchResults.map((item) => (
                    <div
                      key={item.entry.slug}
                      className="rounded-lg border border-border/70 bg-card/60 p-3 space-y-2 hover:border-primary/60 transition"
                    >
                      <div className="flex items-start gap-2.5">
                        <img
                          src={item.entry.coverMedia.url}
                          alt={item.entry.title.en}
                          referrerPolicy="no-referrer"
                          className="size-12 rounded object-cover shrink-0 bg-stone-900"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-foreground truncate">
                            {item.entry.title.en}
                          </h4>
                          <p className="text-[11px] text-muted-foreground font-khmer truncate">
                            {item.entry.title.km}
                          </p>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                            {item.entry.coverMedia.license}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[11px]">
                        <span className="text-muted-foreground">
                          {item.entry.content.sections.length} sections
                        </span>
                        <button
                          onClick={() => onViewEntry(item.entry.slug)}
                          className="text-primary hover:underline font-medium cursor-pointer"
                        >
                          View Detail →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================= SINGLE SCRAPER MODE ======================= */}
      {activeMode === "single" && (
        <div className="space-y-6">
          {/* Preset Topics Quick Trigger */}
          <div className="surface-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-4 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {locale === "km" ? "ប្រធានបទស្នូលត្រូវបានណែនាំ" : "Curated Cultural Heritage Topics"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {CURATED_BATCH_COLLECTIONS[0].topics.slice(0, 6).map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setSelectedCategory("architecture");
                    handleScrapeTopic(name, "architecture");
                  }}
                  disabled={isScraping}
                  className="group flex items-center gap-2 rounded-lg border border-border/70 bg-card/60 px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:border-primary hover:bg-card cursor-pointer"
                >
                  <span>{name}</span>
                  <ArrowRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>

          {/* Scraper Search Bar */}
          <div className="surface-card p-6 space-y-4">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    locale === "km"
                      ? "ស្វែងរកប្រធានបទ (ឧ. Angkor Thom, Banteay Chhmar, Chapei...)"
                      : "Search open academic sources (e.g. Sambor Prei Kuk, Preah Khan, Krama...)"
                  }
                  className="w-full rounded-lg border border-border/80 bg-background/80 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-border/80 bg-background/80 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="architecture">Architecture (ស្ថាបត្យកម្ម)</option>
                <option value="arts">Performing & Visual Arts (សិល្បៈ)</option>
                <option value="crafts">Crafts & Weaving (សិប្បកម្ម)</option>
                <option value="history">History & Epigraphy (ប្រវត្តិសាស្ត្រ)</option>
              </select>

              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition cursor-pointer"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    {locale === "km" ? "កំពុងស្វែងរក..." : "Searching..."}
                  </>
                ) : (
                  <>
                    <Search className="size-4" />
                    {locale === "km" ? "ស្វែងរកប្រភព" : "Query Sources"}
                  </>
                )}
              </button>
            </form>

            {/* Live Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 border-t border-border/40 pt-4 space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  {locale === "km" ? "ប្រភពដែលត្រូវគ្នា៖" : "Matching Academic Articles:"}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {searchResults.map((res) => (
                    <div
                      key={res.pageid}
                      className="flex items-start justify-between gap-3 rounded-lg border border-border/50 bg-background/50 p-3 hover:border-primary/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-foreground">{res.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{res.snippet}</p>
                      </div>
                      <button
                        onClick={() => handleScrapeTopic(res.title)}
                        disabled={isScraping}
                        className="shrink-0 rounded-md bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        {isScraping ? "Scraping..." : "Scrape"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isScraping && (
            <div className="surface-card p-12 text-center space-y-4">
              <RefreshCw className="mx-auto size-8 text-primary animate-spin" />
              <h3 className="text-lg font-medium text-foreground">
                {locale === "km"
                  ? "កំពុងទាញយក និងត្រួតពិនិត្យទិន្នន័យ..."
                  : "Extracting and Validating Heritage Schema..."}
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Resolving bilingual strings (EN/KM), downloading verified CC-BY media metadata from Wikimedia Commons, and parsing structured paragraphs.
              </p>
            </div>
          )}

          {/* Scraped & Structured Result Inspector */}
          {scrapedResult && !isScraping && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary font-bold">
                      {scrapedResult.entry.slug}
                    </span>
                    <Badge tone="crimson">Verified Open License</Badge>
                  </div>
                  <h2 className="text-2xl font-medium text-foreground font-display mt-1">
                    {scrapedResult.entry.title.en} / {scrapedResult.entry.title.km}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {ingestedStatus === scrapedResult.entry.slug ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                        <CheckCircle2 className="size-4" />
                        <span>Ingested into App State</span>
                      </div>
                      <button
                        onClick={() => onViewEntry(scrapedResult.entry.slug)}
                        className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80 cursor-pointer"
                      >
                        <Eye className="size-3.5" />
                        View Entry
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleCommitSingleIngestion}
                      className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    >
                      <Download className="size-4" />
                      Ingest into Live Encyclopedia
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Entry Summary Preview */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="surface-card p-5 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                      1. Structured Heritage Data
                    </h4>

                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-stone-900 relative">
                      <img
                        src={scrapedResult.entry.coverMedia.url}
                        alt={scrapedResult.entry.title.en}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-1 rounded text-[10px] text-white">
                        License: {scrapedResult.entry.coverMedia.license} (
                        {scrapedResult.entry.coverMedia.creator})
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-foreground/90">
                      <p className="font-medium text-foreground">Summary (EN):</p>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-2 border-l-2 border-primary/50">
                        {scrapedResult.entry.summary.en}
                      </p>

                      <p className="font-medium text-foreground mt-3 font-khmer">
                        Summary (KM):
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-2 border-l-2 border-primary/50 font-khmer">
                        {scrapedResult.entry.summary.km}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/40 space-y-3">
                      <h5 className="text-xs font-semibold text-foreground">
                        Extracted Sections ({scrapedResult.entry.content.sections.length})
                      </h5>
                      {scrapedResult.entry.content.sections.map((sec, idx) => (
                        <div
                          key={sec.id}
                          className="rounded-lg bg-background/60 p-3 border border-border/40 text-xs space-y-1"
                        >
                          <p className="font-semibold text-primary">
                            Section {idx + 1}: {sec.heading.en} ({sec.heading.km})
                          </p>
                          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                            {sec.body.en}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cloudflare R2 Manifest Payload & Licensing Audit */}
                <div className="space-y-4">
                  <div className="surface-card p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <FileJson className="size-3.5" />
                        R2 Storage Payload
                      </h4>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setJsonTab("en")}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                            jsonTab === "en"
                              ? "bg-primary text-primary-foreground font-bold"
                              : "text-muted-foreground"
                          }`}
                        >
                          EN JSON
                        </button>
                        <button
                          onClick={() => setJsonTab("km")}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                            jsonTab === "km"
                              ? "bg-primary text-primary-foreground font-bold"
                              : "text-muted-foreground"
                          }`}
                        >
                          KM JSON
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      Target:{" "}
                      <code className="text-primary font-mono">
                        {jsonTab === "en"
                          ? scrapedResult.r2JsonPayload.enPath
                          : scrapedResult.r2JsonPayload.kmPath}
                      </code>
                    </p>

                    <pre className="max-h-64 overflow-y-auto rounded-lg bg-stone-950 p-3 text-[11px] text-emerald-400 font-mono">
                      {JSON.stringify(
                        jsonTab === "en"
                          ? scrapedResult.r2JsonPayload.enContent
                          : scrapedResult.r2JsonPayload.kmContent,
                        null,
                        2
                      )}
                    </pre>
                  </div>

                  {/* License Compliance Box */}
                  <div className="surface-card p-5 space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="size-3.5 text-emerald-500" />
                      Licensing & Provenance Audit
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-1.5">
                      <p>
                        <strong className="text-foreground">Source:</strong>{" "}
                        <a
                          href={scrapedResult.rawSource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline inline-flex items-center gap-0.5"
                        >
                          Wikipedia / Commons <ExternalLink className="size-2.5" />
                        </a>
                      </p>
                      <p>
                        <strong className="text-foreground">License:</strong>{" "}
                        {scrapedResult.rawSource.license}
                      </p>
                      <p>
                        <strong className="text-foreground">Commercial Safety:</strong> PASS (CC
                        BY / CC BY-SA with full attribution metadata)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

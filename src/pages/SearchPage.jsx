import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { searchArtworks, CATEGORIES as ART_CATEGORIES } from "../api/artic";
import { searchWallhaven, WALLHAVEN_CATEGORIES } from "../api/wallhaven";
import ImageCard from "../components/ImageCard";
import WallhavenCard from "../components/WallhavenCard";
import SkeletonCard from "../components/SkeletonCard";
import { motion, useReducedMotion } from "motion/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const reduce = useReducedMotion();

  const [query, setQuery] = useState(q);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'wallpapers' | 'art'
  const [artResults, setArtResults] = useState([]);
  const [wallpaperResults, setWallpaperResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const doSearch = useCallback(async (term) => {
    if (!term.trim()) {
      setArtResults([]);
      setWallpaperResults([]);
      return;
    }
    setLoading(true);
    try {
      const [artData, wallData] = await Promise.allSettled([
        searchArtworks(term, { limit: 24 }),
        searchWallhaven({ query: term, limit: 24, sort: "relevance" }),
      ]);

      setArtResults(artData.status === "fulfilled" ? artData.value.artworks || [] : []);
      setWallpaperResults(wallData.status === "fulfilled" ? wallData.value.wallpapers || [] : []);
    } catch {
      setArtResults([]);
      setWallpaperResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (q) {
      setQuery(q);
      doSearch(q);
    }
  }, [q, doSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const handleCategoryClick = (term) => {
    setQuery(term);
    setSearchParams({ q: term });
  };

  const totalResults = artResults.length + wallpaperResults.length;

  const chipClass = (active) =>
    `rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-all ${
      active
        ? "bg-darkroom-safelight text-darkroom-print"
        : "border border-darkroom-border bg-darkroom-surface text-darkroom-text-muted hover:border-darkroom-safelight/40 hover:text-darkroom-text"
    }`;

  const tabClass = (active) =>
    `rounded-[4px] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all ${
      active
        ? "bg-darkroom-safelight text-darkroom-print"
        : "border border-darkroom-border bg-darkroom-surface text-darkroom-text-muted hover:text-darkroom-text"
    }`;

  return (
    <div className="relative bg-darkroom-ink text-darkroom-text">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] darkroom-aura-weak" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-14 md:px-8 md:pt-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative max-w-xl">
              <MagnifyingGlass
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-darkroom-safelight-text"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search wallpapers, superhero, anime, art..."
                className="h-12 w-full rounded-[4px] border border-darkroom-border bg-darkroom-surface pl-11 pr-4 text-base text-darkroom-text placeholder:text-darkroom-text-dim focus:border-darkroom-safelight/50 focus:outline-none focus:ring-1 focus:ring-darkroom-safelight/40"
              />
            </div>
          </form>

          <div className="mb-8 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-darkroom-text-dim">
                Wallpaper Categories:
              </span>
              {WALLHAVEN_CATEGORIES.slice(1).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.query || cat.label)}
                  className={chipClass(
                    q.toLowerCase() === (cat.query || cat.label).toLowerCase()
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-darkroom-text-dim">
                Fine Art Categories:
              </span>
              {ART_CATEGORIES.slice(1).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.label)}
                  className={chipClass(q.toLowerCase() === cat.label.toLowerCase())}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {q && (
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-darkroom-text-dim">
                {loading
                  ? "Searching catalog..."
                  : `${totalResults.toLocaleString()} results found for "${q}"`}
              </p>

              <div className="flex gap-2">
                <button type="button" onClick={() => setActiveTab("all")} className={tabClass(activeTab === "all")}>
                  All ({totalResults})
                </button>
                <button type="button" onClick={() => setActiveTab("wallpapers")} className={tabClass(activeTab === "wallpapers")}>
                  Wallpapers ({wallpaperResults.length})
                </button>
                <button type="button" onClick={() => setActiveTab("art")} className={tabClass(activeTab === "art")}>
                  Fine Art ({artResults.length})
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="masonry">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} index={i} />
              ))}
            </div>
          ) : (
            <>
              {(activeTab === "all" || activeTab === "wallpapers") && wallpaperResults.length > 0 && (
                <div className="mb-10">
                  {activeTab === "all" && (
                    <div className="mb-4 flex items-center gap-3">
                      <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-text-dim">
                        Wallpapers ({wallpaperResults.length})
                      </h2>
                      <div className="h-px flex-1 bg-darkroom-border" />
                    </div>
                  )}
                  <div className="masonry">
                    {wallpaperResults.map((wp, i) => (
                      <WallhavenCard key={wp.id} wallpaper={wp} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {(activeTab === "all" || activeTab === "art") && artResults.length > 0 && (
                <div className="mb-10">
                  {activeTab === "all" && (
                    <div className="mb-4 flex items-center gap-3">
                      <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-text-dim">
                        Museum Artworks ({artResults.length})
                      </h2>
                      <div className="h-px flex-1 bg-darkroom-border" />
                    </div>
                  )}
                  <div className="masonry">
                    {artResults.map((artwork, i) => (
                      <ImageCard key={artwork.id} artwork={artwork} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {!loading && q && totalResults === 0 && (
            <div className="print-sheet mx-auto mt-8 max-w-md rounded-[4px] p-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-darkroom-print">
                No frames developed
              </p>
              <p className="mt-3 font-amharic text-xl text-darkroom-print">
                No results found for "{q}"
              </p>
              <p className="mt-1 text-sm text-darkroom-print-muted">
                Try clicking one of the category pills above or searching for terms like "batman",
                "anime", or "cyberpunk".
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

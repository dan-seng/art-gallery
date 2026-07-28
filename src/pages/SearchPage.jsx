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

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 md:py-12">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative max-w-xl">
            <MagnifyingGlass
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gallery-text-dim"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wallpapers, superhero, anime, art..."
              className="h-12 w-full rounded-xl border border-gallery-border bg-gallery-surface pl-11 pr-4 text-base text-gallery-text placeholder:text-gallery-text-dim focus:outline-none focus:ring-2 focus:ring-gallery-gold/20"
            />
          </div>
        </form>

        {/* Quick Category Chips for both Wallpaper and Art */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-gallery-text-dim">
              Wallpaper Categories:
            </span>
            {WALLHAVEN_CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.query || cat.label)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  q.toLowerCase() === (cat.query || cat.label).toLowerCase()
                    ? "bg-gallery-gold text-gallery-black"
                    : "border border-gallery-border bg-gallery-surface text-gallery-text-muted hover:border-gallery-gold/30 hover:text-gallery-text"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-gallery-text-dim">
              Fine Art Categories:
            </span>
            {ART_CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.label)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  q.toLowerCase() === cat.label.toLowerCase()
                    ? "bg-gallery-gold text-gallery-black"
                    : "border border-gallery-border bg-gallery-surface text-gallery-text-muted hover:border-gallery-gold/30 hover:text-gallery-text"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {q && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gallery-text-dim">
              {loading
                ? "Searching catalog..."
                : `${totalResults.toLocaleString()} results found for "${q}"`}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "all"
                    ? "bg-gallery-gold text-gallery-black"
                    : "border border-gallery-border bg-gallery-surface text-gallery-text-muted hover:text-gallery-text"
                }`}
              >
                All ({totalResults})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("wallpapers")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "wallpapers"
                    ? "bg-gallery-gold text-gallery-black"
                    : "border border-gallery-border bg-gallery-surface text-gallery-text-muted hover:text-gallery-text"
                }`}
              >
                Wallpapers ({wallpaperResults.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("art")}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === "art"
                    ? "bg-gallery-gold text-gallery-black"
                    : "border border-gallery-border bg-gallery-surface text-gallery-text-muted hover:text-gallery-text"
                }`}
              >
                Fine Art ({artResults.length})
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="masonry">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            {(activeTab === "all" || activeTab === "wallpapers") && wallpaperResults.length > 0 && (
              <div className="mb-10">
                {activeTab === "all" && (
                  <h2 className="mb-4 text-lg font-medium text-gallery-text">
                    Wallpapers ({wallpaperResults.length})
                  </h2>
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
                  <h2 className="mb-4 text-lg font-medium text-gallery-text">
                    Museum Artworks ({artResults.length})
                  </h2>
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
          <div className="py-24 text-center">
            <p className="font-amharic text-lg text-gallery-text-muted">
              No results found for "{q}"
            </p>
            <p className="mt-1 text-sm text-gallery-text-dim">
              Try clicking one of the category pills above or searching for terms like "batman", "anime", or "cyberpunk".
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

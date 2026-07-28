import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useWallhaven } from "../hooks/useWallhaven";
import { WALLHAVEN_CATEGORIES, WALLHAVEN_SORT } from "../api/wallhaven";
import WallhavenCard from "../components/WallhavenCard";
import SkeletonCard from "../components/SkeletonCard";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, MagnifyingGlass, FunnelSimple } from "@phosphor-icons/react";

export default function WallhavenGallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reduce = useReducedMotion();

  const q = searchParams.get("q") || "";
  const cat = searchParams.get("cat") || "all";
  const sort = searchParams.get("sort") || "toplist";

  const [query, setQuery] = useState(q);
  const { wallpapers, loading, loadingMore, error, errorNotice, isFallback, loadMore, totalPages, page } =
    useWallhaven({ query: q, category: cat, sort });

  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams);
      if (query.trim()) params.set("q", query.trim());
      else params.delete("q");
      setSearchParams(params);
    },
    [query, searchParams, setSearchParams]
  );

  const setCategory = useCallback(
    (id) => {
      const params = new URLSearchParams(searchParams);
      if (id === "all") params.delete("cat");
      else params.set("cat", id);
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const setSort = useCallback(
    (id) => {
      const params = new URLSearchParams(searchParams);
      if (id === "toplist") params.delete("sort");
      else params.set("sort", id);
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-5 pb-8 pt-8 md:pb-12 md:pt-12"
      >
        <div>
          <h1 className="font-amharic text-3xl font-normal tracking-wide text-gallery-text md:text-5xl">
            Wallpapers
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-gallery-text-muted md:text-base">
            High-resolution wallpapers from Wallhaven. Search any topic, filter by category.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <MagnifyingGlass
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gallery-text-dim"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wallpapers..."
              className="h-10 w-full rounded-lg border border-gallery-border bg-gallery-surface pl-10 pr-4 text-sm text-gallery-text placeholder:text-gallery-text-dim focus:outline-none focus:ring-1 focus:ring-gallery-gold/30"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors ${
              showFilters
                ? "border-gallery-gold/30 bg-gallery-gold/10 text-gallery-gold"
                : "border-gallery-border bg-gallery-surface text-gallery-text-muted hover:border-gallery-gold/20 hover:text-gallery-text"
            }`}
          >
            <FunnelSimple size={14} />
            Filters
          </button>
        </form>

        {showFilters && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4 overflow-hidden"
          >
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-gallery-text-dim">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {WALLHAVEN_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                      cat === c.id
                        ? "bg-gallery-gold text-gallery-black"
                        : "border border-gallery-border bg-gallery-surface text-gallery-text-muted hover:border-gallery-gold/30 hover:text-gallery-text"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-gallery-text-dim">
                Sort
              </p>
              <div className="flex flex-wrap gap-2">
                {WALLHAVEN_SORT.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id)}
                    className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                      sort === s.id
                        ? "bg-gallery-gold text-gallery-black"
                        : "border border-gallery-border bg-gallery-surface text-gallery-text-muted hover:border-gallery-gold/30 hover:text-gallery-text"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {errorNotice && (
        <div className="mb-6 rounded-xl border border-gallery-gold/30 bg-gallery-gold/5 p-4 text-center text-xs text-gallery-gold">
          {errorNotice}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center text-sm text-red-400">
          {error}
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
          <div className="masonry">
            {wallpapers.map((wp, i) => (
              <WallhavenCard key={wp.id} wallpaper={wp} index={i} />
            ))}
          </div>

          {wallpapers.length === 0 && !loading && (
            <div className="py-24 text-center">
              <p className="font-amharic text-lg text-gallery-text-muted">
                No wallpapers found
              </p>
              <p className="mt-1 text-sm text-gallery-text-dim">
                Try a different search term or category.
              </p>
            </div>
          )}

          {page < totalPages && (
            <div className="flex justify-center py-12">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 rounded-xl border border-gallery-border bg-gallery-surface px-6 py-3 text-sm font-medium text-gallery-text-muted transition-all hover:border-gallery-gold/30 hover:text-gallery-text disabled:opacity-50"
              >
                {loadingMore ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-gallery-text-dim border-t-gallery-gold" />
                ) : (
                  <ArrowDown size={16} />
                )}
                {loadingMore ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

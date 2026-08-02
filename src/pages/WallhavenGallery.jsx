import { useState, useCallback } from "react";
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

  const pillClass = (active) =>
    `rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all ${
      active
        ? "bg-darkroom-safelight text-darkroom-print"
        : "border border-darkroom-border bg-darkroom-surface text-darkroom-text-muted hover:border-darkroom-safelight/40 hover:text-darkroom-text"
    }`;

  return (
    <div className="relative bg-darkroom-ink text-darkroom-text">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[640px] darkroom-aura" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[520px] darkroom-vignette" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-14 md:px-8 md:pt-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 border-b border-darkroom-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-safelight-text">
              Darkroom
            </span>
            <span className="h-px flex-1 bg-darkroom-border" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-text-dim">
              Wallhaven SFW
            </span>
          </div>

          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1fr_260px] lg:gap-12">
            <div className="max-w-2xl">
              <h1 className="font-amharic text-4xl font-normal leading-tight tracking-wide text-darkroom-text md:text-6xl">
                Wallpapers
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-darkroom-text-muted md:text-base">
                High-resolution wallpapers from Wallhaven. Search any topic, filter by
                category.
              </p>
            </div>

            <div className="hidden self-end lg:block">
              <div className="print-sheet rounded-[4px] p-5">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-darkroom-safelight" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-print">
                    Print record
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    ["Subject", q || "All"],
                    ["Category", cat],
                    ["Sort", sort],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-4 border-b border-darkroom-print-muted/20 pb-2 font-mono text-[11px]"
                    >
                      <span className="uppercase tracking-[0.14em] text-darkroom-print-muted">
                        {k}
                      </span>
                      <span className="text-darkroom-print">{v}</span>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 font-mono text-[11px]">
                    <span className="uppercase tracking-[0.14em] text-darkroom-print-muted">
                      Frames
                    </span>
                    <span className="text-darkroom-print">
                      {wallpapers.length > 0 ? wallpapers.length : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col gap-8">
          <div className="flex flex-wrap gap-2">
            {WALLHAVEN_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={pillClass(cat === c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <MagnifyingGlass
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-darkroom-safelight-text"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search wallpapers..."
                className="h-11 w-full rounded-[4px] border border-darkroom-border bg-darkroom-surface pl-11 pr-4 text-sm text-darkroom-text placeholder:text-darkroom-text-dim focus:border-darkroom-safelight/50 focus:outline-none focus:ring-1 focus:ring-darkroom-safelight/40"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex h-11 items-center gap-2 rounded-[4px] border px-4 font-mono text-[11px] uppercase tracking-[0.12em] transition-all ${
                showFilters
                  ? "border-transparent bg-darkroom-safelight text-darkroom-print"
                  : "border-darkroom-border bg-darkroom-surface text-darkroom-text-muted hover:border-darkroom-safelight/40 hover:text-darkroom-text"
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
              className="overflow-hidden"
            >
              <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-darkroom-text-dim">
                Sort
              </p>
              <div className="flex flex-wrap gap-2">
                {WALLHAVEN_SORT.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id)}
                    className={pillClass(sort === s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {errorNotice && (
          <div className="mt-8 rounded-[4px] border border-darkroom-safelight/30 bg-darkroom-safelight/10 p-4 text-center text-xs text-darkroom-safelight-text">
            {errorNotice}
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-[4px] border border-red-500/30 bg-red-500/10 p-6 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mt-14 flex items-center gap-4 pb-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-text-dim">
            Contact sheet
          </span>
          <div className="h-px flex-1 bg-darkroom-border" />
          {totalPages > 1 && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-darkroom-text-dim">
              Page {page} / {totalPages}
            </span>
          )}
        </div>

        {loading ? (
          <div className="masonry mt-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        ) : (
          <>
            {wallpapers.length > 0 ? (
              <div className="masonry mt-4">
                {wallpapers.map((wp, i) => (
                  <WallhavenCard key={wp.id} wallpaper={wp} index={i} />
                ))}
              </div>
            ) : (
              <div className="print-sheet mx-auto mt-8 max-w-md rounded-[4px] p-10 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-darkroom-print">
                  No frames developed
                </p>
                <p className="mt-3 font-amharic text-xl text-darkroom-print">
                  No wallpapers found
                </p>
                <p className="mt-1 text-sm text-darkroom-print-muted">
                  Try a different search term or category.
                </p>
              </div>
            )}

            {page < totalPages && (
              <div className="flex justify-center py-14">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-2 rounded-[4px] bg-darkroom-safelight px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-darkroom-print transition-all hover:bg-darkroom-safelight-dim disabled:opacity-50"
                >
                  {loadingMore ? (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-darkroom-print/40 border-t-darkroom-print" />
                  ) : (
                    <ArrowDown size={15} />
                  )}
                  {loadingMore ? "Developing..." : "Load more"}
                </button>
              </div>
            )}
          </>
        )}

        {!loading && isFallback && wallpapers.length > 0 && (
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-darkroom-text-dim">
            Development halted — showing printed sample
          </p>
        )}
      </div>
    </div>
  );
}

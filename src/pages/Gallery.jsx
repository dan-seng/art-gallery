import { useParams } from "react-router-dom";
import { useArtworks } from "../hooks/useArtworks";
import { CATEGORIES } from "../api/artic";
import ImageCard from "../components/ImageCard";
import SkeletonCard from "../components/SkeletonCard";
import CategoryPills from "../components/CategoryPills";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";

export default function Gallery({ standalone = true }) {
  const { category } = useParams();
  const activeCategory = category || "all";
  const reduce = useReducedMotion();
  const { artworks, loading, loadingMore, error, loadMore, totalPages, page } =
    useArtworks({ category: activeCategory });

  const heading =
    activeCategory === "all"
      ? "Art Wallpapers"
      : CATEGORIES.find((c) => c.id === activeCategory)?.label || "Gallery";

  const grid = (
    <>
      {error && (
        <div className="rounded-[4px] border border-red-500/30 bg-red-500/10 p-6 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="masonry mt-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>
      ) : (
        <>
          {artworks.length > 0 ? (
            <div className="masonry mt-4">
              {artworks.map((artwork, i) => (
                <ImageCard key={artwork.id} artwork={artwork} index={i} />
              ))}
            </div>
          ) : (
            <div className="print-sheet mx-auto mt-8 max-w-md rounded-[4px] p-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-darkroom-print">
                No frames developed
              </p>
              <p className="mt-3 font-amharic text-xl text-darkroom-print">
                No artworks found
              </p>
              <p className="mt-1 text-sm text-darkroom-print-muted">
                Try a different category.
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
    </>
  );

  if (!standalone) return grid;

  return (
    <div className="relative bg-darkroom-ink text-darkroom-text">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[560px] darkroom-aura" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[520px] darkroom-vignette" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-14 md:px-8 md:pt-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 border-b border-darkroom-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-safelight-text">
              Gallery
            </span>
            <span className="h-px flex-1 bg-darkroom-border" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-text-dim">
              Art Institute of Chicago
            </span>
          </div>

          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1fr_260px] lg:gap-12">
            <div className="max-w-2xl">
              <h1 className="font-amharic text-4xl font-normal leading-tight tracking-wide text-darkroom-text md:text-6xl">
                {heading}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-darkroom-text-muted md:text-base">
                Curated masterpieces from the Art Institute of Chicago, free to use as
                wallpapers.
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
                    ["Category", activeCategory === "all" ? "All" : heading],
                    ["Source", "AIC Open Access"],
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
                      {artworks.length > 0 ? artworks.length : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10">
          <CategoryPills categories={CATEGORIES} active={activeCategory} />
        </div>

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

        {grid}
      </div>
    </div>
  );
}

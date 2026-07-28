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

  return (
    <div className={standalone ? "mx-auto max-w-[1400px] px-4 md:px-8" : ""}>
      {standalone && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 pb-8 pt-8 md:pb-12 md:pt-12"
        >
          <div>
            <h1 className="font-amharic text-3xl font-normal tracking-wide text-gallery-text md:text-5xl">
              {activeCategory === "all"
                ? "Art Wallpapers"
                : CATEGORIES.find((c) => c.id === activeCategory)?.label || "Gallery"}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-gallery-text-muted md:text-base">
              Curated masterpieces from the Art Institute of Chicago, free to use as wallpapers.
            </p>
          </div>

          <CategoryPills categories={CATEGORIES} active={activeCategory} />
        </motion.div>
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
            {artworks.map((artwork, i) => (
              <ImageCard key={artwork.id} artwork={artwork} index={i} />
            ))}
          </div>

          {artworks.length === 0 && !loading && (
            <div className="py-24 text-center">
              <p className="font-amharic text-lg text-gallery-text-muted">No artworks found</p>
              <p className="mt-1 text-sm text-gallery-text-dim">
                Try a different category or search term.
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

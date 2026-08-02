import { motion, useReducedMotion } from "motion/react";
import { useFeatured } from "../hooks/useArtwork";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "@phosphor-icons/react";
import { downloadImage } from "../utils/download";
import ImageCard from "../components/ImageCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Featured() {
  const { artworks, loading } = useFeatured();
  const reduce = useReducedMotion();

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>
      </div>
    );
  }

  const hero = artworks[0];
  const rest = artworks.slice(1, 5);

  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-8">
      {hero && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="print-sheet relative mb-4 rounded-[4px] p-2 md:mb-6 md:p-3"
        >
          <Link to={`/artwork/${hero.id}`} className="group block">
            <div className="relative aspect-[16/7] overflow-hidden rounded-[2px] md:aspect-[16/5.5]">
              <img
                src={hero.large}
                alt={hero.title}
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0808] via-[#0a0808]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-10">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#e86a3a]">
                  &#x25C6; Featured
                </p>
                <h2 className="max-w-lg font-amharic text-xl font-normal tracking-wide text-white md:text-3xl lg:text-4xl">
                  {hero.title}
                </h2>
                <p className="mt-1 text-xs text-white/75 md:text-sm">
                  {hero.artist}
                  {hero.date && (
                    <span className="text-white/60"> &middot; {hero.date}</span>
                  )}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-sm text-white/80 transition-colors group-hover:text-[#e86a3a]">
                    View
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const filename = `${(hero.title || "wallpaper").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`;
                      downloadImage(hero.wallpaper || hero.large, filename);
                    }}
                    className="flex items-center gap-1.5 rounded-[4px] bg-darkroom-safelight px-3 py-1.5 text-sm font-medium text-darkroom-print transition-colors hover:bg-darkroom-safelight-dim"
                  >
                    <Download size={13} />
                    Wallpaper
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {rest.map((artwork, i) => (
            <ImageCard key={artwork.id} artwork={artwork} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

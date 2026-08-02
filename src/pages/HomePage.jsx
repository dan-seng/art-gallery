import Featured from "./Featured";
import Gallery from "./Gallery";
import CategoryPills from "../components/CategoryPills";
import { CATEGORIES } from "../api/artic";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { useGalleryStats } from "../hooks/useGalleryStats";

export default function HomePage() {
  const reduce = useReducedMotion();
  const stats = useGalleryStats();

  return (
    <div className="relative bg-darkroom-ink text-darkroom-text">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[720px] darkroom-aura" />

      <div className="relative z-10">
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-4 pt-14 pb-12 md:pt-20 md:pb-16">
            <div className="flex items-center gap-4 border-b border-darkroom-border pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-safelight-text">
                Gallery
              </span>
              <span className="h-px flex-1 bg-darkroom-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-text-dim">
                Bsbs · Fine Art Collection
              </span>
            </div>

            <div className="mt-12 text-center">
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-amharic text-6xl font-normal tracking-tight text-darkroom-text md:text-8xl lg:text-9xl"
              >
                Art Wallpapers
              </motion.h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-6 max-w-[500px] text-lg text-darkroom-text-muted md:text-xl"
              >
                Curated masterpieces from the Art Institute of Chicago, free to use as wallpapers.
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col items-center gap-4 md:flex-row md:gap-12"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-darkroom-safelight-text">
                    {stats?.total || 0}
                  </span>
                  <span className="text-sm text-darkroom-text-muted">Masterpieces</span>
                </div>
                <div className="hidden h-8 w-px bg-darkroom-border/50 md:block" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-darkroom-safelight-text">
                    {stats?.categories || 0}
                  </span>
                  <span className="text-sm text-darkroom-text-muted">Categories</span>
                </div>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10"
              >
                <CategoryPills categories={CATEGORIES} active="all" />
              </motion.div>
            </div>
          </div>
        </section>

        <Featured />

        <div className="mx-auto max-w-[1400px] px-4 pt-12 md:px-8 md:pt-16">
          <Gallery standalone={false} />
        </div>
      </div>
    </div>
  );
}

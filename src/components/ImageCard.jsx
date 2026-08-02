import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Download } from "@phosphor-icons/react";

import { downloadImage } from "../utils/download";

export default function ImageCard({ artwork, index = 0 }) {
  const reduce = useReducedMotion();

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const filename = `${(artwork.title || "wallpaper").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`;
    downloadImage(artwork.wallpaper || artwork.large, filename);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        to={`/artwork/${artwork.id}`}
        className="group block print-sheet relative rounded-[3px] p-2 pb-1.5 transition-transform duration-500 ease-out hover:-translate-y-1"
      >
        <div className="relative overflow-hidden rounded-[2px] bg-darkroom-elevated">
          <img
            src={artwork.thumbnail}
            alt={artwork.title}
            loading="lazy"
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ aspectRatio: "3/4" }}
          />

          <div className="pointer-events-none absolute inset-0 transition-colors duration-500 group-hover:bg-darkroom-safelight/10" />
        </div>

        <div className="mt-1.5 px-0.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-darkroom-print">
              NO.{String(index + 1).padStart(3, "0")}
              <span className="text-darkroom-print-muted">
                {" "}
                · {artwork.medium || "Work on paper"}
              </span>
            </span>
            <span className="shrink-0 font-mono text-[10px] text-darkroom-print-muted">
              {artwork.date}
            </span>
          </div>
          <div className="mt-0.5 flex items-baseline justify-between gap-2">
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-darkroom-print-muted">
              {artwork.title}
            </span>
            <span className="shrink-0 truncate font-mono text-[10px] text-darkroom-print-muted">
              {artwork.artist}
            </span>
          </div>
        </div>

        <div className="absolute right-2.5 top-2.5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleDownload}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-darkroom-safelight text-darkroom-print shadow-lg shadow-darkroom-ink/40 transition-colors hover:bg-darkroom-safelight-dim"
            title="Download wallpaper"
            aria-label="Download wallpaper"
          >
            <Download size={14} weight="bold" />
          </button>
        </div>
      </Link>
    </motion.div>
  );
}

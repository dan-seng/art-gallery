import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Download, Eye, Heart } from "@phosphor-icons/react";

import { downloadImage } from "../utils/download";

function formatCount(n) {
  if (!n) return "0";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function WallhavenCard({ wallpaper, index = 0 }) {
  const reduce = useReducedMotion();

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ext = wallpaper.fileType ? wallpaper.fileType.split("/")[1] || "jpg" : "jpg";
    const filename = `wallhaven-${wallpaper.id}.${ext}`;
    downloadImage(wallpaper.full, filename);
  };

  const ratio =
    wallpaper.width && wallpaper.height ? `${wallpaper.width}/${wallpaper.height}` : "16/10";

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
        to={`/wallpaper/${wallpaper.id}`}
        className="group block print-sheet relative rounded-[3px] p-2 pb-1.5 transition-transform duration-500 ease-out hover:-translate-y-1"
      >
        <div className="relative overflow-hidden rounded-[2px] bg-darkroom-elevated">
          <img
            src={wallpaper.thumb}
            alt={`${wallpaper.resolution} wallpaper`}
            loading="lazy"
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ aspectRatio: ratio }}
          />

          <div className="pointer-events-none absolute inset-0 transition-colors duration-500 group-hover:bg-darkroom-safelight/10" />
        </div>

        <div className="mt-1.5 px-0.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-darkroom-print">
              NO.{String(index + 1).padStart(3, "0")}
              <span className="text-darkroom-print-muted"> · {wallpaper.resolution}</span>
            </span>
            <span className="flex items-center gap-2 font-mono text-[10px] text-darkroom-print-muted">
              <span className="flex items-center gap-1">
                <Eye size={10} />
                {formatCount(wallpaper.views)}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={10} />
                {formatCount(wallpaper.favorites)}
              </span>
            </span>
          </div>
          <div className="mt-0.5 flex items-baseline justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-darkroom-print-muted">
              {wallpaper.category || "wallpaper"}
              {wallpaper.fileType
                ? ` · ${wallpaper.fileType.split("/")[1]?.toUpperCase() || "IMG"}`
                : ""}
            </span>
            <span className="font-mono text-[10px] text-darkroom-print-muted">
              {wallpaper.width && wallpaper.height ? `${wallpaper.width}px` : ""}
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

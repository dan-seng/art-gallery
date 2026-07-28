import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Download, Heart, Eye } from "@phosphor-icons/react";

import { downloadImage } from "../utils/download";

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
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
        className="group relative block overflow-hidden rounded-xl bg-gallery-surface art-shadow"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={wallpaper.thumb}
            alt={`${wallpaper.resolution} wallpaper`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white">
                {wallpaper.resolution}
              </p>
              <p className="mt-0.5 flex items-center gap-2 text-[11px] text-white/60">
                <span className="flex items-center gap-1">
                  <Eye size={10} />
                  {wallpaper.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={10} />
                  {wallpaper.favorites.toLocaleString()}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gallery-gold/90 text-gallery-black transition-colors hover:bg-gallery-gold"
              title="Download wallpaper"
            >
              <Download size={14} weight="bold" />
            </button>
          </div>

          <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            {wallpaper.category && (
              <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                {wallpaper.category}
              </span>
            )}
            {wallpaper.fileType && (
              <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                {wallpaper.fileType.split("/")[1]?.toUpperCase() || wallpaper.fileType}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

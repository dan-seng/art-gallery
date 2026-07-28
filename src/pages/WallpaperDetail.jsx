import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchWallpaper } from "../api/wallhaven";
import { downloadImage } from "../utils/download";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  Download,
  Heart,
  Eye,
  Monitor,
  Palette,
  CalendarBlank,
  ArrowSquareOut,
  Tag,
} from "@phosphor-icons/react";

function formatSize(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
}

export default function WallpaperDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    fetchWallpaper(id)
      .then((data) => {
        if (!cancelled) setWallpaper(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_380px]">
          <div className="aspect-[16/10] animate-pulse rounded-2xl bg-gallery-surface" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gallery-elevated" />
            <div className="h-5 w-1/2 animate-pulse rounded-lg bg-gallery-elevated" />
            <div className="h-24 w-full animate-pulse rounded-xl bg-gallery-elevated" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !wallpaper) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-24 text-center md:px-8">
        <p className="font-amharic text-lg text-gallery-text-muted">
          Wallpaper not found
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-gallery-gold hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const details = [
    { icon: Monitor, label: "Resolution", value: wallpaper.resolution },
    { icon: Palette, label: "Category", value: wallpaper.category },
    { icon: Eye, label: "Views", value: wallpaper.views.toLocaleString() },
    { icon: Heart, label: "Favorites", value: wallpaper.favorites.toLocaleString() },
    {
      icon: Monitor,
      label: "File size",
      value: formatSize(wallpaper.fileSize),
    },
    {
      icon: CalendarBlank,
      label: "Uploaded",
      value: wallpaper.createdAt?.split(" ")[0] || "",
    },
  ].filter((d) => d.value);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 inline-flex items-center gap-2 rounded-full border border-gallery-border bg-gallery-surface px-4 py-2 text-xs font-medium text-gallery-text transition-all hover:border-gallery-gold/40 hover:bg-gallery-elevated hover:text-gallery-gold md:text-sm"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Gallery
        </button>

        <div className="grid gap-8 md:grid-cols-[1fr_380px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl bg-gallery-surface art-shadow"
          >
            <img
              src={wallpaper.full}
              alt={`${wallpaper.resolution} wallpaper`}
              className="w-full object-contain"
              style={{ maxHeight: "75vh" }}
            />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <h1 className="font-amharic text-2xl font-normal tracking-wide text-gallery-text md:text-3xl">
                {wallpaper.resolution} Wallpaper
              </h1>
              <p className="mt-1 text-sm text-gallery-text-muted">
                {wallpaper.category} &middot; {wallpaper.fileType}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  const ext = wallpaper.fileType ? wallpaper.fileType.split("/")[1] || "jpg" : "jpg";
                  const filename = `wallhaven-${wallpaper.id}.${ext}`;
                  downloadImage(wallpaper.full, filename);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gallery-gold px-5 py-3.5 text-sm font-semibold text-gallery-black transition-colors hover:bg-gallery-gold-dim"
              >
                <Download size={16} weight="bold" />
                Download
              </button>
              <a
                href={wallpaper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gallery-border bg-gallery-surface px-5 py-3.5 text-sm font-medium text-gallery-text-muted transition-colors hover:border-gallery-gold/30 hover:text-gallery-text"
              >
                <ArrowSquareOut size={14} />
                Source
              </a>
            </div>

            {wallpaper.category && (
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-gallery-text-dim">
                  Category Tag
                </p>
                <button
                  type="button"
                  onClick={() => navigate(`/wallpapers?cat=${wallpaper.category.toLowerCase()}`)}
                  className="inline-flex items-center gap-2 rounded-full border border-gallery-border bg-gallery-surface px-4 py-1.5 text-xs font-medium text-gallery-gold transition-all hover:border-gallery-gold/50 hover:bg-gallery-elevated"
                >
                  <Tag size={12} />
                  Filter by {wallpaper.category}
                </button>
              </div>
            )}

            {wallpaper.colors && wallpaper.colors.length > 0 && (
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-gallery-text-dim">
                  Dominant colors
                </p>
                <div className="flex gap-2">
                  {wallpaper.colors.map((color, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-lg border border-white/10"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {details.length > 0 && (
              <div className="space-y-4 rounded-xl border border-gallery-border/50 bg-gallery-surface p-5">
                {details.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon
                      size={16}
                      className="mt-0.5 shrink-0 text-gallery-text-dim"
                    />
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-gallery-text-dim">
                        {label}
                      </p>
                      <p className="text-sm text-gallery-text-muted">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto border-t border-gallery-border/30 pt-4">
              <a
                href="https://wallhaven.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gallery-text-dim hover:text-gallery-text-muted"
              >
                Wallpapers from Wallhaven.cc
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

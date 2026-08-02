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
  FileImage,
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
          <div className="print-sheet animate-pulse rounded-[4px] p-6">
            <div className="aspect-[16/10] rounded-[2px] bg-darkroom-elevated" />
          </div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-darkroom-elevated" />
            <div className="print-sheet h-72 animate-pulse rounded-[4px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !wallpaper) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-24 text-center md:px-8">
        <p className="font-amharic text-lg text-darkroom-text-muted">
          Wallpaper not found
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-darkroom-safelight-text hover:underline"
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
      icon: FileImage,
      label: "File size",
      value: formatSize(wallpaper.fileSize),
    },
    {
      icon: CalendarBlank,
      label: "Uploaded",
      value: wallpaper.createdAt?.split(" ")[0] || "",
    },
  ].filter((d) => d.value);

  const ext = wallpaper.fileType ? wallpaper.fileType.split("/")[1] || "jpg" : "jpg";
  const filename = `wallhaven-${wallpaper.id}.${ext}`;

  return (
    <div className="relative bg-darkroom-ink text-darkroom-text">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[560px] darkroom-aura" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-24 pt-14 md:px-8 md:pt-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 rounded-full border border-darkroom-border bg-darkroom-surface/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-darkroom-text-muted transition-all hover:border-darkroom-safelight/40 hover:text-darkroom-text"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Gallery
            </button>
            <div className="h-px flex-1 bg-darkroom-border" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-text-dim">
              Print no. {wallpaper.id.toUpperCase()}
            </span>
          </div>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1fr_360px] lg:gap-12">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                <div className="pointer-events-none absolute -top-14 left-1/2 h-56 w-[80%] -translate-x-1/2 darkroom-aura-weak" />
                <div className="print-sheet relative rounded-[4px] p-3 md:p-6">
                  <img
                    src={wallpaper.full}
                    alt={`${wallpaper.resolution} wallpaper`}
                    className="mx-auto w-auto max-w-full object-contain"
                    style={{ maxHeight: "72vh" }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-darkroom-text-dim">
                <span>Developed print</span>
                <span>
                  {wallpaper.resolution}
                  <span className="text-darkroom-text-dim/70">
                    {" "}
                    · {wallpaper.category}
                  </span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <div>
                <h1 className="font-amharic text-2xl font-normal tracking-wide text-darkroom-text md:text-3xl">
                  {wallpaper.resolution} Wallpaper
                </h1>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-darkroom-text-dim">
                  {wallpaper.category} · {wallpaper.fileType}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => downloadImage(wallpaper.full, filename)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[4px] bg-darkroom-safelight px-5 py-3.5 text-sm font-semibold text-darkroom-print transition-colors hover:bg-darkroom-safelight-dim"
                >
                  <Download size={16} weight="bold" />
                  Download
                </button>
                <a
                  href={wallpaper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-[4px] border border-darkroom-border bg-darkroom-surface px-5 py-3.5 text-sm font-medium text-darkroom-text-muted transition-colors hover:border-darkroom-safelight/40 hover:text-darkroom-text"
                >
                  <ArrowSquareOut size={14} />
                  Source
                </a>
              </div>

              {wallpaper.category && (
                <button
                  type="button"
                  onClick={() => navigate(`/wallpapers?cat=${wallpaper.category.toLowerCase()}`)}
                  className="inline-flex items-center gap-2 self-start rounded-full border border-darkroom-border bg-darkroom-surface px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-darkroom-safelight-text transition-all hover:border-darkroom-safelight/50"
                >
                  <Tag size={12} />
                  Filter by {wallpaper.category}
                </button>
              )}

              {wallpaper.colors && wallpaper.colors.length > 0 && (
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-darkroom-text-dim">
                    Emulsion samples
                  </p>
                  <div className="flex gap-2">
                    {wallpaper.colors.map((color, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-[3px] border border-darkroom-text-dim/30"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="print-sheet rounded-[4px] p-5">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-darkroom-safelight" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-print">
                    Print record
                  </span>
                </div>
                {details.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {details.map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 border-b border-darkroom-print-muted/20 pb-3 last:border-b-0 last:pb-0"
                      >
                        <Icon
                          size={15}
                          className="shrink-0 text-darkroom-print-muted"
                        />
                        <div className="flex w-full items-baseline justify-between gap-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-darkroom-print-muted">
                            {label}
                          </p>
                          <p className="text-right text-sm text-darkroom-print">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto border-t border-darkroom-border/40 pt-4">
                <a
                  href="https://wallhaven.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-darkroom-text-dim hover:text-darkroom-text-muted"
                >
                  Frames developed from Wallhaven.cc
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

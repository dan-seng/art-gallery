import { useParams, useNavigate } from "react-router-dom";
import { useArtwork } from "../hooks/useArtwork";
import { downloadImage } from "../utils/download";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  Download,
  Palette,
  Ruler,
  CalendarBlank,
  MapPin,
} from "@phosphor-icons/react";

export default function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const { artwork, loading, error } = useArtwork(id);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_380px]">
          <div className="print-sheet animate-pulse rounded-[4px] p-6">
            <div className="aspect-[4/3] rounded-[2px] bg-darkroom-elevated" />
          </div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-darkroom-elevated" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-darkroom-elevated" />
            <div className="print-sheet h-72 animate-pulse rounded-[4px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-24 text-center md:px-8">
        <p className="font-amharic text-lg text-darkroom-text-muted">
          Artwork not found
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
    { icon: Palette, label: "Medium", value: artwork.medium },
    { icon: Ruler, label: "Dimensions", value: artwork.dimensions },
    { icon: CalendarBlank, label: "Date", value: artwork.date },
    { icon: MapPin, label: "Origin", value: artwork.origin },
  ].filter((d) => d.value);

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
              Print no. {String(artwork.id).toUpperCase()}
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
                    src={artwork.large}
                    alt={artwork.title}
                    className="mx-auto w-auto max-w-full object-contain"
                    style={{ maxHeight: "72vh" }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-darkroom-text-dim">
                <span>Developed print</span>
                <span>
                  {artwork.medium}
                  <span className="text-darkroom-text-dim/70">
                    {" "}
                    · {artwork.date}
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
                  {artwork.title}
                </h1>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-darkroom-text-dim">
                  {artwork.artist}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const filename = `${(artwork.title || "wallpaper").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`;
                  downloadImage(artwork.wallpaper || artwork.large, filename);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-darkroom-safelight px-5 py-3.5 text-sm font-semibold text-darkroom-print transition-colors hover:bg-darkroom-safelight-dim"
              >
                <Download size={16} weight="bold" />
                Download Wallpaper
              </button>

              {artwork.description && (
                <div
                  className="text-sm leading-relaxed text-darkroom-text-muted [&_a]:text-darkroom-safelight-text [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: artwork.description }}
                />
              )}

              {details.length > 0 && (
                <div className="print-sheet rounded-[4px] p-5">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-darkroom-safelight" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-darkroom-print">
                      Print record
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {details.map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 border-b border-darkroom-print-muted/20 pb-3 last:border-b-0 last:pb-0"
                      >
                        <Icon size={15} className="shrink-0 text-darkroom-print-muted" />
                        <div className="flex w-full items-baseline justify-between gap-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-darkroom-print-muted">
                            {label}
                          </p>
                          <p className="text-right text-sm text-darkroom-print">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto border-t border-darkroom-border/40 pt-4">
                <a
                  href="https://www.artic.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-darkroom-text-dim hover:text-darkroom-text-muted"
                >
                  Frames developed from the Art Institute of Chicago
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

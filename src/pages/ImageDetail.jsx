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
          <div className="aspect-[4/3] animate-pulse rounded-2xl bg-gallery-surface" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gallery-elevated" />
            <div className="h-5 w-1/2 animate-pulse rounded-lg bg-gallery-elevated" />
            <div className="h-24 w-full animate-pulse rounded-xl bg-gallery-elevated" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-24 text-center md:px-8">
        <p className="font-amharic text-lg text-gallery-text-muted">
          Artwork not found
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
    { icon: Palette, label: "Medium", value: artwork.medium },
    { icon: Ruler, label: "Dimensions", value: artwork.dimensions },
    { icon: CalendarBlank, label: "Date", value: artwork.date },
    { icon: MapPin, label: "Origin", value: artwork.origin },
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
              src={artwork.large}
              alt={artwork.title}
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
                {artwork.title}
              </h1>
              <p className="mt-1 text-base text-gallery-text-muted">
                {artwork.artist}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const filename = `${(artwork.title || "wallpaper").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`;
                downloadImage(artwork.wallpaper || artwork.large, filename);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gallery-gold px-5 py-3.5 text-sm font-semibold text-gallery-black transition-colors hover:bg-gallery-gold-dim"
            >
              <Download size={16} weight="bold" />
              Download Wallpaper
            </button>

            {artwork.description && (
              <div
                className="text-sm leading-relaxed text-gallery-text-muted [&_a]:text-gallery-gold [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: artwork.description }}
              />
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
                href="https://www.artic.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gallery-text-dim hover:text-gallery-text-muted"
              >
                Art Institute of Chicago Open Access
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

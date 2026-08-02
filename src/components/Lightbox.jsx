import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { downloadImage } from "../utils/download";

export default function Lightbox({ artwork, onClose, onPrev, onNext }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!artwork) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-darkroom-ink/98 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Prominent Back Button Top Left */}
        <button
          onClick={onClose}
          className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-all hover:border-darkroom-safelight/50 hover:bg-black/80 hover:text-darkroom-safelight-text md:text-sm"
        >
          <ArrowLeft size={16} />
          Back to Gallery
        </button>

        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-darkroom-text-muted backdrop-blur-md transition-colors hover:bg-white/10 hover:text-darkroom-text"
          aria-label="Close Preview"
        >
          <X size={18} />
        </button>

        {onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-darkroom-text-muted transition-colors hover:bg-white/10 hover:text-darkroom-text"
          >
            <ArrowLeft size={18} />
          </button>
        )}

        {onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-darkroom-text-muted transition-colors hover:bg-white/10 hover:text-darkroom-text md:right-8"
          >
            <ArrowRight size={18} />
          </button>
        )}

        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-h-[80vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={artwork.large}
            alt={artwork.title}
            className="max-h-[80vh] rounded-lg object-contain print-shadow"
          />
        </motion.div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-5">
          <div className="text-center">
            <p className="text-sm font-medium text-darkroom-text">
              {artwork.title}
            </p>
            <p className="text-xs text-darkroom-text-muted">{artwork.artist}</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const filename = `${(artwork.title || "wallpaper").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`;
              downloadImage(artwork.wallpaper || artwork.large, filename);
            }}
            className="flex h-9 items-center gap-2 rounded-[4px] bg-darkroom-safelight px-4 text-sm font-semibold text-darkroom-print transition-colors hover:bg-darkroom-safelight-dim"
          >
            <Download size={14} weight="bold" />
            Download
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-darkroom-border/40 bg-darkroom-ink text-darkroom-text">
      <div className="mx-auto flex min-h-[75vh] max-w-[1400px] flex-col justify-between px-6 py-12 md:px-12 md:py-16">
        {/* Top Section */}
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-md">
            <h2 className="font-amharic text-3xl font-normal tracking-tight text-darkroom-text md:text-4xl lg:text-5xl">
              Experience liftoff
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-darkroom-text-muted">
              Curated high-resolution digital art & wallpaper gallery powered by open-access museum archives and community wallpapers.
            </p>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-darkroom-safelight-text">
                Explore
              </span>
              <Link
                to="/"
                className="text-sm text-darkroom-text-muted transition-colors hover:text-darkroom-safelight-text"
              >
                Featured Art
              </Link>
              <Link
                to="/wallhaven"
                className="text-sm text-darkroom-text-muted transition-colors hover:text-darkroom-safelight-text"
              >
                Wallhaven Gallery
              </Link>
              <Link
                to="/search"
                className="text-sm text-darkroom-text-muted transition-colors hover:text-darkroom-safelight-text"
              >
                Search Catalog
              </Link>
              <a
                href="https://www.artic.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-darkroom-text-muted transition-colors hover:text-darkroom-safelight-text"
              >
                Art Institute API
              </a>
              <a
                href="https://wallhaven.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-darkroom-text-muted transition-colors hover:text-darkroom-safelight-text"
              >
                Wallhaven.cc
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-darkroom-safelight-text">
                Resources
              </span>
              <a
                href="https://www.artic.edu/open-access/open-access-image-licensing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-darkroom-text-muted transition-colors hover:text-darkroom-safelight-text"
              >
                Open Access
              </a>
              <a
                href="https://wallhaven.cc/faq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-darkroom-text-muted transition-colors hover:text-darkroom-safelight-text"
              >
                API Docs
              </a>
              <a
                href="#releases"
                className="text-sm text-darkroom-text-muted transition-colors hover:text-darkroom-safelight-text"
              >
                Changelog
              </a>
            </div>
          </div>
        </div>

        {/* Center Massive Branding Text */}
        <div className="my-10 select-none text-center py-6">
          <h1 className="font-amharic text-[14vw] font-normal leading-none tracking-wider text-darkroom-safelight-text drop-shadow-[0_10px_35px_rgba(232,106,58,0.16)] transition-transform duration-700 hover:scale-[1.02]">
            ብስብስ
          </h1>
        </div>

        {/* Bottom Legal Section */}
        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-darkroom-border/30 pt-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <a
              href="https://daniel-gidey.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-amharic text-lg font-bold tracking-wide text-darkroom-safelight-text transition-colors hover:opacity-80"
            >
              ብስብስ
            </a>
            <span className="text-xs text-darkroom-text-dim">
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://daniel-gidey.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-darkroom-safelight-text"
              >
                ብስብስ
              </a>
              . All rights reserved.
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-darkroom-text-muted">
            <a
              href="https://daniel-gidey.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-darkroom-safelight-text transition-colors hover:underline"
            >
              daniel-gidey.vercel.app
            </a>
            <a
              href="https://www.artic.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-darkroom-text"
            >
              Art Institute of Chicago
            </a>
            <a
              href="https://wallhaven.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-darkroom-text"
            >
              Wallhaven API
            </a>
            <a
              href="#privacy"
              className="transition-colors hover:text-darkroom-text"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="transition-colors hover:text-darkroom-text"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

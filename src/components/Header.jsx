import { Link, useLocation } from "react-router-dom";
import { MagnifyingGlass, House, GridFour, Image } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isWallpapers = location.pathname.startsWith("/wallpapers") || location.pathname.startsWith("/wallpaper/");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    if (isWallpapers) {
      navigate(`/wallpapers?q=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
    }
    setSearchOpen(false);
    setSearchVal("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gallery-border/50 bg-gallery-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-amharic text-xl font-normal tracking-wide text-gallery-gold transition-colors group-hover:text-gallery-gold-dim">
              ብስብስ
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <SourceLink to="/" active={location.pathname === "/" && !isWallpapers}>
              <GridFour size={15} weight="regular" />
              Art
            </SourceLink>
            <SourceLink to="/wallpapers" active={isWallpapers}>
              <Image size={15} weight="regular" />
              Wallpapers
            </SourceLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                autoFocus
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder={isWallpapers ? "Search wallpapers..." : "Search artworks..."}
                className="h-9 w-48 rounded-lg border border-gallery-border bg-gallery-surface px-3 text-sm text-gallery-text placeholder:text-gallery-text-dim focus:outline-none focus:ring-1 focus:ring-gallery-gold/30 md:w-64"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchVal("");
                }}
                className="text-gallery-text-muted hover:text-gallery-text"
              >
                &#x2715;
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 items-center gap-2 rounded-lg border border-gallery-border bg-gallery-surface px-3 text-sm text-gallery-text-muted transition-colors hover:border-gallery-gold/20 hover:text-gallery-text"
            >
              <MagnifyingGlass size={14} />
              <span className="hidden md:inline">Search</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function SourceLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-gallery-gold/10 text-gallery-gold"
          : "text-gallery-text-muted hover:bg-gallery-elevated hover:text-gallery-text"
      }`}
    >
      {children}
    </Link>
  );
}

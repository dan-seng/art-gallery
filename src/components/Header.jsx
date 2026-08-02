import { Link, useLocation, useNavigate } from "react-router-dom";
import { MagnifyingGlass, GridFour, Image, Sun, Moon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

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
    <header className="sticky top-0 z-50 border-b border-darkroom-border/50 bg-darkroom-ink/80 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-amharic text-xl font-normal tracking-wide text-darkroom-safelight-text transition-colors group-hover:text-darkroom-safelight">
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
                className="h-9 w-48 rounded-[4px] border border-darkroom-border bg-darkroom-surface px-3 text-sm text-darkroom-text placeholder:text-darkroom-text-dim focus:outline-none focus:ring-1 focus:ring-darkroom-safelight/40 md:w-64"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchVal("");
                }}
                className="text-darkroom-text-muted hover:text-darkroom-text"
              >
                &#x2715;
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 items-center gap-2 rounded-[4px] border border-darkroom-border bg-darkroom-surface px-3 text-sm text-darkroom-text-muted transition-colors hover:border-darkroom-safelight/40 hover:text-darkroom-text"
            >
              <MagnifyingGlass size={14} />
              <span className="hidden md:inline">Search</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-[4px] border border-darkroom-border bg-darkroom-surface text-darkroom-text-muted transition-colors hover:border-darkroom-safelight/40 hover:text-darkroom-safelight-text"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme mode"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
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
          ? "bg-darkroom-safelight/10 text-darkroom-safelight-text"
          : "text-darkroom-text-muted hover:bg-darkroom-elevated hover:text-darkroom-text"
      }`}
    >
      {children}
    </Link>
  );
}

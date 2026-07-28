/*
 * THESIS: Art is the hero, not the interface. Ethiopian Gallery Night — warm spotlights on art in a dark gallery space, Amharic typography as the brand voice.
 * OWN-WORLD: Near-black ground (#0a0a0a), warm gold accent (#d4a853), off-white text (#f5f0e8). Abyssinica SIL + Outfit + JetBrains Mono. Minimal chrome, maximum art.
 * STORY: Visitor discovers art that resonates, previews it full-screen, downloads it as wallpaper. The browsing experience itself is beautiful.
 * FIRST VIEWPORT: Full-bleed featured artwork with Amharic title overlay. Art fills the frame, navigation recedes.
 * FORM: Experience mode gallery. Masonry grid with staggered reveal. Lightbox with keyboard nav. Category pills for filtering.
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import ImageDetail from "./pages/ImageDetail";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import WallhavenGallery from "./pages/WallhavenGallery";
import WallpaperDetail from "./pages/WallpaperDetail";

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <BrowserRouter>
        <div className="flex min-h-[100dvh] flex-col bg-gallery-black">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:category" element={<Gallery />} />
              <Route path="/artwork/:id" element={<ImageDetail />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/wallpapers" element={<WallhavenGallery />} />
              <Route path="/wallpaper/:id" element={<WallpaperDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ReactLenis>
  );
}

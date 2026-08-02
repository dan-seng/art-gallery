/*
 * THESIS: Art is the hero, not the interface. The Darkroom — a nocturnal print lab where every wallpaper and artwork is a developed frame on a contact sheet. Amharic typography as the brand voice.
 * OWN-WORLD: Silver-black ground (#0a0808), safelight amber accent (#e86a3a), photo-paper cream (#efe6d6). Abyssinica SIL + Outfit + JetBrains Mono. Minimal chrome, maximum print.
 * STORY: Visitor discovers art that resonates, previews it as a developed print, downloads it as wallpaper.
 * FIRST VIEWPORT: Aura-lit masthead with the Amharic heading and a paper Print Record card. Prints fill the contact sheet.
 * FORM: Experience mode gallery. Masonry contact-sheet grid with staggered reveal. Enlarger detail view. Category pills for filtering.
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
        <div className="flex min-h-[100dvh] flex-col bg-darkroom-ink">
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

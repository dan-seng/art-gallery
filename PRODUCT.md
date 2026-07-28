# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Design-conscious people looking for high-quality art wallpapers for their devices, and art enthusiasts browsing a museum collection for personal enjoyment. Both audiences are equally important.

## Product Purpose

Provide a beautiful, curated experience for discovering and downloading art as wallpapers from the Art Institute of Chicago's open collection and Wallhaven. Success means users find art they love and download it as a wallpaper, or spend time exploring the collection and feel inspired.

## Positioning

A curated, wallpaper-first art browsing experience that feels like an art exhibition — not a database dump. The site itself is an aesthetic nocturnal gallery experience.

## Operating Context

Users arrive from design communities, social media, or direct links. They browse, discover art that resonates, preview it at full resolution, and download it as a wallpaper. Some will browse casually, others will search for specific styles or artists.

## Capabilities and Constraints

- Two wallpaper sources: Art Institute of Chicago open API (`api.artic.edu`) for museum art, Wallhaven.cc API for community wallpapers
- Art Institute artwork is in the public domain; Wallhaven content is user-uploaded (SFW filter default)
- Must work seamlessly across desktop and mobile viewports
- Images served via IIIF protocol (Art Institute) or direct URLs (Wallhaven)
- Purely client-side — no user accounts, no authentication, no backend

## Brand Commitments

- Name: ብስብስ (stylized Amharic typography)
- Prominent Amharic typography as a visual brand anchor
- Pure Nocturnal Monochrome gallery aesthetic with warm bronze accents
- The site feels like a nocturnal art exhibition, receding to highlight the artwork

## Evidence on Hand

- Working React + Vite + Tailwind CSS codebase with dual API integration
- Components: Header (source toggle), Footer, ImageCard, WallhavenCard, Lightbox, CategoryPills, SkeletonCard
- Routes: Home (Art), Category gallery, Artwork detail, Search, Wallpapers (Wallhaven), Wallpaper detail
- Art Institute API layer: search, category filtering, pagination, featured artworks
- Wallhaven API layer: search, category filter (General/Anime/People), sort (Top/Favorites/Popular/New/Random), pagination

## Product Principles

1. Art leads — the interface recedes, the artwork is the hero
2. Curated feel over exhaustive catalog — quality over quantity
3. Effortless downloading — one-click download from any view or card
4. The browsing experience itself is beautiful and worthy of the art
5. Amharic typography as a distinctive brand element

## Accessibility & Inclusion

Standard web accessibility — keyboard navigation, alt text on images, proper heading hierarchy, sufficient contrast in dark mode.

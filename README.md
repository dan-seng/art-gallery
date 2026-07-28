<div align="center">

# ብስብስ — BSBS Gallery

**A nocturnal wallpaper & high-resolution digital art discovery experience.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-d4a853?style=for-the-badge)](#license)

[**Live Demo**](https://daniel-gidey.vercel.app) • [**Explore Features**](#features) • [**Tech Stack**](#tech-stack) • [**Getting Started**](#getting-started)

---

</div>

## Overview

**ብስብስ (BSBS)** is a wallpaper-first digital art gallery designed with an **Ethiopian Gallery Night** aesthetic — pitch-black nocturnal backgrounds, subtle warm bronze accents (`#c59b27`), and bold Amharic typography as the visual brand anchor.

Unlike generic image aggregators, **ብስብስ** recedes into the background so the artwork shines. It bridges two distinct content ecosystems:
1. **Art Institute of Chicago Open Access Archive**: Public domain masterpieces served via the IIIF high-res image protocol.
2. **Wallhaven Community API**: Curated community wallpapers for desktop and mobile devices.

---

## ✨ Features

- 🏛️ **Dual Art Engine**: Seamlessly toggle between classical museum masterworks (AIC) and modern digital wallpapers (Wallhaven).
- 🖼️ **Masonry Layout**: Adaptive multi-column grid (`2 cols` mobile $\rightarrow$ `3 cols` tablet $\rightarrow$ `4 cols` desktop).
- 🔍 **Real-Time Search & Category Pills**: Instant visual filtering by subject, style, or community tag.
- 🔍 **Full-screen Lightbox**: Keyboard-accessible (`Escape`, `←`, `→`) immersive preview mode.
- ⚡ **One-Click Downloads**: Effortless high-resolution wallpaper downloads directly from any card or preview modal.
- 🎭 **Smooth Micro-Animations**: Powered by Motion for staggered card entrances and spring-loaded dialog transitions.
- ♿ **Accessible & Dark-First**: Responsive across all screen sizes with high contrast in nocturnal mode.

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Core Framework** | [React 19](https://react.dev) + [Vite 8](https://vitejs.dev) |
| **Routing** | [React Router v7](https://reactrouter.com) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **Animations** | [Motion (Framer Motion v12)](https://motion.dev) |
| **Icons** | [Phosphor Icons](https://phosphoricons.com) |
| **APIs** | [Art Institute of Chicago API](https://api.artic.edu) & [Wallhaven API](https://wallhaven.cc/help/api) |
| **Linter & Quality** | [Oxlint](https://oxc-project.github.io) & [Impeccable CLI](https://impeccable.style) |

---

## 📁 Project Structure

```text
wallpaper-site/
├── public/                # Static assets (favicons, icons)
├── src/
│   ├── api/               # API clients for Art Institute & Wallhaven
│   ├── assets/            # Static brand media & SVGs
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx         # Sticky navigation with search & source toggle
│   │   ├── Footer.jsx         # Branded Amharic footer & author attribution
│   │   ├── ImageCard.jsx      # AIC artwork card with hover actions
│   │   ├── WallhavenCard.jsx  # Wallhaven wallpaper card
│   │   ├── Lightbox.jsx       # Full-screen modal viewer
│   │   ├── CategoryPills.jsx  # Category filter pills
│   │   └── SkeletonCard.jsx   # Loading state placeholder
│   ├── hooks/             # Custom React hooks (useArtworks, useWallhaven)
│   ├── pages/             # Page components (Home, Featured, Detail, Search)
│   ├── utils/             # Helper utilities (download handlers)
│   ├── App.jsx            # Application routing & layout frame
│   ├── main.jsx           # React entry point
│   └── index.css          # Core CSS variables, typography & design tokens
├── DESIGN.md              # Impeccable design system specification
├── PRODUCT.md             # Impeccable product vision & positioning
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/daniel-gidey/wallpaper-site.git
   cd wallpaper-site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🎨 Design System

**ብስብስ** uses a custom design system documented in [`DESIGN.md`](file:///home/dan-seng/Projects/wallpaper-site/DESIGN.md):

- **Palette**: `gallery-black` (`#050505`), `gallery-surface` (`#111113`), `gallery-gold/bronze` (`#c59b27`), `gallery-text` (`#f4f4f5`).
- **Typography**: 
  - **Brand / Display**: `Abyssinica SIL` (Amharic Script: ብስብስ)
  - **Body**: `Outfit`
  - **Metadata**: `JetBrains Mono`

---

## 👤 Author

**Daniel Gidey**
- Website: [daniel-gidey.vercel.app](https://daniel-gidey.vercel.app)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

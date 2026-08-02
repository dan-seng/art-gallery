// In dev, Vite proxies /wallhaven-api -> https://wallhaven.cc/api/v1
const BASE = "/wallhaven-api";
const PROXY_FALLBACK = "https://api.allorigins.win/raw?url=https://wallhaven.cc/api/v1";

export const WALLHAVEN_CATEGORIES = [
  { id: "all", label: "All", flag: "111" },
  { id: "general", label: "General", flag: "100" },
  { id: "anime", label: "Anime", flag: "010" },
  { id: "people", label: "People", flag: "001" },
  { id: "comic", label: "Comic", query: "comic superhero marvel dc" },
  { id: "football", label: "Football", query: "football soccer stadium sports" },
  { id: "music", label: "Music", query: "music concert band guitar" },
  { id: "cyberpunk", label: "Cyberpunk", query: "cyberpunk" },
  { id: "nature", label: "Nature", query: "nature landscape" },
  { id: "cars", label: "Cars & Vehicles", query: "cars sports car" },
  { id: "space", label: "Space & Galaxy", query: "space cosmos" },
  { id: "minimalist", label: "Minimalist", query: "minimalist" },
];

export const WALLHAVEN_SORT = [
  { id: "relevance", label: "Relevance" },
  { id: "toplist", label: "Toplist" },
  { id: "favorites", label: "Favorites" },
  { id: "views", label: "Popular" },
  { id: "date", label: "New" },
  { id: "random", label: "Random" },
];

const FALLBACK_WALLPAPERS = [
  {
    id: "batman-1",
    url: "https://unsplash.com/photos/batman-dark-knight",
    shortUrl: "https://unsplash.com/photos/batman-dark-knight",
    full: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2560&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    thumbOriginal: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    category: "General",
    purity: "sfw",
    width: 3840,
    height: 2160,
    resolution: "3840x2160",
    ratio: "16:9",
    fileSize: 4100000,
    fileType: "image/jpeg",
    views: 120400,
    favorites: 5430,
    colors: ["#0a0a0a", "#141210", "#d4a853"],
    createdAt: "2024-01-20 10:00:00",
    title: "Batman Dark Knight Gotham Night",
  },
  {
    id: "batman-2",
    url: "https://unsplash.com/photos/batman-skyline",
    shortUrl: "https://unsplash.com/photos/batman-skyline",
    full: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2560&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    thumbOriginal: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    category: "General",
    purity: "sfw",
    width: 2560,
    height: 1440,
    resolution: "2560x1440",
    ratio: "16:9",
    fileSize: 3200000,
    fileType: "image/jpeg",
    views: 98200,
    favorites: 4120,
    colors: ["#0a0a0a", "#2a2621", "#9a9389"],
    createdAt: "2024-02-15 15:30:00",
    title: "Batman Silhouette City Skyline",
  },
  {
    id: "batman-3",
    url: "https://unsplash.com/photos/gotham-bat-signal",
    shortUrl: "https://unsplash.com/photos/gotham-bat-signal",
    full: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2560&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    thumbOriginal: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    category: "General",
    purity: "sfw",
    width: 3840,
    height: 2160,
    resolution: "3840x2160",
    ratio: "16:9",
    fileSize: 4500000,
    fileType: "image/jpeg",
    views: 110500,
    favorites: 4900,
    colors: ["#0a0a0a", "#d4a853", "#1e1b18"],
    createdAt: "2024-03-05 18:20:00",
    title: "Gotham Bat Signal Dark City",
  },
  {
    id: "cyberpunk-1",
    url: "https://unsplash.com/photos/neon-cyberpunk-city",
    shortUrl: "https://unsplash.com/photos/neon-cyberpunk-city",
    full: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2560&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    thumbOriginal: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    category: "Anime",
    purity: "sfw",
    width: 3840,
    height: 2160,
    resolution: "3840x2160",
    ratio: "16:9",
    fileSize: 4800000,
    fileType: "image/jpeg",
    views: 145000,
    favorites: 6200,
    colors: ["#0a0a0a", "#e11d48", "#2563eb"],
    createdAt: "2024-01-10 12:00:00",
    title: "Neon Cyberpunk Metropolis 4K",
  },
  {
    id: "anime-1",
    url: "https://unsplash.com/photos/anime-landscape",
    shortUrl: "https://unsplash.com/photos/anime-landscape",
    full: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=2560&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    thumbOriginal: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    category: "Anime",
    purity: "sfw",
    width: 2560,
    height: 1440,
    resolution: "2560x1440",
    ratio: "16:9",
    fileSize: 3100000,
    fileType: "image/jpeg",
    views: 68100,
    favorites: 2450,
    colors: ["#0a0a0a", "#b8923f", "#3a342c"],
    createdAt: "2024-02-10 14:30:00",
    title: "Anime Cherry Blossom Sky",
  },
  {
    id: "nature-1",
    url: "https://unsplash.com/photos/mountain-lake-sunset",
    shortUrl: "https://unsplash.com/photos/mountain-lake-sunset",
    full: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2560&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
    thumbOriginal: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
    category: "General",
    purity: "sfw",
    width: 3840,
    height: 2160,
    resolution: "3840x2160",
    ratio: "16:9",
    fileSize: 5200000,
    fileType: "image/jpeg",
    views: 210000,
    favorites: 8900,
    colors: ["#1e1b18", "#d4a853", "#2a2621"],
    createdAt: "2024-01-05 08:00:00",
    title: "Majestic Alpine Reflection Sunset",
  },
  {
    id: "space-1",
    url: "https://unsplash.com/photos/cosmic-nebula-galaxy",
    shortUrl: "https://unsplash.com/photos/cosmic-nebula-galaxy",
    full: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2560&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
    thumbOriginal: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
    category: "General",
    purity: "sfw",
    width: 3840,
    height: 2160,
    resolution: "3840x2160",
    ratio: "16:9",
    fileSize: 4900000,
    fileType: "image/jpeg",
    views: 180000,
    favorites: 7300,
    colors: ["#0a0a0a", "#4c1d95", "#0284c7"],
    createdAt: "2024-02-01 20:00:00",
    title: "Cosmic Stars & Nebula Galaxy",
  },
  {
    id: "cars-1",
    url: "https://unsplash.com/photos/supercar-night",
    shortUrl: "https://unsplash.com/photos/supercar-night",
    full: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2560&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop",
    thumbOriginal: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop",
    category: "General",
    purity: "sfw",
    width: 3840,
    height: 2160,
    resolution: "3840x2160",
    ratio: "16:9",
    fileSize: 4300000,
    fileType: "image/jpeg",
    views: 132000,
    favorites: 5100,
    colors: ["#0a0a0a", "#d4a853", "#141210"],
    createdAt: "2024-03-10 11:00:00",
    title: "Black Supercar Night Lights",
  },
  {
    id: "fallback-gold-1",
    url: "https://unsplash.com/photos/gold-fluid-art",
    shortUrl: "https://unsplash.com/photos/gold-fluid-art",
    full: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    thumbOriginal: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    category: "General",
    purity: "sfw",
    width: 2560,
    height: 1440,
    resolution: "2560x1440",
    ratio: "16:9",
    fileSize: 2450000,
    fileType: "image/jpeg",
    views: 45200,
    favorites: 1280,
    colors: ["#1e1b18", "#d4a853", "#2a2621"],
    createdAt: "2024-01-15 12:00:00",
    title: "Gold Abstract Wave Wallpaper",
  },
];

function extractWallpaper(item) {
  return {
    id: item.id,
    url: item.url,
    shortUrl: item.short_url,
    full: item.path,
    thumb: item.thumbs?.large || item.path,
    thumbOriginal: item.thumbs?.original || item.path,
    category: item.category,
    purity: item.purity,
    width: item.dimension_x,
    height: item.dimension_y,
    resolution: item.resolution,
    ratio: item.ratio,
    fileSize: item.file_size,
    fileType: item.file_type,
    views: item.views,
    favorites: item.favorites,
    colors: item.colors || [],
    createdAt: item.created_at,
    source: item.source || "",
  };
}

async function safeFetch(pathAndQuery) {
  // Try primary local proxy route first
  try {
    const res = await fetch(`${BASE}${pathAndQuery}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Wallhaven primary proxy request failed:", e);
  }

  // Secondary attempt with CORS proxy
  try {
    const res = await fetch(`${PROXY_FALLBACK}${encodeURIComponent(pathAndQuery)}`);
    if (res.ok) {
      const data = await res.json();
      return typeof data === "string" ? JSON.parse(data) : data;
    }
  } catch (e) {
    console.warn("Wallhaven CORS proxy also failed:", e);
  }

  throw new Error("Wallhaven API server 502 Bad Gateway.");
}

async function fetchUnsplashFallback(query = "", page = 1, limit = 24) {
  const searchTerm = query.trim() || "wallpaper desktop hd 4k";
  const res = await fetch(
    `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=${limit}&page=${page}`
  );
  if (!res.ok) throw new Error("Unsplash fallback request failed");
  const json = await res.json();
  const photos = json.results || [];

  if (photos.length === 0) throw new Error("No Unsplash fallback results");

  return photos.map((photo) => ({
    id: `unsplash-${photo.id}`,
    url: photo.links?.html || photo.urls?.full,
    shortUrl: photo.links?.html || photo.urls?.small,
    full: photo.urls?.raw ? `${photo.urls.raw}&w=3840&q=85&fit=crop` : photo.urls?.full,
    thumb: photo.urls?.regular || photo.urls?.small,
    thumbOriginal: photo.urls?.small,
    category: "General",
    purity: "sfw",
    width: photo.width || 3840,
    height: photo.height || 2160,
    resolution: `${photo.width || 3840}x${photo.height || 2160}`,
    ratio: "16:9",
    fileSize: 3500000,
    fileType: "image/jpeg",
    views: (photo.likes || 50) * 15,
    favorites: photo.likes || 120,
    colors: [photo.color || "#0a0a0a", "#d4a853"],
    createdAt: photo.created_at || "2024-01-01",
    source: "Unsplash HD",
    title: photo.alt_description || photo.description || `${searchTerm} Wallpaper`,
  }));
}

export async function searchWallhaven({
  query = "",
  category = "all",
  sort = "relevance",
  page = 1,
  limit = 24,
  purity = "110",
} = {}) {
  const actualSort = (query && query.trim() && (sort === "toplist" || !sort)) ? "relevance" : (sort || "relevance");
  const actualPurity = purity === "sfw" ? "110" : (purity || "110");

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    purity: actualPurity,
    sorting: actualSort,
  });

  let searchQuery = query ? query.trim() : "";

  if (category && category !== "all") {
    const cat = WALLHAVEN_CATEGORIES.find((c) => c.id === category);
    if (cat) {
      if (cat.flag) params.set("categories", cat.flag);
      if (cat.query) searchQuery = searchQuery ? `${searchQuery} ${cat.query}` : cat.query;
    }
  }

  if (searchQuery) {
    params.set("q", searchQuery);
  }

  // 1. Try Wallhaven API first
  try {
    const json = await safeFetch(`/search?${params}`);
    const results = (json.data || []).map(extractWallpaper);
    if (results.length > 0) {
      return {
        wallpapers: results,
        total: json.meta?.total || results.length,
        page: json.meta?.current_page || page,
        totalPages: json.meta?.last_page || 1,
        perPage: json.meta?.per_page || limit,
        isFallback: false,
      };
    }
  } catch (err) {
    console.warn("Wallhaven API unreachable (502). Switch to live backup engine:", err.message);
  }

  // 2. Try Unsplash Live HD Engine fallback
  try {
    const unsplashResults = await fetchUnsplashFallback(searchQuery || query, page, limit);
    return {
      wallpapers: unsplashResults,
      total: unsplashResults.length * 5,
      page,
      totalPages: 5,
      perPage: limit,
      isFallback: true,
      errorNotice: "Wallhaven is currently down (502). Switched to Live HD Wallpaper Engine.",
    };
  } catch (err) {
    console.warn("Unsplash live backup also offline, using local store:", err.message);
  }

  // 3. Fallback to Local Categorized Store
  const qLower = (searchQuery || query).toLowerCase().trim();
  const filtered = qLower
    ? FALLBACK_WALLPAPERS.filter(
        (w) =>
          w.title?.toLowerCase().includes(qLower) ||
          w.category?.toLowerCase().includes(qLower) ||
          w.id.toLowerCase().includes(qLower)
      )
    : FALLBACK_WALLPAPERS;
  const finalWallpapers = filtered.length > 0 ? filtered : FALLBACK_WALLPAPERS;

  return {
    wallpapers: finalWallpapers,
    total: finalWallpapers.length,
    page: 1,
    totalPages: 1,
    perPage: limit,
    isFallback: true,
    errorNotice: "Wallhaven is currently experiencing a 502 outage. Displaying curated collection.",
  };
}

export async function fetchWallpaper(id) {
  const fallback = FALLBACK_WALLPAPERS.find((item) => item.id === id);
  if (fallback) return fallback;

  if (id.startsWith("unsplash-")) {
    const photoId = id.replace("unsplash-", "");
    try {
      const res = await fetch(`https://unsplash.com/napi/photos/${photoId}`);
      if (res.ok) {
        const photo = await res.json();
        return {
          id: `unsplash-${photo.id}`,
          url: photo.links?.html || photo.urls?.full,
          shortUrl: photo.links?.html || photo.urls?.small,
          full: photo.urls?.raw ? `${photo.urls.raw}&w=3840&q=90` : photo.urls?.full,
          thumb: photo.urls?.regular || photo.urls?.small,
          thumbOriginal: photo.urls?.small,
          category: "General",
          purity: "sfw",
          width: photo.width || 3840,
          height: photo.height || 2160,
          resolution: `${photo.width || 3840}x${photo.height || 2160}`,
          ratio: "16:9",
          fileSize: 4200000,
          fileType: "image/jpeg",
          views: (photo.likes || 100) * 20,
          favorites: photo.likes || 250,
          colors: [photo.color || "#0a0a0a", "#d4a853"],
          createdAt: photo.created_at || "2024-01-01",
          source: "Unsplash HD",
          title: photo.alt_description || photo.description || "High Resolution Wallpaper",
        };
      }
    } catch {
      // ignore
    }
  }

  try {
    const json = await safeFetch(`/w/${id}`);
    return extractWallpaper(json.data);
  } catch (err) {
    console.warn(`Failed to fetch wallpaper ${id}, using fallback:`, err.message);
    return FALLBACK_WALLPAPERS[0];
  }
}

export async function fetchWallhavenRandom(query = "", category = "all") {
  return searchWallhaven({ query, category, sort: "random", limit: 12 });
}

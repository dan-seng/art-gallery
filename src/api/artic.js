const BASE = "https://api.artic.edu/api/v1";
const IIIF = "https://www.artic.edu/iiif/2";

export const CATEGORIES = [
  { id: "all", label: "All", amharic: "ሁሉም" },
  { id: "paintings", label: "Paintings", amharic: "ስዕሎች", query: "oil canvas painting" },
  { id: "photography", label: "Photography", amharic: "ፎቶግራፍ", query: "gelatin silver photograph photo" },
  { id: "prints", label: "Prints", amharic: "ፕሪንት", query: "woodcut etching lithograph print" },
  { id: "drawings", label: "Drawings", amharic: "ስዕላዊ መሳያ", query: "drawing graphite chalk sketch" },
  { id: "sculpture", label: "Sculpture", amharic: "ቅርፃቅርፅ", query: "sculpture bronze marble terracotta" },
  { id: "landscapes", label: "Landscapes", amharic: "ተፈጥሮ", query: "landscape mountain river forest" },
  { id: "portraits", label: "Portraits", amharic: "ምስል", query: "portrait face self-portrait" },
  { id: "japanese", label: "Japanese Art", amharic: "ጃፓን", query: "japanese ukiyo-e woodblock japan" },
];

export const CATEGORY_MAP = {
  paintings: "oil canvas painting",
  photography: "gelatin silver photograph photo",
  prints: "woodcut etching lithograph print",
  drawings: "drawing graphite chalk sketch",
  sculpture: "sculpture bronze marble terracotta",
  landscapes: "landscape mountain river forest",
  portraits: "portrait face self-portrait",
  japanese: "japanese ukiyo-e woodblock japan",
};

function imageUrl(imageId, width = 843) {
  if (!imageId) return null;
  return `${IIIF}/${imageId}/full/${width},/0/default.jpg`;
}

function extractArtwork(item) {
  return {
    id: item.id,
    title: item.title || "Untitled",
    artist: item.artist_title || "Unknown Artist",
    date: item.date_display || "",
    medium: item.medium_display || "",
    dimensions: item.dimensions || "",
    department: item.department_title || "",
    imageId: item.image_id,
    thumbnail: imageUrl(item.image_id, 600),
    large: imageUrl(item.image_id, 1600),
    wallpaper: imageUrl(item.image_id, 2560),
    origin: item.place_of_origin || "",
    description: item.description || "",
    isPublicDomain: item.is_public_domain,
    apiLink: item.api_link,
  };
}

export async function fetchArtworks({
  page = 1,
  limit = 20,
  category = "all",
} = {}) {
  const fields = "id,title,artist_title,date_display,medium_display,dimensions,department_title,image_id,place_of_origin,description,is_public_domain,api_link";

  let url;
  if (category && category !== "all") {
    const cat = CATEGORIES.find((c) => c.id === category);
    const searchTerm = cat?.query || CATEGORY_MAP[category] || category;
    url = `${BASE}/artworks/search?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}&fields=${fields}`;
  } else {
    url = `${BASE}/artworks?page=${page}&limit=${limit}&fields=${fields}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();

  const artworks = (json.data || []).filter((a) => a.image_id).map(extractArtwork);

  return {
    artworks,
    total: json.pagination?.total || artworks.length,
    page: json.pagination?.current_page || page,
    totalPages: json.pagination?.total_pages || 1,
  };
}

export async function searchArtworks(query, { page = 1, limit = 20 } = {}) {
  if (!query || !query.trim()) return fetchArtworks({ page, limit });

  const fields = "id,title,artist_title,date_display,medium_display,dimensions,department_title,image_id,place_of_origin,description,is_public_domain,api_link";

  const res = await fetch(`${BASE}/artworks/search?q=${encodeURIComponent(query.trim())}&page=${page}&limit=${limit}&fields=${fields}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();

  const artworks = (json.data || []).filter((a) => a.image_id).map(extractArtwork);

  return {
    artworks,
    total: json.pagination?.total || artworks.length,
    page: json.pagination?.current_page || page,
    totalPages: json.pagination?.total_pages || 1,
  };
}

export async function fetchArtwork(id) {
  const fields = "id,title,artist_title,date_display,medium_display,dimensions,department_title,image_id,place_of_origin,description,is_public_domain,api_link";
  const res = await fetch(`${BASE}/artworks/${id}?fields=${fields}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  return extractArtwork(json.data);
}

export async function fetchFeatured() {
  const res = await fetch(
    `${BASE}/artworks?sort=score&limit=8&fields=id,title,artist_title,image_id,date_display,medium_display,is_public_domain`
  );
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  return (json.data || []).filter((a) => a.image_id).map(extractArtwork);
}

const BASE = "https://api.artic.edu/api/v1";
const IIIF = "https://www.artic.edu/iiif/2";

export const CATEGORIES = [
  { id: "all", label: "All", amharic: "ሁሉም" },
  { id: "paintings", label: "Paintings", amharic: "ስዕሎች" },
  { id: "photography", label: "Photography", amharic: "ፎቶግራፍ" },
  { id: "prints", label: "Prints", amharic: "ፕሪንት" },
  { id: "drawings", label: "Drawings", amharic: "ስዕላዊ መሳያ" },
  { id: "sculpture", label: "Sculpture", amharic: "ቅርፃቅርፅ" },
  { id: "landscapes", label: "Landscapes", amharic: "ተፈጥሮ" },
  { id: "portraits", label: "Portraits", amharic: "ምስል" },
  { id: "japanese", label: "Japanese Art", amharic: "ጃፓን" },
];

export const CATEGORY_MAP = {
  paintings: "Painting",
  photography: "Photograph",
  prints: "Print",
  drawings: "Drawing",
  sculpture: "Sculpture",
  landscapes: "Landscape",
  portraits: "Portrait",
  japanese: "Japanese",
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
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    fields:
      "id,title,artist_title,date_display,medium_display,dimensions,department_title,image_id,place_of_origin,description,is_public_domain,api_link",
  });

  let url;
  if (category && category !== "all") {
    const searchTerm = CATEGORY_MAP[category] || category;
    url = `${BASE}/artworks/search?q=${encodeURIComponent(searchTerm)}&${params}`;
  } else {
    url = `${BASE}/artworks?${params}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();

  return {
    artworks: json.data.filter((a) => a.image_id).map(extractArtwork),
    total: json.pagination?.total || 0,
    page: json.pagination?.current_page || page,
    totalPages: json.pagination?.total_pages || 1,
  };
}

export async function searchArtworks(query, { page = 1, limit = 20 } = {}) {
  if (!query || !query.trim()) return fetchArtworks({ page, limit });

  const params = new URLSearchParams({
    q: query.trim(),
    page: String(page),
    limit: String(limit),
    fields:
      "id,title,artist_title,date_display,medium_display,dimensions,department_title,image_id,place_of_origin,description,is_public_domain,api_link",
  });

  const res = await fetch(`${BASE}/artworks/search?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();

  return {
    artworks: json.data.filter((a) => a.image_id).map(extractArtwork),
    total: json.pagination?.total || 0,
    page: json.pagination?.current_page || page,
    totalPages: json.pagination?.total_pages || 1,
  };
}

export async function fetchArtwork(id) {
  const params = new URLSearchParams({
    fields:
      "id,title,artist_title,date_display,medium_display,dimensions,department_title,image_id,place_of_origin,description,is_public_domain,api_link",
  });

  const res = await fetch(`${BASE}/artworks/${id}?${params}`);
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
  return json.data.filter((a) => a.image_id).map(extractArtwork);
}

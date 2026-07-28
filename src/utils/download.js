export async function downloadImage(url, filename) {
  if (!url) return;

  // Generate a clean filename if not provided
  if (!filename) {
    const extMatch = url.match(/\.(jpg|jpeg|png|webp|gif)($|\?)/i);
    const ext = extMatch ? extMatch[1] : "jpg";
    filename = `wallpaper-${Date.now()}.${ext}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  } catch (err) {
    console.warn("Direct blob download failed, falling back to element click:", err);
    // Fallback if CORS prevents fetch
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

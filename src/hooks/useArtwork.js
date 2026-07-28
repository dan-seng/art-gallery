import { useState, useEffect, useCallback } from "react";
import { fetchArtwork, fetchFeatured, searchArtworks } from "../api/artic";

export function useArtwork(id) {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);
    fetchArtwork(id)
      .then((data) => {
        if (!cancelled) setArtwork(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { artwork, loading, error };
}

export function useFeatured() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchFeatured()
      .then((data) => {
        if (!cancelled) setArtworks(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { artworks, loading };
}

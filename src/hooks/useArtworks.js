import { useState, useEffect, useCallback } from "react";
import { fetchArtworks, searchArtworks } from "../api/artic";

export function useArtworks({ category = "all", query = "", limit = 20 } = {}) {
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        if (append) setLoadingMore(true);
        else setLoading(true);
        setError(null);

        const result = query.trim()
          ? await searchArtworks(query.trim(), { page: pageNum, limit })
          : await fetchArtworks({ page: pageNum, limit, category });

        setArtworks((prev) =>
          append ? [...prev, ...result.artworks] : result.artworks
        );
        setTotalPages(result.totalPages);
        setPage(result.page);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [category, query, limit]
  );

  useEffect(() => {
    setPage(1);
    load(1, false);
  }, [load]);

  const loadMore = useCallback(() => {
    if (page < totalPages && !loadingMore) {
      load(page + 1, true);
    }
  }, [page, totalPages, loadingMore, load]);

  return { artworks, loading, loadingMore, error, page, totalPages, loadMore };
}

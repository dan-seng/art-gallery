import { useState, useEffect, useCallback } from "react";
import { searchWallhaven } from "../api/wallhaven";

export function useWallhaven({
  query = "",
  category = "all",
  sort = "toplist",
  limit = 24,
} = {}) {
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);

  const load = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        if (append) setLoadingMore(true);
        else setLoading(true);
        setError(null);

        const result = await searchWallhaven({
          query,
          category,
          sort,
          page: pageNum,
          limit,
        });

        setWallpapers((prev) =>
          append ? [...prev, ...result.wallpapers] : result.wallpapers
        );
        setTotalPages(result.totalPages);
        setPage(result.page);
        setIsFallback(Boolean(result.isFallback));
        setErrorNotice(result.errorNotice || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [query, category, sort, limit]
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

  return { wallpapers, loading, loadingMore, error, isFallback, errorNotice, page, totalPages, loadMore };
}

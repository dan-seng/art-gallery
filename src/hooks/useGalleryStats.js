import { useEffect, useState } from 'react';
import { CATEGORIES } from '../api/artic';

export function useGalleryStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Count total categories
    const totalCategories = CATEGORIES.length - 1; // Excluding 'all'

    // Estimate total artworks by multiplying categories by estimate
    // In a real app this might come from API
    const estimatedPerCategory = 25;
    const totalEstimated = totalCategories * estimatedPerCategory;

    setStats({
      total: totalEstimated,
      categories: totalCategories,
    });
  }, []);

  return stats;
}
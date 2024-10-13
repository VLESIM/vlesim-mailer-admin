import { useState, useEffect, useCallback } from 'react';

interface UseApiGetResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseApiGetProps {
  url: string | null;
  skip?: boolean;
}

export function useApiGet<T>({
  url,
  skip = false,
}: UseApiGetProps): UseApiGetResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('authToken');

  const fetchData = useCallback(async () => {
    if (!url || skip) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(
        `Failed to fetch data. ${e instanceof Error ? e.message : String(e)}`,
      );
      console.error('Error fetching data:', e);
    } finally {
      setLoading(false);
    }
  }, [url, token, skip]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

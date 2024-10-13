import { useEffect, useState } from 'react';

interface BodyData {
  [key: string]: string | number | boolean | BodyData;
}

interface UseFetchParams {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyData;
  dependencies?: unknown[];
  timePolling?: number;
}

export function useFetch<T>({
  path,
  method,
  body,
  dependencies,
  timePolling,
}: UseFetchParams) {
  const [data, setData] = useState<T | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Error | null>();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(path, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          ...(body && { body: JSON.stringify(body) }),
        });

        if (!response.ok) {
          setErrorMessage(new Error(`Failed to fetch data from ${path}`));
          throw new Error(`Failed to fetch data from ${path}`);
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error as Error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (timePolling) {
      fetchData();
      const interval = setInterval(fetchData, timePolling);
      return () => clearInterval(interval);
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, method, path, token, ...(dependencies || []), timePolling]);

  return { data, isLoading, errorMessage };
}

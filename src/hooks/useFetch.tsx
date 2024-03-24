import { useCallback, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { fetchApi } from "../requests/fetchApi";

export const useFetch = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<AxiosRequestConfig | undefined>(
    undefined
  );
  const [error, setError] = useState<null | string>(null);

  const doFetch = useCallback(
    (config?: AxiosRequestConfig | undefined) => {
      setConfig(config);
      setLoading(true);
    },
    [setConfig, setLoading]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi.get(url, config);
        setData(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      fetchData();
    }
  }, [url, config, loading]);

  return { data, doFetch, error, loading };
};

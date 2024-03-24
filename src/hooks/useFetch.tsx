import { useCallback, useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { fetchApi } from "../requests/fetchApi";

export const useFetch = (url?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<AxiosRequestConfig | undefined>(
    undefined
  );
  const [error, setError] = useState<null | string>(null);

  const doFetch = useCallback(
    ({
      config,
    }: {
      config?: AxiosRequestConfig | undefined;
    } = {}) => {
      setConfig(config);
      setLoading(true);
    },
    [setConfig, setLoading]
  );

  const reset = () => {
    setData(null);
    setConfig(undefined);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      const requestUrl = config && config.url ? config.url : url ? url : "";
      try {
        const response = await fetchApi.get(requestUrl, config);
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

  return { data, doFetch, error, loading, reset };
};

import { useEffect, useState } from "react";
import axios from "axios";

export const fetchApi = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi.get(url);
        setData(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  return { data, error, loading };
};

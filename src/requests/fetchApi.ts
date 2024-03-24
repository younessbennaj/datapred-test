import axios from "axios";

const API_BASE_URL = "https://test-backend.i.datapred.com";

export const fetchApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const addAxiosToken = (token: string) => {
  fetchApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  fetchApi.defaults.baseURL = `${API_BASE_URL}/with-auth`;
};

export const removeAxiosToken = () => {
  delete fetchApi.defaults.headers.common["Authorization"];
  fetchApi.defaults.baseURL = `${API_BASE_URL}`;
};

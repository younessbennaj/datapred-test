import axios from "axios";

export const fetchApi = axios.create({
  baseURL: "https://test-backend.i.datapred.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

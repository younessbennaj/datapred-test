import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { removeAxiosToken } from "../requests/fetchApi";

export const Logout = () => {
  const [, setToken] = useLocalStorage("token", null);
  useEffect(() => {
    setToken(null);
    removeAxiosToken();
  }, [setToken]);
  return <Navigate to="/" />;
};

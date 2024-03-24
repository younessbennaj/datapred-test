import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const [, setToken] = useLocalStorage("token", null);
  useEffect(() => {
    setToken(null);
  }, [setToken]);
  return <Navigate to="/" />;
};

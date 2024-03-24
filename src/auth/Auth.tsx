import { useLocalStorage } from "@uidotdev/usehooks";
import { Navigate } from "react-router-dom";

export const Auth = ({ children }: { children: React.ReactNode }) => {
  const [token] = useLocalStorage("token", null);

  if (!token) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

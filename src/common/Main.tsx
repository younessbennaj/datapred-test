import { useLocalStorage } from "@uidotdev/usehooks";
import { Dashboard } from "../dashboard/Dashboard";
import { Home } from "./Home";

export const Main = () => {
  const [token] = useLocalStorage("token", null);
  return token ? <Dashboard /> : <Home />;
};

import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Nav } from "./Nav";

export const Layout = () => {
  const [token] = useLocalStorage("token", null);
  const navItems = [
    {
      isActive: true,
      name: "Home",
      path: "/",
    },
    {
      isActive: !token,
      name: "Login",
      path: "/login",
    },
    {
      isActive: !!token,
      name: "Logout",
      path: "/logout",
    },
  ];
  return (
    <div className="container">
      <Nav navItems={navItems} />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

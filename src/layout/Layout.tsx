import { Outlet } from "react-router-dom";
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
    <div className="min-h-[100vh] mx-auto w-full px-6 lg:max-w-[1024px] flex flex-col h-full">
      <Nav navItems={navItems} />
      <div className="grow flex flex-col items-stretch justify-stretch">
        <Outlet />
      </div>
    </div>
  );
};

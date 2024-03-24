import { Link } from "react-router-dom";

type NavItem = {
  name: string;
  path: string;
  isActive: boolean;
};

export const Nav = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <nav>
      <ul>
        {navItems
          .filter((item) => item.isActive)
          .map((item) => (
            <li key={item.name}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

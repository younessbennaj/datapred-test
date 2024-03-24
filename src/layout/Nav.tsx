import { Link } from "react-router-dom";

type NavItem = {
  name: string;
  path: string;
  isActive: boolean;
};

export const Nav = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <nav>
      <ul className="flex gap-2 justify-end">
        {navItems
          .filter((item) => item.isActive)
          .map((item) => (
            <li className="p-3 " key={item.name}>
              <Link
                className=" text-blue-600 hover:text-blue-800 hover:underline"
                to={item.path}
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

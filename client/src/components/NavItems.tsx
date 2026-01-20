import { Link } from "react-router-dom";
import type { NavItem } from "../types/product.types";

type Props = {
  items: NavItem[];
  navItem: string;
  setNavItem: (arg: string) => void;
};

function NavItems({ items, navItem, setNavItem }: Props) {
  console.log(navItem);
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`nav-item text-white text-decoration-none ${
            item.path === navItem ? "fw-bold" : ""
          }`}
          onClick={() => setNavItem(item.path)}
        >
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Link>
      ))}
    </>
  );
}

export default NavItems;

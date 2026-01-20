import { Link } from "react-router-dom";
import type { NavItem } from "../types/product.types";

type Props = {
  items: NavItem[];
  navItem: string;
  setNavItem: (arg: string) => void;
  setShowNav: (val: boolean) => void;
};

function NavItems({ items, navItem, setNavItem, setShowNav }: Props) {
  return (
    <>
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`nav-item text-white text-decoration-none ${
            item.path === navItem ? "fw-bold" : ""
          }`}
          onClick={() => {
            setNavItem(item.path);
            setShowNav(false);
          }}
        >
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Link>
      ))}
    </>
  );
}

export default NavItems;

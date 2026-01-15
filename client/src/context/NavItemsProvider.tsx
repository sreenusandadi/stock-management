import { createContext, useState } from "react";

interface NavItemsContextType {
  navItem: string;
  setNavItem: (state: string) => void;
}

const NavItemsContext = createContext<NavItemsContextType>({
  navItem: "",
  setNavItem: () => {},
});

export const NavItemsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [navItem, setNavItem] = useState<string>("home");

  return (
    <NavItemsContext.Provider value={{ navItem, setNavItem }}>
      {children}
    </NavItemsContext.Provider>
  );
};

export default NavItemsContext;

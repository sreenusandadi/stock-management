import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdMenu, MdOutlineStorefront } from "react-icons/md";

import AuthContext from "../../context/AuthProvider";
import NavItemsContext from "../../context/NavItemsProvider";
import useAuthService from "../../services/auth.service";
import type { NavItem } from "../../types/product.types";
import NavItems from "../NavItems";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const { logout } = useAuthService();

  const { navItem, setNavItem } = useContext(NavItemsContext);

  const items: NavItem[] = [
    { name: "home", path: "/" },
    { name: "products", path: "/products" },
    { name: "cart", path: "/cart" },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (auth?.isAuthenticated) {
      // Perform logout actions
      await logout();
      setAuth({ isAuthenticated: false, token: "", user: null });
      setNavItem("/");
      navigate("/login");
    } else {
      // Redirect to login page
      navigate("/login");
    }
  };

  const handleNavigation = () => {
    setNavItem("/");
    navigate("/");
  };

  return (
    <div className="header p-4 bg-primary text-white font-bold d-flex justify-content-between align-items-center position-sticky top-0 z-3">
      <div className="d-flex align-items-center gap-2">
        <div className="position-relative">
          {showNav && (
            <nav
              className="position-absolute bg-primary text-white shadow mt-5 start-0 p-4 z-2 d-flex flex-column gap-3"
              style={{
                marginLeft: "-25px",
                width: "250px",
                minHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <NavItems
                items={items}
                navItem={navItem}
                setNavItem={setNavItem}
                setShowNav={setShowNav}
              />
              <div className="mt-auto pb-3 d-flex flex-column gap-3 fw-bold">
                <hr className="text-secondary" />
                <div>
                  Welcome{" "}
                  <span className="text-nowrap">
                    {auth?.user?.name || "Guest"}
                  </span>{" "}
                  ({auth?.user?.role || "USER"})
                </div>
                <div className="text-nowrap">{auth?.user?.email}</div>
                <div
                  className="nav-item"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  {auth?.isAuthenticated ? "Logout" : "Login"}
                </div>
              </div>
            </nav>
          )}
        </div>
        <MdMenu
          size={50}
          className="d-block d-md-none"
          style={{ cursor: "pointer" }}
          onClick={() => setShowNav(!showNav)}
        />

        <MdOutlineStorefront
          size={50}
          style={{ cursor: "pointer" }}
          className="text-white d-none d-md-block"
          onClick={handleNavigation}
        />
        <span className="text-dark fs-2 fs-sm-6 fs-lg-4 fw-bold">
          Stock Management System
        </span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <div className="d-none d-md-flex">
          <div className="d-flex gap-3 me-4">
            <NavItems
              items={items}
              navItem={navItem}
              setNavItem={setNavItem}
              setShowNav={setShowNav}
            />
          </div>
          <span>
            Welcome {auth?.user?.name || "Guest"} ({auth?.user?.role || "USER"})
          </span>
        </div>
        <>
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="bg-white text-primary rounded-circle d-inline-flex justify-content-center align-items-center"
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          >
            <FaUser />
          </div>
          {/* popup login/logout link on click of the icon */}
          <div className="position-relative">
            {showMenu && (
              <div className="position-absolute top-100 end-0 bg-white text-primary rounded shadow mt-2 p-4 z-2">
                <div
                  className="position-absolute bg-white"
                  style={{
                    width: "10px",
                    height: "10px",
                    top: "-5px",
                    right: "10px",
                    transform: "rotate(45deg)",
                  }}
                />
                <div className="text-nowrap mb-2">{auth?.user?.email}</div>
                <div style={{ cursor: "pointer" }} onClick={handleLogout}>
                  {auth?.isAuthenticated ? "Logout" : "Login"}
                </div>
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
}

export default Header;

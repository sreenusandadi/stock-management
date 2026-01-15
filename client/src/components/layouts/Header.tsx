import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import AuthContext from "../../context/AuthProvider";
import NavItemsContext from "../../context/NavItemsProvider";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const { navItem, setNavItem } = useContext(NavItemsContext);

  const items = [
    { name: "home", path: "/" },
    { name: "products", path: "/products" },
    { name: "cart", path: "/cart" },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle login/logout click
    if (auth?.isAuthenticated) {
      // Perform logout actions
      setAuth({ isAuthenticated: false, token: "", user: null });
      setNavItem("home");
      navigate("/login");
    } else {
      // Redirect to login page
      navigate("/login");
    }
  };

  return (
    <div className="header p-4 bg-primary text-white font-bold d-flex justify-content-between align-items-center position-sticky top-0 z-3">
      <span>Stock Management System</span>{" "}
      <div className="d-flex align-items-center gap-2 me-5">
        <div className="d-flex gap-3 me-4">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-white text-decoration-none ${
                item.name.includes(navItem) ? "fw-bold" : ""
              }`}
              onClick={() => setNavItem(item.name)}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Link>
          ))}
        </div>
        <span>Welcome {auth?.user?.email || "Guest"}</span>
        <div>
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
                <div className="text-nowrap mb-2">
                  {auth?.user?.name} ({auth?.user?.role.toLowerCase() || "User"}
                  )
                </div>
                <div style={{ cursor: "pointer" }} onClick={handleLogout}>
                  {auth?.isAuthenticated ? "Logout" : "Login"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

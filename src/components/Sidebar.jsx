import { useState } from "react";
import { Outlet } from "react-router-dom";

import "../styles/Sidebar.css";
import { useAuth } from "../hooks/useAuth";
import UserInfo from "./UserInfo.jsx";
import MobileSidebar from "./MobileSidebar.jsx";
import Overlay from "./Overlay.jsx";
import Navigation from "./Navigation.jsx";
import RoleBadge from "./RoleBadge.jsx";
import { IconClose } from "../icons/IconSidebar.jsx";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const { logout } = useAuth();

  // TODO: Remove hardcoded data, implement with useAuth()
  const logo = "imagen-logo.png";

  const handleSignOut = () => {
    logout();
  };

  return (
    <>
      <MobileSidebar logo={logo} onOpenMenu={toggleMenu} />

      <Overlay isOpen={isMenuOpen} onClose={toggleMenu} />

      <aside className={`sidebar ${isMenuOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <img src={logo} alt="Kickhub logo" />
          </div>

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <IconClose />
          </button>

          <RoleBadge />

          <Navigation onItemClick={toggleMenu} />
        </div>

        <UserInfo />
      </aside>
      <Outlet />
    </>
  );
}

export default Sidebar;

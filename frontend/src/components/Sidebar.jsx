import { IconClose } from "../../public/icons/IconSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import Overlay from "./Overlay";
import RoleBadge from "./RoleBadge";
import Navigation from "./Navigation";
import UserInfo from "./UserInfo";
import "../styles/Sidebar.css";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <>
      <MobileSidebar logo={logo} onOpenMenu={toggleMenu} />

      <Overlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen((prev) => !prev)}
      />

      <aside className={`sidebar ${isMenuOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <img src={logo} alt="Kickhub logo" />
          </div>

          <button
            type="button"
            className="sidebar-close-btn"
            onClick={toggleMenu}
            aria-label="Cerrar menú"
          >
            <IconClose />
          </button>

          <RoleBadge role={role} />

          <Navigation onItemClick={toggleMenu} />
        </div>

        <UserInfo />
      </aside>
      <Outlet />
    </>
  );
}

export default Sidebar;

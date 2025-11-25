import { useState } from "react";
import { Outlet } from "react-router-dom";

import "../styles/Sidebar.css";
import { useAuth } from "../hooks/useAuth";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();

  const resolvedUser = user ?? auth?.user;
  const resolvedRole =
    role ??
    (resolvedUser
      ? { dot: "violet", name: resolvedUser.role ?? "viewer" }
      : { dot: "gray", name: "viewer" });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const { logout } = useAuth();

  // TODO: Remove hardcoded data, implement with useAuth()
  const logo = "imagen-logo.png";
  const role = { dot: "violet", name: "view" };

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

          <RoleBadge role={resolvedRole} />

          <Navigation onItemClick={toggleMenu} />
        </div>

        <UserInfo />
      </aside>
      <Outlet />
    </>
  );
}

export default Sidebar;

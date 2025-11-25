import { useState } from "react";
import { Outlet } from "react-router-dom";

import "../styles/Sidebar.css";

import { IconClose } from "../icons/IconSidebar.jsx";
import MobileSidebar from "./MobileSidebar.jsx";
import Overlay from "./Overlay.jsx";
import RoleBadge from "./RoleBadge.jsx";
import Navigation from "./Navigation.jsx";
import UserInfo from "./UserInfo.jsx";
import { useAuth } from "../hooks/useAuth.js";

function Sidebar({ role, user, logo = "/imagen-logo.png", onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();

  const resolvedUser = user ?? auth?.user;
  const resolvedRole =
    role ??
    (resolvedUser
      ? { dot: "violet", name: resolvedUser.role ?? "viewer" }
      : { dot: "gray", name: "viewer" });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSignOut = () => {
    if (typeof onSignOut === "function") {
      onSignOut();
    } else {
      auth?.signOut?.();
    }
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

        <UserInfo
          user={resolvedUser}
          roleUser={resolvedRole}
          onSignOut={handleSignOut}
        />
      </aside>
      <Outlet />
    </>
  );
}

export default Sidebar;

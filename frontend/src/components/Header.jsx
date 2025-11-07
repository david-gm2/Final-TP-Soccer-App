import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/Header.css";

function Header() {
  const [roleShow, setRoleShow] = useState({
    dot: "violet",
    name: "user",
  });

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-logo">
          <img src="icons/icon-logo.svg" alt="Kickhub logo" />
        </div>

        <div className="header-role">
          <span className="role-dot" style={{ color: roleShow.dot }}>
            ●
          </span>
          <span className="role-label">{roleShow.name}</span>
        </div>

        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <img src="icons/icon-home.svg" alt="" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <img src="icons/icon-stats.svg" alt="" />
            <span>Stats</span>
          </NavLink>

          <NavLink
            to="/matches"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <img src="icons/icon-ball.svg" alt="" />
            <span>Matches</span>
          </NavLink>

          <NavLink
            to="/players"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <img src="icons/icon-player.svg" alt="" />
            <span>Players</span>
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <img src="icons/icon-history.svg" alt="" />
            <span>History</span>
          </NavLink>
        </nav>
      </div>

      <div className="header-bottom">
        <div className="user-info">
          <img className="user-avatar" src="avatar.jpg" alt="User avatar" />
          <div className="user-text">
            <p className="user-name">Doye</p>
            <p className="user-email">doyel.gusmerotti@gm</p>
          </div>
        </div>

        <button type="button" className="user-switch-btn">
          <img src="icons/icon-external.svg" alt="Switch" />
        </button>
      </div>
    </header>
  );
}

export default Header;

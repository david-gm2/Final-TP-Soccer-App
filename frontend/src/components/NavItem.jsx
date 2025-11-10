import { NavLink } from "react-router-dom";

function NavItem({ path, label, icon: Icon, end, onClick }) {
  return (
    <NavLink
      to={path}
      end={end}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <Icon />
      <span>{label}</span>
    </NavLink>
  );
}

export default NavItem;


import { NavLink } from "react-router-dom";

function NavItem({ path, label, icon, end, onClick }) {
  const IconComponent = icon;

  return (
    <NavLink
      to={path}
      end={end}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {IconComponent && <IconComponent />}
      <span>{label}</span>
    </NavLink>
  );
}

export default NavItem;

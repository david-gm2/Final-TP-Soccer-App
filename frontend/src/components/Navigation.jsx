import NavItem from "./NavItem";
import { navigationItems } from "../constants/navigation";

function Navigation({ onItemClick }) {
  return (
    <nav className="header-nav">
      {navigationItems.map((item) => (
        <NavItem
          key={item.path}
          path={item.path}
          label={item.label}
          icon={item.icon}
          end={item.end}
          onClick={onItemClick}
        />
      ))}
    </nav>
  );
}

export default Navigation;

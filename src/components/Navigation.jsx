import NavItem from "./NavItem";
import { navigationItems } from "../constants/navigation";
import { useAuth } from "../hooks/useAuth";

function Navigation({ onItemClick }) {
  const { isAdmin } = useAuth();

  return (
    <nav className="sidebar-nav">
      {isAdmin
        ? navigationItems.map((item) => (
            <NavItem
              key={item.path}
              path={item.path}
              label={item.label}
              icon={item.icon}
              end={item.end}
              onClick={onItemClick}
            />
          ))
        : navigationItems
            .filter((item) => !item.admin)
            .map((item) => (
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

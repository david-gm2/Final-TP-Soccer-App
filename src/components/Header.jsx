import { Outlet } from "react-router-dom";

import "../styles/header.css";
import { IconPen, IconPlus, IconScoreboard } from "../icons/IconsHeader.jsx";

function Header({
  title = "Welcome",
  subtitle = "",
  features = [],
  actions = [],
  afterHeader = null,
}) {
  const safeActions = actions.filter(Boolean);
  const safeFeatures = features.filter(Boolean);

  const renderIcon = (icon, alt) => {
    if (!icon) return null;
    if (typeof icon === "string") {
      const map = {
        plus: <IconPlus />,
        scoreboard: <IconScoreboard />,
        pen: <IconPen />,
      };
      if (map[icon]) return map[icon];
      return (
        <img
          src={icon}
          alt={alt ?? ""}
          className="header-action-icon"
          aria-hidden={alt ? undefined : true}
        />
      );
    }
    return icon;
  };

  return (
    <>
      <header className="header">
        <div className="header-copy">
          <h1>{title}</h1>
          {subtitle && <h3>{subtitle}</h3>}
        </div>

        {safeFeatures.length > 0 && (
          <div className="header-features">
            {safeFeatures.map((feature, index) => (
              <div key={index} className="header-feature">
                {feature}
              </div>
            ))}
          </div>
        )}

        {safeActions.length > 0 && (
          <div className="header-actions">
            {safeActions.map((action, index) => (
              <button
                key={action.key ?? index}
                className={action.className}
                onClick={() => action.onClick?.()}
                type="button"
              >
                {renderIcon(action.icon, action.alt)}
                <span className="header-action-label">{action.text}</span>
              </button>
            ))}
          </div>
        )}
      </header>
      {afterHeader}
      <Outlet />
    </>
  );
}

export default Header;

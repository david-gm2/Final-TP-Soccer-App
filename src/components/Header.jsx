import { Outlet, useLocation, useNavigate } from "react-router-dom";

import "../styles/header.css";
import { IconDelete } from "../icons/IconsPlayer.jsx";

function Header({
  handleToggleModal,
  playerTitle,
  playerSubtitle = "Manage your user profile",
  onEditPlayer,
  onDeletePlayer,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const user = "Gm2dev";
  const player = playerTitle || "Lionel Messi";

  const headerContent = {
    home: {
      title: `Welcome ${user}`,
      subtitle:
        "Here's your weekly summary with the key stats and upcoming matches.",
      features: [],
      buttons: [
        {
          text: "New match",
          className: "btn btn-primary",
          onClick: () => navigate("/matches"),
        },
        {
          text: "Add player",
          className: "btn btn-secondary",
          onClick: () => navigate("/players"),
        },
      ],
    },
    statistics: {
      title: "Statistics",
      subtitle: "Player rankings and performance",
      features: [],
      buttons: [],
    },
    matches: {
      title: "New match",
      subtitle: "Select players and customize match details.",
      features: [],
      buttons: [],
    },
    players: {
      title: "Players",
      subtitle: "Manage your team of players",
      features: [],
      buttons:
        typeof handleToggleModal === "function"
          ? [
              {
                text: "+ Add player",
                className: "btn btn-primary",
                onClick: handleToggleModal,
              },
            ]
          : [],
    },
    history: {
      title: "History",
      subtitle: "Review the complete match history.",
      features: [],
      buttons: [],
    },
    playersDetails: {
      title: player,
      subtitle: playerSubtitle,
      features: [],
      buttons: [
        typeof onDeletePlayer === "function" && {
          text: (
            <>
              <IconDelete width="17" height="19" /> <p>Delete player</p>
            </>
          ),
          className: "btn btn-icon btn-danger",
          onClick: onDeletePlayer,
        },
        typeof onEditPlayer === "function" && {
          text: "Edit",
          className: "btn btn-secondary",
          onClick: onEditPlayer,
        },
      ].filter(Boolean),
    },
  };

  const getSectionKeyFromPath = (path) => {
    const [, first, second] = path.split("/");
    if (!first) return "home";
    if (first === "players" && second) return "playersDetails";
    if (first === "players") return "players";
    if (first === "stats") return "statistics";
    if (first === "matches") return "matches";
    if (first === "history") return "history";
    return "home";
  };

  const content = headerContent[getSectionKeyFromPath(pathname)] ?? headerContent.home;

  return (
    <>
      <header className="header">
        <div className="header-copy">
          <h1>{content.title}</h1>
          <h3>{content.subtitle}</h3>
        </div>

        {content.features.length > 0 && (
          <div className="header-features">
            {content.features.map((feature, index) => (
              <div key={index} className="header-feature">
                {feature}
              </div>
            ))}
          </div>
        )}

        {content.buttons.length > 0 && (
          <div className="header-actions">
            {content.buttons.map((button, index) => (
              <button
                key={index}
                className={button.className}
                onClick={() => button.onClick?.()}
                type="button"
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
}

export default Header;

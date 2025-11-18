import { useLocation, Outlet } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const user = "Gm2dev";
  const player = "Lionel Messi";

  const headerContent = {
    home: {
      title: `Welcome ${user}`,
      subtitle:
        "Here’s your weekly summary with the key stats and upcoming matches.",
      features: [],
      buttons: [
        {
          text: "New Match",
          className: "btn btn-primary",
        },
        {
          text: "Add player",
          className: "btn btn-secondary",
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
      title: "New Match",
      subtitle: "Select players and customize match details.",
      features: [],
      buttons: [],
    },
    players: {
      title: "Players",
      subtitle: "Manage your team of players",
      features: [],
      buttons: [
        {
          text: "Add player",
          className: "btn btn-primary",
        },
      ],
    },
    history: {
      title: "History",
      subtitle: "Review the complete match history",
      features: [],
      buttons: [],
    },
    playersDetails: {
      title: player, // acá después podés poner el nombre real desde props/context
      subtitle: "Manage your user profile",
      features: [],
      buttons: [
        {
          text: "Delete player",
          className: "btn btn-danger",
        },
        {
          text: "Edit",
          className: "btn btn-secondary",
        },
      ],
    },
  };

  const { pathname } = useLocation();
  console.log(pathname);

  // función para mapear la ruta a una "sección" del header
  const getSectionKeyFromPath = (path) => {
    const [, first, second] = path.split("/");
    // path = "/"         → first = ""
    // path = "/players"  → first = "players"
    // path = "/players/3"→ first = "players", second = "3"
    // path = "/stats"    → first = "stats"
    // path = "/history"  → first = "history"

    if (!first) return "home";
    if (first === "players" && second) return "playersDetails";
    if (first === "players") return "players";
    if (first === "stats") return "statistics";
    if (first === "matches") return "matches";
    if (first === "history") return "history";

    // por defecto
    return "home";
  };

  const sectionKey = getSectionKeyFromPath(pathname);
  const content = headerContent[sectionKey] ?? headerContent.home;

  return (
    <main>
      <article className="header">
        <div>
          <h1>{content.title}</h1>
          <h3>{content.subtitle}</h3>
        </div>
        <div>
          {content.buttons.map((button, index) => (
            <button key={index} className={button.className}>
              {button.text}
            </button>
          ))}
        </div>
      </article>
      <Outlet />
    </main>
  );
}

export default Header;

import { useLocation } from "react-router-dom";
import "../styles/header.css";

function PagePlayerDetails() {
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
          className: "new-match-button",
        },
        {
          text: "Add player",
          className: "add-player-button",
        },
      ],
    },
    players: {
      title: "Players",
      subtitle: "Manage your team of players",
      features: [],
      buttons: [
        {
          text: "Add player",
          className: "add-player-button",
        },
      ],
    },
    statistics: {
      title: "Players",
      subtitle: "Player rankings and performance",
      features: [],
      buttons: [],
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
          className: "btn deleted",
        },
        {
          text: "Edit",
          className: "btn solid",
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

    if (!first) return "home"; // "/"
    if (first === "players" && second) return "playersDetails"; // "/players/:id"
    if (first === "players") return "players"; // "/players"
    if (first === "stats") return "statistics";
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
    </main>
  );
}

export default PagePlayerDetails;

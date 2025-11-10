import "../styles/PlayersPage.css";
import { useState, useEffect } from "react";
import PlayerModal from "../components/PlayerModal";

function PlayersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listOfPlayers, setListOfPlayers] = useState([]);

  const handleToggleModal = () => setIsModalOpen((prev) => !prev);

  const handleSubmitPlayer = (playerData) => {
    setListOfPlayers((prev) => [playerData, ...prev]);
  };
  useEffect(() => {
    console.log("Jugadores:", listOfPlayers);
  }, [listOfPlayers]);

  return (
    <>
      <main className="players-page">
        <article className="players-header">
          <div>
            <h1>Player</h1>
            <h3>Manage your team of players</h3>
          </div>

          <div>
            <button className="button-add" onClick={handleToggleModal}>
              + Add players
            </button>
          </div>
        </article>

        {listOfPlayers.map((player, index) => (
          <div key={index} className="player-card">
            <h4>{player.name}</h4>
            <p>{player.position}</p>
            <p>#{player.number}</p>
          </div>
        ))}
      </main>

      <PlayerModal
        isOpen={isModalOpen}
        onClose={handleToggleModal}
        onSubmit={handleSubmitPlayer}
      />
    </>
  );
}

export default PlayersPage;

import { useEffect, useState } from "react";

export function usePlayers() {
  const [players, setPlayers] = useState(() => {
    try {
      const saved = localStorage.getItem("listOfPlayers");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("listOfPlayers", JSON.stringify(players));
  }, [players]);

  const toLower = (s) => (s || "").toLowerCase();

  const add = (data) =>
    setPlayers((prev) => [
      {
        id: crypto.randomUUID(),
        ...data,
        position: toLower(data.position), // normaliza para que el filtro matchee
      },
      ...prev,
    ]);

  const remove = (id) => setPlayers((prev) => prev.filter((p) => p.id !== id));

  return { players, add, remove };
}

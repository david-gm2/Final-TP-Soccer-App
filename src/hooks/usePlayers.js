import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext.js";

export function usePlayers() {
    return useContext(PlayerContext);
}

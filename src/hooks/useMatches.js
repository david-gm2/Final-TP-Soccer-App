import { useContext } from "react";
import { MatchContext } from "../context/MatchContext.js";

export function useMatches() {
  return useContext(MatchContext);
}

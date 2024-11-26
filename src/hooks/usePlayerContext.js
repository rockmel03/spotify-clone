import { useContext } from "react";
import { PlayerContext } from "../context/playerContext/PlayerContext";

export default function usePlayerContext() {
  return useContext(PlayerContext);
}

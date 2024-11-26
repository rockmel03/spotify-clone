import { AuthContextProvider } from "./authContext/authContext";
import { PlayerContextProvider } from "./playerContext/PlayerContext";

export const DataLayer = ({ children }) => {
  return (
    <AuthContextProvider>
      <PlayerContextProvider>{children}</PlayerContextProvider>
    </AuthContextProvider>
  );
};

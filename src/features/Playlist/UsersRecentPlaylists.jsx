import { useEffect, useState } from "react";
import useApiPrivate from "../../hooks/useApiPrivate";
import { PlayListCardHorizontal } from "./PlayListCardHorizontal";

export const UsersRecentPlaylists = () => {
  const api = useApiPrivate();
  const [recentPlaylists, setRecentPlaylists] = useState([]);

  const getUsersRecentPlaylist = async () => {
    try {
      const response = await api.get("/me/playlists ");
      console.log(response);
      if (response?.status === 200) {
        setRecentPlaylists(response?.data?.items || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersRecentPlaylist();
  }, []);

  return (
    <section className="gap-2 grid grid-cols-3 my-5">
      {recentPlaylists?.length > 0 &&
        recentPlaylists.map((playlist, index) => {
          if (index > 8) return;
          return (
            <PlayListCardHorizontal key={playlist.id} playlist={playlist} />
          );
        })}
    </section>
  );
};

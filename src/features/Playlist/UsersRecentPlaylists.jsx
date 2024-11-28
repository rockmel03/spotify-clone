import { useEffect, useState } from "react";
import useApiPrivate from "../../hooks/useApiPrivate";
import { PlayListCardHorizontal } from "./PlayListCardHorizontal";
import { Link } from "react-router-dom";

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
    <section className="gap-2 grid grid-cols-3 my-5 ">
      {recentPlaylists?.length > 0 &&
        recentPlaylists
          .filter((item) => item !== null)
          .slice(0, 9)
          .map((playlist) => {
            return (
              <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                <PlayListCardHorizontal playlist={playlist} />
              </Link>
            );
          })}
    </section>
  );
};

import { TopNav } from "./TopNav";
import { PlayListCard } from "../features/Playlist/PlayListCard";
import { useEffect, useState } from "react";
import useApiPrivate from "../hooks/useApiPrivate";
import { UsersRecentPlaylists } from "../features/Playlist/UsersRecentPlaylists";

export const Home = () => {
  const api = useApiPrivate();

  const [featuredPlaylistsData, setfeaturedPlaylistsData] = useState({});

  const getFeaturedPlaylist = async () => {
    try {
      const response = await api.get("/browse/featured-playlists");
      console.log(response);
      if (response?.status === 200) {
        setfeaturedPlaylistsData(response.data.playlists);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeaturedPlaylist();
  }, []);

  return (
    <section className="w-full h-full px-5 pb-5 rounded bg-zinc-900 overflow-auto">
      <TopNav />
      <UsersRecentPlaylists />
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Popular Playlists</h1>
          <a className="hover:underline font-medium cursor-pointer">Show all</a>
        </div>
        <div className="grid grid-cols-6  gap-2">
          {featuredPlaylistsData?.items?.length > 0 &&
            featuredPlaylistsData.items.map((playlist, index) => {
              if (index > 5) return;
              return <PlayListCard key={playlist.id} playlist={playlist} />;
            })}
        </div>
      </section>
    </section>
  );
};

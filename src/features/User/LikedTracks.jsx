import { useEffect, useState } from "react";
import useApiPrivate from "../../hooks/useApiPrivate";
import { formatDistanceToNow, parseISO } from "date-fns";
import LikedSongsImg from "../../assets/images/liked-songs-300.png";

export const LikedTracks = () => {
  const [data, setData] = useState({});
  const api = useApiPrivate();

  useEffect(() => {
    api
      .get("/me/tracks")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <section>
      <div className="w-full flex gap-5 p-5">
        <div className="w-52 aspect-square rounded bg-zinc-800">
          <img
            src={LikedSongsImg}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="opacity-80">Playlist</p>
          <h1 className="text-5xl lg:text-[8vw] font-bold">Liked Songs</h1>
          <h3 className="opacity-80">
            Rockmel <span>{data.total} songs</span>
          </h3>
        </div>
      </div>
      <ul>
        <div className="grid grid-cols-[0.5fr_4fr_3fr_2fr_1.5fr]">
          <p>#</p>
          <p>Title</p>
          <p>Album</p>
          <p>Date added</p>
          <p>duration</p>
        </div>
        <br />
        {data?.items?.length > 0 ? (
          data.items.map((item, index) => {
            const { track } = item;
            const date = formatDistanceToNow(parseISO(item.added_at));
            const duration = (track.duration_ms / 1000 / 60)
              .toFixed(2)
              .replace(".", ":");
            return (
              <li
                key={track.id}
                className="grid grid-cols-[0.5fr_4fr_3fr_2fr_1.5fr] hover:bg-zinc-800 rounded p-2 cursor-pointer"
              >
                <p>{index + 1}</p>
                <h3>{track.name}</h3>
                <h4>{`${track.album.name.substring(0, 20)}...`}</h4>
                <h5>{date} ago</h5>
                <h5>{duration}</h5>
              </li>
            );
          })
        ) : (
          <p>no items to display</p>
        )}
      </ul>
    </section>
  );
};

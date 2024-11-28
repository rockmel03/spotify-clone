import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useApiPrivate from "../../hooks/useApiPrivate";
import usePlayerContext from "../../hooks/usePlayerContext";

const PlaylistDetail = () => {
  const { id } = useParams();
  const api = useApiPrivate();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/playlists/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [id, api]);

  const { dispatch } = usePlayerContext();

  const onPlayClickHandler = (id) => {
    const songData = data.tracks.items.find((item) => item?.track?.id === id);
    if (songData) {
      dispatch({
        type: "SET_SONG",
        song: songData.track,
      });
    }
  };

  const songList =
    data?.tracks?.items?.length > 0 ? (
      data.tracks.items.map((item, index) => {
        const { track } = item;
        const duration = (track.duration_ms / 1000 / 60)
          .toFixed(2)
          .replace(".", ":");
        return (
          <li
            key={track.id}
            onClick={() => onPlayClickHandler(track.id)}
            className={`
              ${track?.preview_url ? "opacity-100" : "opacity-50"}
              grid grid-cols-[0.5fr_3fr_3fr_1.5fr] hover:bg-zinc-800 rounded p-2 cursor-pointer`}
          >
            <p>{index + 1}</p>
            <h3>{`${track.name.substring(0, 20)}${
              track.name.length > 20 ? "..." : ""
            }`}</h3>
            <h4>
              {`${track.album.name.substring(0, 20)}${
                track.album.name.length > 20 ? "..." : ""
              }`}
            </h4>
            <h5>{duration}</h5>
          </li>
        );
      })
    ) : (
      <p>no items to display</p>
    );

  return isLoading ? (
    <p>Loading</p>
  ) : !isLoading && !data ? (
    <p>Playlist not found</p>
  ) : (
    <section>
      <div className="w-full flex gap-5 p-5">
        <div className="w-52 aspect-square rounded bg-zinc-800 overflow-hidden  ">
          <img
            src={data?.images?.length > 0 ? data?.images[0].url : ""}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="opacity-80">{data.type}</p>
          <h1 className="text-5xl lg:text-[8vw] font-bold">{data.name}</h1>
          <h3 className="opacity-80">{data?.description}</h3>
          <h3 className="opacity-80">
            <Link to={`/profile/${data?.owner?.id}`}>
              {data?.owner?.display_name}
            </Link>
          </h3>
        </div>
      </div>
      <ul>
        <div className="grid grid-cols-[0.5fr_3fr_3fr_1.5fr]">
          <p>#</p>
          <p>Title</p>
          <p>Album</p>
          <p>duration</p>
        </div>
        <br />
        <hr className="opacity-50 " />
        {songList}
      </ul>
    </section>
  );
};

export default PlaylistDetail;

import { AddIcon } from "../../assets/icons";
import usePlayerContext from "../../hooks/usePlayerContext";

export const MusicDetails = () => {
  const { state } = usePlayerContext();
  const { song } = state;

  const artists = song?.album?.artists.map((artist, index) => {
    const condition =
      song.album.artists.length > 1 && index < song.album.artists.length - 1;
    return (
      <a key={artist.id} className="hover:underline">
        {artist.name + (condition ? ", " : " ")}
      </a>
    );
  });

  return (
    <section className=" flex items-center gap-2 py-2 pl-2">
      <div className="bg-zinc-600 w-14 aspect-square rounded"></div>
      <div className="flex justify-between items-center gap-2">
        <div className="text-sm">
          <h3 className="font-medium">
            {song?.name
              ? `${song.name?.substring(0, 15)}${
                  song.name.length > 15 ? "..." : ""
                }`
              : "--- ---"}
          </h3>
          <p className="opacity-80 hover:opacity-100  cursor-pointer ">
            {artists}
          </p>
        </div>
        <div className="p-3 grid place-items-center">
          <button className="text-xl active:scale-[.9] duration-150 ease-out">
            <AddIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

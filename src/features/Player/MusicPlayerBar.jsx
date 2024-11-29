import {
  PlaySquareIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMediumIcon,
  VolumeMuteIcon,
} from "../../assets/icons";
import { Player } from "./Player";
import { MusicDetails } from "./MusicDetails";
import usePlayerContext from "../../hooks/usePlayerContext";

export const MusicPlayerBar = () => {
  const { volume, handleVolumeChange } = usePlayerContext();
  return (
    <div className="w-full h-full bg-zinc-900 grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-2">
      <MusicDetails />
      <div className="hidden sm:block">
        <Player />
      </div>
      <section className=" text-xl hidden sm:flex gap-2 items-center justify-center">
        <button className="nowplaying active:scale-[.9] duration-150 ease-out">
          <PlaySquareIcon />
        </button>
        <button className="mute active:scale-[.9] duration-150 ease-out">
          {volume <= 0 ? (
            <VolumeMuteIcon />
          ) : volume < 5 ? (
            <VolumeLowIcon />
          ) : volume < 8 ? (
            <VolumeMediumIcon />
          ) : (
            <VolumeHighIcon />
          )}
        </button>
        <input
          type="range"
          name="volume"
          id="volume"
          className="h-1 max-w-[200px]"
          min="0"
          max="10"
          value={volume}
          onChange={handleVolumeChange}
        />
      </section>
    </div>
  );
};

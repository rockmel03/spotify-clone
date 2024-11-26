import {
  PauseIcon,
  PlayIcon,
  RepeatAll,
  ShuffleIcon,
  SkipNextIcon,
  SkipPreviousIcon,
} from "../../assets/icons";
import usePlayerContext from "../../hooks/usePlayerContext";

export const Player = () => {
  const {
    state,
    audio,
    handlePlayPause,
    seekbarValue,
    handleSeekBarChange,
    skipNext,
    skipPrevious,
  } = usePlayerContext();
  const { song, isPlaying } = state;

  return (
    <section className="flex flex-col items-center justify-center px-3 gap-1">
      <div className="text-4xl flex items-center justify-center gap-2">
        <button className="text-[.8em] opacity-80 hover:opacity-100 active:scale-[.9] duration-150 ease-out">
          <ShuffleIcon />
        </button>
        <button
          onClick={skipPrevious}
          className="privious opacity-80 hover:opacity-100 active:scale-[.9] duration-150 ease-out"
        >
          <SkipPreviousIcon />
        </button>
        <button
          onClick={handlePlayPause}
          disabled={song ? false : true}
          className="play text-[1.2em] active:scale-[.9] duration-150 ease-out disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          onClick={skipNext}
          className="next opacity-80 hover:opacity-100 active:scale-[.9] duration-150 ease-out"
        >
          <SkipNextIcon />
        </button>
        <button className="repeat text-[.8em] opacity-80 hover:opacity-100 active:scale-[.9] duration-150 ease-out">
          <RepeatAll />
          {/* <RepeatOne /> */}
        </button>
      </div>
      <div className="w-full flex items-center justify-center gap-2 text-sm ">
        <h5 className="whitespace-nowrap">
          {seekbarValue
            ? (seekbarValue / 100).toFixed(2).toString().replace(".", ":")
            : "--:--"}
        </h5>
        <input
          type="range"
          name="seekbar"
          id="seekbar"
          className="w-full max-w-[550px] h-1"
          min={0}
          max={audio.current.duration.toFixed()}
          value={seekbarValue}
          onChange={handleSeekBarChange}
        />
        <h5 className="whitespace-nowrap">
          {audio?.current?.duration
            ? (audio.current?.duration / 100)
                .toFixed(2)
                .toString()
                .replace(".", ":")
            : "--:--"}
        </h5>
      </div>
    </section>
  );
};

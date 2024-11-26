import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { playerInitialState, playerReducer } from "./playerReducer";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, playerInitialState);
  const { isPlaying, song } = state;

  const audio = useRef(new Audio());
  const [seekbarValue, setSeekbarValue] = useState(0);

  const handlePlayPause = () => {
    dispatch({ type: "SET_ISPLAYING", isPlaying: !isPlaying });
  };

  const handleSeekBarChange = (e) => {
    audio.current.currentTime = Number(e.target.value);
    setSeekbarValue(Number(e.target.value));
  };

  useEffect(() => {
    if (song) {
      audio.current.src = song?.preview_url;
      audio.current.play();
      dispatch({ type: "SET_ISPLAYING", isPlaying: true });
    }
  }, [song]);

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const curTime = audio.current.currentTime;
      const duration = audio.current.duration;
      if (curTime >= duration) {
        dispatch({ type: "SET_ISPLAYING", isPlaying: false });
      }
      setSeekbarValue(audio.current.currentTime);
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, dispatch]);

  const skipNext = () => {
    // skip to next song
  };

  const skipPrevious = () => {
    // skip to previous song
  };

  const [volume, setVolume] = useState(10);

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    audio.current.volume = newVolume / 10;
    setVolume(newVolume);
  };

  return (
    <PlayerContext.Provider
      value={{
        state,
        dispatch,
        audio,
        handlePlayPause,
        seekbarValue,
        handleSeekBarChange,
        skipNext,
        skipPrevious,
        volume,
        handleVolumeChange,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const playerInitialState = {
  isPlaying: false,
  song: null,
};

export const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_SONG":
      return {
        ...state,
        song: action.song,
      };

    case "SET_ISPLAYING": {
      return { ...state, isPlaying: action.isPlaying };
    }

    default:
      return state;
  }
};

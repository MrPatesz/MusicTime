import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DetailedSongDto from "../Models/DetailedSongDto";

interface HistoryElement {
  id: number;
  type: "artist" | "album" | "playlist";
}

interface PlayerState {
  queue: DetailedSongDto[];
  index: number;
  hidden: boolean;
  volume: number;
  history: HistoryElement[];
}

const initialState: PlayerState = {
  queue: [],
  index: 0,
  hidden: true,
  history: [],
  volume: 0.15,
};

const loadState = (): PlayerState => {
  try {
    const serializedState = localStorage.getItem("playerState");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};
const saveState = (state: PlayerState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("playerState", serializedState);
  } catch {}
};

export const playerSlice = createSlice({
  name: "player",
  initialState: loadState(),
  reducers: {
    setQueue: (state, action: PayloadAction<DetailedSongDto[]>) => {
      action.payload.forEach((s) => {
        let inQueueSong = state.queue.find((qs) => qs.songId === s.songId);
        if (inQueueSong === undefined) {
          state.queue.push(s);
        }
      });
      if (state.hidden) state.hidden = false;
      saveState(state);
    },
    clearQueue: (state) => {
      state.index = 0;
      state.queue = [];
      if (!state.hidden) state.hidden = true;
      saveState(state);
    },
    shuffleQueue: (state) => {
      let currentSong = state.queue[state.index];

      // source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      for (let i = state.queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.queue[i], state.queue[j]] = [state.queue[j], state.queue[i]];
      }

      state.index = state.queue.indexOf(currentSong);
      saveState(state);
    },
    removeAt: (state, action: PayloadAction<number>) => {
      state.index =
        action.payload < state.index
          ? state.index - 1
          : state.index === state.queue.length - 1
          ? 0
          : state.index;
      state.queue = state.queue.filter((_, i) => i !== action.payload);
      saveState(state);
    },
    moveFromTo: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      let currentSong = state.queue[state.index];
      let song = state.queue.splice(action.payload.from, 1)[0];
      state.queue.splice(action.payload.to, 0, song);
      state.index = state.queue.indexOf(currentSong);
      saveState(state);
    },

    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
      saveState(state);
    },
    playPrevious: (state) => {
      state.index = state.index > 0 ? state.index - 1 : state.queue.length - 1;
      saveState(state);
    },
    playNext: (state) => {
      state.index = state.index < state.queue.length - 1 ? state.index + 1 : 0;
      saveState(state);
    },

    setHidden: (state, action: PayloadAction<boolean>) => {
      state.hidden = action.payload;
      saveState(state);
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
      saveState(state);
    },

    addToHistory: (state, action: PayloadAction<HistoryElement>) => {
      if (state.history.length > 11) {
        state.history.pop();
      }
      let newHistoryElement = action.payload;
      state.history = state.history.filter(
        (he) =>
          he.id !== newHistoryElement.id || he.type !== newHistoryElement.type
      );
      state.history = state.history.reverse();
      state.history.push(newHistoryElement);
      state.history = state.history.reverse();
      saveState(state);
    },
    clearHistory: (state) => {
      state.history = [];
      saveState(state);
    },
  },
});

export const {
  setQueue,
  clearQueue,
  shuffleQueue,
  setIndex,
  removeAt,
  moveFromTo,
  playPrevious,
  playNext,
  setHidden,
  setVolume,
  addToHistory,
  clearHistory,
} = playerSlice.actions;

export default playerSlice.reducer;

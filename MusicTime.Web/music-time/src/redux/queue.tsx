import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import DetailedSongDto from "../Models/DetailedSongDto";

interface QueueState {
  queue: DetailedSongDto[];
  index: number;
}

const initialState: QueueState = {
  queue: [],
  index: 0,
};

const loadState = (): QueueState => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};
const saveState = (state: QueueState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {}
};

export const queueSlice = createSlice({
  name: "queue",
  initialState: loadState(),
  reducers: {
    setQueue: (state, action: PayloadAction<DetailedSongDto[]>) => {
      state.index = 0;
      state.queue = state.queue.concat(action.payload);
      saveState(state);
    },
    clearQueue: (state) => {
      state.index = 0;
      state.queue = [];
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
    playRandom: (state) => {
      let randomIndex = Math.floor(Math.random() * state.queue.length);
      while(randomIndex === state.index) {
        randomIndex = Math.floor(Math.random() * state.queue.length);
      }
      state.index = randomIndex;
    },
  },
});

export const {
  clearQueue,
  setIndex,
  removeAt,
  setQueue,
  playPrevious,
  playNext,
  playRandom,
} = queueSlice.actions;

export default queueSlice.reducer;

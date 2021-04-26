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
      state.queue = action.payload;
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
  },
});

export const {
  clearQueue,
  setIndex,
  removeAt,
  setQueue,
  playPrevious,
  playNext,
} = queueSlice.actions;

export default queueSlice.reducer;

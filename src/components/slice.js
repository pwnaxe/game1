import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    health: 100,
    mana: 100
  },
  reducers: {
    setHealth: (state, action) => {
      state.health = action.payload;
    },
    setMana: (state, action) => {
      state.mana = action.payload;
    }
  }
});

export const { setHealth, setMana } = gameSlice.actions;
export const SET_HEALTH = "SET_HEALTH";
export const SET_MANA = "SET_MANA";

export default gameSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: { numberValue: '01089', searchNumber: null },
  reducers: {
    setNumberValue(state, action) {
      state.numberValue = action.payload;
    },
    setSearchNumber(state, action) {
      state.searchNumber = action.payload;
    },
  },
});

export const { setNumberValue, setSearchNumber } = searchSlice.actions;
export default searchSlice.reducer;

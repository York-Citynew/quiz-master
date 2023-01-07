import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  isActive: "",
};
const modalSlice = createSlice({
  name: "modal",
  initialState: INITIAL_STATE,
  reducers: {
    setIsActive: (state, { payload }) => {
      state.isActive = payload;
    },
  },
});
export const { setIsActive } = modalSlice.actions;
export default modalSlice.reducer;

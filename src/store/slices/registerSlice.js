import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { signUp, login, logout } = registerSlice.actions;
export default registerSlice.reducer;

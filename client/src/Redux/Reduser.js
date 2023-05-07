import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    login: false,
  },
  reducers: {
    check: (state, action) => {
      state.login = action.payload;
    },
  },
});

// export const { addUser } = userSlice.actions;

// export default userSlice.reducer;

export const { check } = userSlice.actions;

export const selectUser = (state) => state.user.login;

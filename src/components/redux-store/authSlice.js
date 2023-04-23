import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token"),
  isLoggedIn: !!localStorage.getItem("token"),
  email: localStorage.getItem("email"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { token, email } = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      state.email = email;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
    setEmail(state, action) {
      const { email } = action.payload;
      state.email = email;
      localStorage.setItem("email", email);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
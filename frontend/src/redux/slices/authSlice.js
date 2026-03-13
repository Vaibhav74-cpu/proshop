import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  otpEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtpEmail: (state, action) => {
      state.otpEmail = action.payload;
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); //store user information in localStorage
      state.otpEmail = null;
    },
    logout: (state, action) => {
      state.userInfo = null;
      state.otpEmail = null;
      localStorage.clear();
      // localStorage.removeItem("userInfo");
      // localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logout, setOtpEmail } = authSlice.actions;
export default authSlice.reducer;

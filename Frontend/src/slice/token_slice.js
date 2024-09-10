import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: ""
  };


  export const tokenSlice = createSlice({
    name: "localToken",
    initialState,
    reducers: {
      logoutToken: (state) => {
        state.token = "";
      },
      changeToken: (state, action) => {
        state.token = action.payload;
      }
    }
  });
  
  export const { logoutToken, changeToken } = tokenSlice.actions;

  export default tokenSlice.reducer;
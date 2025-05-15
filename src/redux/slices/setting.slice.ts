import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
   loadingPage: boolean;
};

const initialState: TInitialState = {
   loadingPage: false,
};

const settingSlice = createSlice({
   name: "settingSlice",
   initialState,
   reducers: {
      SET_LOADING_PAGE: (state, { payload }) => {
         state.loadingPage = payload;
      },
   },
});

export const { SET_LOADING_PAGE } = settingSlice.actions;

export default settingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
   openedModalVerifyGA: boolean;
   email: string | null;
};

const initialState: TInitialState = {
   openedModalVerifyGA: false,
   email: null,
};

const gaSlice = createSlice({
   name: "gaSlice",
   initialState,
   reducers: {
      SET_MODAL_VERIFY_GA: (state, { payload }) => {
         state.openedModalVerifyGA = payload;
      },
      SET_EMAIL: (state, { payload }) => {
         state.email = payload;
      },
   },
});

export const { SET_MODAL_VERIFY_GA, SET_EMAIL } = gaSlice.actions;

export default gaSlice.reducer;

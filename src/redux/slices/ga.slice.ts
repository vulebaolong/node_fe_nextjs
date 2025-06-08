import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
   openedModalVerifyGA: boolean;
};

const initialState: TInitialState = {
   openedModalVerifyGA: false,
};

const gaSlice = createSlice({
   name: "gaSlice",
   initialState,
   reducers: {
      SET_MODAL_VERIFY_GA: (state, { payload }) => {
         state.openedModalVerifyGA = payload;
      },
   },
});

export const { SET_MODAL_VERIFY_GA } = gaSlice.actions;

export default gaSlice.reducer;

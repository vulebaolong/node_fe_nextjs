import { colors } from "@/components/provider/mantine/theme";
import { getColorTheme } from "@/helpers/color-theme.helper";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
   loadingPage: boolean;
   selectedColorTheme: keyof typeof colors;
};

const initialState: TInitialState = {
   loadingPage: false,
   selectedColorTheme: getColorTheme(),
};

const settingSlice = createSlice({
   name: "settingSlice",
   initialState,
   reducers: {
      SET_LOADING_PAGE: (state, { payload }) => {
         state.loadingPage = payload;
      },
      SET_SELECTED_COLOR_THEME: (state, { payload }) => {
         state.selectedColorTheme = payload;
      },
   },
});

export const { SET_LOADING_PAGE, SET_SELECTED_COLOR_THEME } = settingSlice.actions;

export default settingSlice.reducer;

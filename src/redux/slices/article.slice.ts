import { TArticle } from "@/types/article.type";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
   articleDetail: TArticle | null;
};

const initialState: TInitialState = {
   articleDetail: null,
};

const articleSlice = createSlice({
   name: "articleSlice",
   initialState,
   reducers: {
      SET_ARTICLE_DETAIL: (state, { payload }) => {
         state.articleDetail = payload;
      },
   },
});

export const { SET_ARTICLE_DETAIL } = articleSlice.actions;

export default articleSlice.reducer;

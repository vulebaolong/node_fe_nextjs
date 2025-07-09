import { combineReducers } from "redux";
import user from "./user.slice";
import setting from "./setting.slice";
import ga from "./ga.slice";
import article from "./article.slice";

const combinedReducer = combineReducers({
    user,
    setting,
    ga,
    article,
});

export const rootReducer = (state: any, action: any) => {
    // RESET STORE (all slice) TO INIT
    //    if (action.type === "userSlice/RESET_USER") state = undefined;
    return combinedReducer(state, action);
};

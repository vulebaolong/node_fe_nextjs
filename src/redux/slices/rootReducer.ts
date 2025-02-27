import { combineReducers } from "redux";
import user from "./user.slice";

const combinedReducer = combineReducers({
   user,
});

export const rootReducer = (state: any, action: any) => {
   // RESET STORE (all slice) TO INIT
   //    if (action.type === "userSlice/RESET_USER") state = undefined;
   return combinedReducer(state, action);
};

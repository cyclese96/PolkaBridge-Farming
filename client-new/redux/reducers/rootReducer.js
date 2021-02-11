import layoutReducer from "./layoutReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    layout: layoutReducer,
});

export default rootReducer;
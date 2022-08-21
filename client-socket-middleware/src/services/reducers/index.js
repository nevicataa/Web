import { combineReducers } from "redux";
import { liveTableReducer } from "../live-table/reducer";


export default combineReducers({
    liveTable: liveTableReducer
});

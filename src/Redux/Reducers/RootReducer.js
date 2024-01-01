import { combineReducers } from "redux";
import ComponentReducer from "./ComponentReducer/ComponentReducer";

const RootReducer = combineReducers({
    Component:ComponentReducer
})

export default RootReducer;
import { combineReducers } from "redux";
import ComponentReducer from "./ComponentReducer/ComponentReducer";
import CompanyReducer from "./CompanyReducer/CompanyReducer";
import ProductsReducer from "./ProductsReducer/ProductsReducer";
import UserReducer from "./UserReducer/UserReducer";

const RootReducer = combineReducers({
    User: UserReducer,
    Component: ComponentReducer,
    Company: CompanyReducer,
    Products: ProductsReducer
})

export default RootReducer;
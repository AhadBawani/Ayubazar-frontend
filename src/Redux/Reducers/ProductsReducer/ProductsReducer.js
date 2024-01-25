import ActionType from "../../ActionType"

const ProductsState = {
    products: [],
}

const ProductsReducer = (state = ProductsState, { type, payload }) => {
    switch (type) {
        case ActionType.PRODUCTS:
            return { ...state, products: payload };

        default:
            return state;
    }
}

export default ProductsReducer;
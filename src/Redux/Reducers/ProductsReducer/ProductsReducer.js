import ActionType from "../../ActionType"

const ProductsState = {
    products: [],
    product: null
}

const ProductsReducer = (state = ProductsState, { type, payload }) => {
    switch (type) {
        case ActionType.PRODUCTS:
            return { ...state, products: payload };

        case ActionType.SINGLEPRODUCT:
            return { ...state, product: payload };

        default:
            return state;
    }
}

export default ProductsReducer;
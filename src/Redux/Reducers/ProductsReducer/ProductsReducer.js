import ActionType from "../../ActionType"

const ProductsState = {
    products: [],
    product: null,
    productReviews: [],
    discount: null
}

const ProductsReducer = (state = ProductsState, { type, payload }) => {
    switch (type) {
        case ActionType.PRODUCTS:
            return { ...state, products: payload };

        case ActionType.SINGLEPRODUCT:
            return { ...state, product: payload };

        case ActionType.PRODUCTREVIEW:
            return { ...state, productReviews: payload };

        case ActionType.DISCOUNTOFFER:
            return { ...state, discount: payload };

        default:
            return state;
    }
}

export default ProductsReducer;
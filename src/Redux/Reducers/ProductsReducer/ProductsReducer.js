import ActionType from "../../ActionType"

const ProductsState = {
    products: [],
    product: null,
    productReviews: [],
    discount: null,
    filterProduct: null,
    defaultProducts: null,
    searchedProduct: null,
    bestSellingProducts: null,
    latestProducts: null,
    narayaniProducts: null,
    categories: null
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

        case ActionType.FILTEREDPRODUCT:
            return { ...state, filterProduct: payload };

        case ActionType.DEFAULTPRODUCTS:
            return { ...state, defaultProducts: payload };

        case ActionType.SEARCHEDPRODUCT:
            return { ...state, searchedProduct: payload };

        case ActionType.BESTSELLINGPRODUCT:
            return { ...state, bestSellingProducts: payload };

        case ActionType.LATESTPRODUCT:
            return { ...state, latestProducts: payload };

        case ActionType.NARAYANIPRODUCTS:
            return { ...state, narayaniProducts: payload };

        case ActionType.CATEGORIES:
            return { ...state, categories: payload };

        default:
            return state;
    }
}

export default ProductsReducer;
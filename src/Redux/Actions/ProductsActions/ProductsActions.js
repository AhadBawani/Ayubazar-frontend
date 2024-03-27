import ActionType from "../../ActionType"

export const ProductAction = (response) => {
    return {
        type: ActionType.PRODUCTS,
        payload: response
    }
}

export const showSingleProductAction = (response) => {
    return {
        type: ActionType.SINGLEPRODUCT,
        payload: response
    }
}

export const ProductReviewAction = (response) => {
    return {
        type: ActionType.PRODUCTREVIEW,
        payload: response
    }
}

export const DiscountOfferAction = (response) => {
    return {
        type: ActionType.DISCOUNTOFFER,
        payload: response
    }
}

export const FilterProductAction = (response) => {
    return {
        type: ActionType.FILTEREDPRODUCT,
        payload: response
    }
}

export const DefaultProductsAction = (response) => {
    return {
        type: ActionType.DEFAULTPRODUCTS,
        payload: response
    }
}
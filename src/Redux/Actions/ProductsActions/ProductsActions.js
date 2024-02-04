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
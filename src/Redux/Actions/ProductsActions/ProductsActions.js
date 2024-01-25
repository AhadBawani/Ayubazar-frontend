import ActionType from "../../ActionType"

export const ProductAction = (response) => {
    return {
        type: ActionType.PRODUCTS,
        payload: response
    }
}
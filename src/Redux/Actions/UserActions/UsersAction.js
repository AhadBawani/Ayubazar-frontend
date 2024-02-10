import ActionType from "../../ActionType"

export const UserAction = (response) => {
    return {
        type: ActionType.USER,
        payload: response
    }
}

export const UserWishlistAction = (response) => {
    return {
        type: ActionType.USERWISHLIST,
        payload: response
    }
}

export const UserLocalWishlistAction = (response) => {
    return {
        type: ActionType.USERLOCALWISHLIST,
        payload: response
    }
}

export const UserCartAction = (response) => {
    return {
        type: ActionType.USERCART,
        payload: response
    }
}

export const UserLocalCartAction = (response) => {
    return {
        type: ActionType.USERLOCALCART,
        payload: response
    }
}
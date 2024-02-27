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

export const TotalAction = (response) => {
    return {
        type: ActionType.TOTAL,
        payload: response
    }
}

export const DiscountAction = (response) => {
    return {
        type: ActionType.DISCOUNT,
        payload: response
    }
}

export const ShippingAction = (response) => {
    return {
        type: ActionType.SHIPPING,
        payload: response
    }
}

export const CouponDisableAction = (response) => {
    return {
        type: ActionType.COUPONDISABLE,
        payload: response
    }
}

export const SubTotalAction = (response) => {
    return {
        type: ActionType.SUBTOTAL,
        payload: response
    }
}

export const CouponAction = (response) => {
    return {
        type: ActionType.COUPON,
        payload: response
    }
}

export const OrderDetailsAction = (response) => {
    return {
        type: ActionType.ORDERDETIALS,
        payload: response
    }
}
import ActionType from "../../ActionType";

const userState = {
    user: null,
    orders: null,
    wishlist: null,
    localWishlist: [],
    usercart: null,
    localUserCart: [],
    subTotal: 0,
    total: 0,
    discount: 0,
    shipping: null,
    coupon: null,
    couponDisable: false,
    orderDetails: null,
    order: null
}

const UserReducer = (state = userState, { type, payload }) => {
    switch (type) {
        case ActionType.USER:
            return { ...state, user: payload };

        case ActionType.USERORDERS:
            return { ...state, orders: payload };

        case ActionType.USERWISHLIST:
            return { ...state, wishlist: payload };

        case ActionType.USERLOCALWISHLIST:
            return { ...state, localWishlist: payload };

        case ActionType.USERCART:
            return { ...state, usercart: payload };

        case ActionType.USERLOCALCART:
            return { ...state, localUserCart: payload };

        case ActionType.SUBTOTAL:
            return { ...state, subTotal: payload };

        case ActionType.TOTAL:
            return { ...state, total: payload };

        case ActionType.DISCOUNT:
            return { ...state, discount: payload };

        case ActionType.SHIPPING:
            return { ...state, shipping: payload };

        case ActionType.COUPON:
            return { ...state, coupon: payload };

        case ActionType.COUPONDISABLE:
            return { ...state, couponDisable: payload };

        case ActionType.ORDERDETIALS:
            return { ...state, orderDetails: payload };

        case ActionType.SHOWORDER:
            return { ...state, order: payload };

        default:
            return state;
    }
}

export default UserReducer;
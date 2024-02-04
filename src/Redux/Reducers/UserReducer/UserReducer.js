import ActionType from "../../ActionType";

const userState = {
    user: null,
    wishlist: null,
    localWishlist: [],
    usercart: null
}

const UserReducer = (state = userState, { type, payload }) => {
    switch (type) {
        case ActionType.USER:
            return { ...state, user: payload };

        case ActionType.USERWISHLIST:
            return { ...state, wishlist: payload };

        case ActionType.USERLOCALWISHLIST:
            return { ...state, localWishlist: payload };

        case ActionType.USERCART:
            return { ...state, usercart: payload };

        default:
            return state;
    }
}

export default UserReducer;
import ActionType from "../../ActionType";

const userState = {
    user: null,
    wishlist: null,
    localWishlist: []
}

const UserReducer = (state = userState, { type, payload }) => {
    switch (type) {
        case ActionType.USER:
            return { ...state, user: payload };

        case ActionType.USERWISHLIST:
            return { ...state, wishlist: payload };

        case ActionType.USERLOCALWISHLIST:
            return { ...state, localWishlist: payload };

        default:
            return state;
    }
}

export default UserReducer;
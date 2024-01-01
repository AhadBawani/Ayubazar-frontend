import ActionType from "../../ActionType";

const ComponentState = {
    authenticate: false,
    cart: false
};

const ComponentReducer = (state = ComponentState, { type, payload }) => {
    switch (type) {
        case ActionType.AUTHENTICATE:
            return { ...state, authenticate: payload };

        case ActionType.OPENCART:
            return { ...state, cart: payload };

        default:
            return state;
    }
}

export default ComponentReducer;
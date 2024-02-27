import ActionType from "../../ActionType";

const ComponentState = {
    authenticate: false,
    cart: false,
    myAccountOption: null,
    header: true,
    footer: true,
    mobile: false,
};

const ComponentReducer = (state = ComponentState, { type, payload }) => {
    switch (type) {
        case ActionType.AUTHENTICATE:
            return { ...state, authenticate: payload };

        case ActionType.OPENCART:
            return { ...state, cart: payload };

        case ActionType.MYACCOUNTOPTION:
            return { ...state, myAccountOption: payload };

        case ActionType.HEADER:
            return { ...state, header: payload };

        case ActionType.FOOTER:
            return { ...state, footer: payload };

        case ActionType.ISMOBILEVIEW:
            return { ...state, mobile: payload };

        default:
            return state;
    }
}

export default ComponentReducer;
import ActionType from "../../ActionType"

const CompanyState = {
    company: null
}

const CompanyReducer = (state = CompanyState, { type, payload }) => {
    switch (type) {
        case ActionType.COMPANY:
            return { ...state, company: payload };

        default:
            return state;
    }
}

export default CompanyReducer;
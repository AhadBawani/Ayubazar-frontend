import ActionType from "../../ActionType";

export const CompanyAction = (response) => {
    return {
        type:ActionType.COMPANY,
        payload:response
    }
}
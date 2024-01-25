import ActionType from "../../ActionType"

export const AuthenticateDialogAction = (response) => {
    return {
        type: ActionType.AUTHENTICATE,
        payload: response
    }
}

export const OpenCartAction = (response) => {
    return {
        type: ActionType.OPENCART,
        payload: response
    }
}

export const MyAccountOptionAction = (response) => {
    return {
        type: ActionType.MYACCOUNTOPTION,
        payload: response
    }
}
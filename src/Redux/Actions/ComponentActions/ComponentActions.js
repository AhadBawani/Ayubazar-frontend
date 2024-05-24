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

export const HeaderAction = (response) => {
    return {
        type: ActionType.HEADER,
        payload: response
    }
}

export const FooterAction = (response) => {
    return {
        type: ActionType.FOOTER,
        payload: response
    }
}

export const MobileViewAction = (response) => {
    return {
        type: ActionType.ISMOBILEVIEW,
        payload: response
    }
}

export const UserMenuAction = (response) => {
    return {
        type: ActionType.USERMENU,
        payload: response
    }
}
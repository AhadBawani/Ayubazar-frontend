import axios from "axios"
import Requests from "../Requests/Requests"
import { ShowOrderAction, UserAction, UserCartAction, UserOrdersAction } from "../../Redux/Actions/UserActions/UsersAction"
import { AuthenticateDialogAction } from "../../Redux/Actions/ComponentActions/ComponentActions"

export const userLoginRequestHandler = (dispatch, data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.LOGIN_USER, data)
            .then((userResponse) => {
                if (userResponse.data) {
                    localStorage.setItem('userId', userResponse.data?._id);
                    dispatch(UserAction(userResponse.data));
                    resolve('Login successfull');
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const userSignupRequestHandler = (dispatch, data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.SIGNUP_USER, data)
            .then((userSignupResponse) => {
                if (userSignupResponse.data) {
                    dispatch(UserAction(userSignupResponse.data?.user));
                    localStorage.setItem('userId', userSignupResponse.data?.user?._id);
                    resolve('Signup successfull!');
                    dispatch(AuthenticateDialogAction(false));
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getUserByIdRequestHandler = (dispatch, id) => {
    axios.get(Requests.GET_USER_BY_ID + id)
        .then((userResponse) => {
            if (userResponse) {
                dispatch(UserAction(userResponse.data));
            }
        })
        .catch((error) => {
            console.log('error in getting user by id controller : ', error);
        })
}

export const addBillingAddressHandler = (dispatch, data, id) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.ADD_EDIT_BILLING_ADDRESS, data)
            .then((addressResponse) => {
                if (addressResponse) {
                    getUserByIdRequestHandler(dispatch, id);
                    resolve(addressResponse.data);
                }
            })
            .catch((error) => {
                console.log('error in add edit billing address controller : ', error);
                reject(error);
            })
    })
}

export const addShippingAddressHandler = (dispatch, data, id) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.ADD_EDIT_SHIPPING_ADDRESS, data)
            .then((addressResponse) => {
                if (addressResponse) {
                    getUserByIdRequestHandler(dispatch, id);
                    resolve(addressResponse.data);
                }
            })
            .catch((error) => {
                console.log('error in add edit shipping address controller : ', error);
                reject(error);
            })
    })
}

export const editUserRequestHandler = (dispatch, data, id) => {
    return new Promise((resolve, reject) => {
        axios.put(Requests.EDIT_USER + id, data)
            .then((response) => {
                if (response) {
                    dispatch(UserAction(response.data?.user));
                    resolve(true);
                }
            })
            .catch((error) => {
                console.log('error in edit user controller : ', error);
                reject(error);
            })
    })
}

export const getUserCartByIdHandler = (dispatch, userId) => {
    axios.get(Requests.GET_USER_CART_BY_ID + userId)
        .then((response) => {
            dispatch(UserCartAction(response.data));
        })
        .catch((error) => {
            console.log('error in getting user cart by ID controller : ', error);
        })
}

export const addToUserCartHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.ADD_USER_CART, data)
            .then((response) => {
                if (response) {
                    resolve(response);
                }
            })
            .catch((error) => {
                console.log('error in add to user cart handler : ', error);
                reject(error);
            })
    })
}

export const addCartQuantityHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.ADD_CART_QUANTITY, data)
            .then((response) => {
                if (response.data) {
                    resolve(true);
                }
            })
            .catch((error) => {
                console.log('error in add quantity handler : ', error);
                reject(error);
            })
    })
}

export const subtractCartQuantityHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.SUBTRACT_CART_QUANTITY, data)
            .then((response) => {
                if (response.data) {
                    resolve(true);
                }
            })
            .catch((error) => {
                console.log('error in subtract quantity handler : ', error);
                reject(error);
            })
    })
}

export const removeCartItemHandler = (cartId) => {
    return new Promise((resolve, reject) => {
        axios.delete(Requests.REMOVE_USER_CART + cartId)
            .then((response) => {
                if (response) {
                    resolve(true);
                }
            })
            .catch((error) => {
                console.log('error in remove cart item handler : ', error);
                reject(error);
            })
    })
}

export const applyCouponHandler = (couponCode) => {
    let obj = {
        coupon: couponCode
    }
    return new Promise((resolve, reject) => {
        axios.post(Requests.VALIDATE_COUPON, obj)
            .then((response) => {
                if (response) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const forgotPasswordHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.FORGOT_PASSWORD, data)
            .then((response) => {
                if (response) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const resetPasswordHandler = (dispatch, token, data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.RESET_PASSWORD + token, data)
            .then((response) => {
                if (response) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const addContactUsHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.ADD_CONTACT_US, data)
            .then((response) => {
                if (response) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const placeOrderHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.PLACE_ORDER, data)
            .then((orderResponse) => {
                if (orderResponse) {
                    resolve(orderResponse.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getUserByEmailHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.GET_USER_BY_EMAIL, data)
            .then((emailResponse) => {
                if (emailResponse) {
                    resolve(emailResponse.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getUserOrdersHandler = (dispatch, userId) => {
    axios.get(Requests.GET_USER_ORDERS + userId)
        .then((response) => {
            if (response) {
                dispatch(UserOrdersAction(response.data));
            }
        })
        .catch((error) => {
            console.log('error in getting user orders : ', error);
        })
}

export const requestForCancelOrderHandler = (dispatch, orderId, userId) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.REQUEST_FOR_CANCEL_ORDER + orderId)
            .then((response) => {
                if (response) {
                    getUserOrdersHandler(dispatch, userId);
                    resolve(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getOrderDetailHandler = (dispatch, userId, orderId) => {
    axios.get(Requests.GET_ORDER_DETAILS + userId + '/' + orderId)
        .then((response) => {
            if (response) {
                dispatch(ShowOrderAction(response.data));
            }
        })
        .catch((error) => {
            console.log('error in getting order detail Handler : ', error);
        })
}

export const updateOrderHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.UPDATE_USER_ORDER, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getUserIfExistHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.GET_USER_IF_EXIST, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}
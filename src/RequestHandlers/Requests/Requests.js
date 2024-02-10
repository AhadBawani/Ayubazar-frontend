const url = "http://localhost:5000";

const Requests = {
    GET_ALL_COMPANY: url + '/company',
    GET_ALL_PRODUCTS: url + '/product',
    GET_PRODUCT_IMAGE: url + '/product-images/',
    LOGIN_USER: url + '/user/login',
    SIGNUP_USER: url + '/user/signup',
    GET_USER_BY_ID: url + '/user/',
    ADD_EDIT_BILLING_ADDRESS: url + '/billing-address',
    ADD_EDIT_SHIPPING_ADDRESS: url + '/shipping-address',
    EDIT_USER : url + '/user/',
    GET_PRODUCT_BY_ID : url + '/product/',
    GET_USER_CART_BY_ID : url + '/usercart/',
    ADD_USER_CART : url + '/usercart',
    ADD_CART_QUANTITY : url + '/usercart/add-quantity',
    SUBTRACT_CART_QUANTITY: url + '/usercart/subtract-quantity',
    REMOVE_USER_CART : url + '/usercart/',    
}

export default Requests;
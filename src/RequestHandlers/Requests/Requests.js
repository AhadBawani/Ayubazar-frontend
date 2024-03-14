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
    EDIT_USER: url + '/user/',
    GET_PRODUCT_BY_ID: url + '/product/',
    GET_USER_CART_BY_ID: url + '/usercart/',
    ADD_USER_CART: url + '/usercart',
    ADD_CART_QUANTITY: url + '/usercart/add-quantity',
    SUBTRACT_CART_QUANTITY: url + '/usercart/subtract-quantity',
    REMOVE_USER_CART: url + '/usercart/',
    VALIDATE_COUPON: url + '/coupon/validate-coupon',
    GET_PRODUCT_REVIEW_BY_ID: url + '/review/product-review/',
    ADD_PRODUCT_REVIEW: url + '/review/add-review',
    GET_DISCOUNT_OFFER: url + '/offer/',
    GET_ALL_BLOGS: url + '/blog',
    GET_BLOG_IMAGE: url + '/blog-images/',
    FORGOT_PASSWORD: url + '/user/forgot-password',
    VERIFY_TOKEN: url + '/user/verify-token/',
    RESET_PASSWORD: url + '/user/reset-password/',
    ADD_CONTACT_US: url + '/contact/',
    GET_ORDER_ID: url + '/orders/get-order-id',
    GET_USER_ORDERS : url + '/orders/get-user-order/',
    PLACE_ORDER : url + '/orders/place-order',
    GET_USER_BY_EMAIL : url + '/user/get-user-by-mail',
    REQUEST_FOR_CANCEL_ORDER : url + '/orders/request-for-cancel/',
    GET_ORDER_DETAILS : url + '/orders/get-order/'
}

export default Requests;
import axios from "axios"
import Requests from "../Requests/Requests"
import { DiscountOfferAction, ProductAction, ProductReviewAction } from "../../Redux/Actions/ProductsActions/ProductsActions"

export const getAllProductsHandler = (dispatch) => {
    axios.get(Requests.GET_ALL_PRODUCTS)
        .then((response) => {
            dispatch(ProductAction(response.data))
        })
        .catch((error) => {
            console.log('error in get all products Handler : ', error);
        })
}

export const getProductByIdRequestHandler = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(Requests.GET_PRODUCT_BY_ID + id)
            .then((productResponse) => {
                if (productResponse) {
                    resolve(productResponse.data);
                }
            })
            .catch((error) => {
                console.log('error in get product by id Handler : ', error);
                reject(error);
            })
    })
}

export const getProductReviewByIdHandler = (dispatch, productId) => {
    axios.get(Requests.GET_PRODUCT_REVIEW_BY_ID + productId)
        .then((reviewResponse) => {
            if (reviewResponse) {
                dispatch(ProductReviewAction(reviewResponse.data));
            }
        })
}

export const addProductReviewHandler = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(Requests.ADD_PRODUCT_REVIEW, data)
            .then((reviewResponse) => {
                if (reviewResponse) {
                    resolve(reviewResponse.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const getDiscountOfferHandler = (dispatch) => {
    axios.get(Requests.GET_DISCOUNT_OFFER)
        .then((discountResponse) => {
            if(discountResponse){
                dispatch(DiscountOfferAction(discountResponse.data));
            }
        })
}
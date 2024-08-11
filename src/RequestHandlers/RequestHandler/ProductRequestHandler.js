import axios from "axios"
import Requests from "../Requests/Requests"
import { BestSellingProductAction, CategoriesAction, DiscountOfferAction, LatestProductAction, NarayaniProductsAction, ProductAction, ProductReviewAction } from "../../Redux/Actions/ProductsActions/ProductsActions"
import { toast } from "react-toastify"

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
            if (discountResponse) {
                dispatch(DiscountOfferAction(discountResponse.data));
            }
        })
        .catch((error) => {
            console.log('error in getting discount handler : ', error);
            toast.error('internal error occured!');
        })
}

export const getBestSellingProductsHandler = (dispatch) => {
    axios.get(Requests.GET_BEST_SELLING_PRODUCTS)
        .then((productRepsonse) => {
            if (productRepsonse.data?.length > 0) {
                dispatch(BestSellingProductAction(productRepsonse.data));
            }
        })
        .catch((error) => {
            console.log('error in getting discount handler : ', error);
            toast.error('internal error occured!');
        })
}

export const getLatestProductsHandler = (dispatch) => {
    axios.get(Requests.GET_LATEST_PRODUCTS)
        .then((productResponse) => {
            if (productResponse.data?.length > 0) {
                dispatch(LatestProductAction(productResponse.data));
            }
        })
        .catch((error) => {
            console.log('error in getting discount handler : ', error);
            toast.error('internal error occured!');
        })
}

export const getNarayaniProductHandler = (dispatch) => {
    axios.get(Requests.GET_NARAYANI_PRODUCT)
        .then((productResponse) => {
            if (productResponse.data?.length > 0) {
                dispatch(NarayaniProductsAction(productResponse.data));
            }
        })
        .catch((error) => {
            console.log('error in getting discount handler : ', error);
            toast.error('internal error occured!');
        })
}

export const getAllCategoriesHandler = (dispatch) => {
    axios.get(Requests.GET_ALL_CATEGORIES)
        .then((categoryResponse) => {
            if (categoryResponse?.data?.length > 0) {
                dispatch(CategoriesAction(categoryResponse.data));
            }
        })
        .catch((error) => {
            console.log('error in getting catgory handler : ', error);
            toast.error('internal error occured!');
        })
}

export const getCategoryDetailHandler = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(Requests.GET_CATEGORY_DETAIL_BY_ID + id)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
    })
}
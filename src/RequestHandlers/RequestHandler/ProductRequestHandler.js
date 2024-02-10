import axios from "axios"
import Requests from "../Requests/Requests"
import { ProductAction } from "../../Redux/Actions/ProductsActions/ProductsActions"

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
                if(productResponse){
                    resolve(productResponse.data);
                }
            })
            .catch((error) => {
                console.log('error in get product by id Handler : ', error);
                reject(error);
            })
    })
}
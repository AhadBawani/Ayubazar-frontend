import axios from "axios"
import Requests from "../Requests/Requests"
import { CompanyAction } from "../../Redux/Actions/CompanyActions/CompanyActions"

export const getAllCompanyHandler = (dispatch) => {
    axios.get(Requests.GET_ALL_COMPANY)
        .then((response) => {
            dispatch(CompanyAction(response.data))
        })
        .catch((error) => {
            console.log('error in get all company Handler : ', error);
        })
}
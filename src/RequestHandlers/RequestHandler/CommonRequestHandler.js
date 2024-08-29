import axios from "axios"
import Requests from "../Requests/Requests"

export const getAllBlogHandler = () => {
    return new Promise((resolve, reject) => {
        axios.get(Requests.GET_ALL_BLOGS)
            .then((response) => {
                if (response) {
                    resolve(response.data);
                }
            })
            .catch((error) => {
                const errorMessage = error?.response?.data || 'Error occured';
                reject(errorMessage);
            })
    })
}
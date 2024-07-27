import axios from "axios"
import Requests from "../Requests/Requests"

export const createPaymentHandler = async (data) => {
     return new Promise((resolve, reject) => {
          axios.post(Requests.PAYMENT, data)
               .then((response) => {
                    if (response.data) {
                         resolve(response.data);
                    }
               })
               .catch((error) => {
                    reject(error);
               })
     })
}
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

export const updatePaymentStatusHandler = async (data) => {
     axios.put(Requests.UPDATE_PAYMENT_SESSION, data)
          .then((response) => {
               if (response) {
                    return true;
               }
          })
          .catch((error) => {
               console.log('error in update payment session : ', error);
          })
}

export const getPaymentSessionStatusHandler = async (token, orderId) => {
     return new Promise((resolve, reject) => {
          axios.get(Requests.GET_PAYMENT_SESSION_STATUS + token + '/' + orderId)
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
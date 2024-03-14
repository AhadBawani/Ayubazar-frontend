import React, { useEffect } from 'react'
import Header from '../Components/OrderPayComponents/Header';
import PaymentBody from '../Components/OrderPayComponents/PaymentBody';
import { useDispatch } from 'react-redux';
import { OrderDetailsAction } from '../Redux/Actions/UserActions/UsersAction';


const OrderPay = () => {    
    const orderDetail = sessionStorage.getItem('order-detail');
    const dispatch = useDispatch();
    useEffect(() => {
        if (orderDetail) {
            dispatch(OrderDetailsAction(JSON.parse(orderDetail)));
        }
    }, [orderDetail, dispatch])    
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <PaymentBody />
            </div>
        </div>
    )
}

export default OrderPay;
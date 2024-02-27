import React from 'react'
import Header from '../Components/OrderPayComponents/Header';
import PaymentBody from '../Components/OrderPayComponents/PaymentBody';

const OrderPay = () => {
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
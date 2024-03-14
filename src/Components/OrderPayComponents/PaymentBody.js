import React from 'react'
import useUserState from '../../Hooks/useUserState'
import Button from '../../Fields/Button';
import { useDispatch } from 'react-redux';
import { addBillingAddressHandler, addShippingAddressHandler, getUserByEmailHandler, getUserCartByIdHandler, getUserOrdersHandler, placeOrderHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { toast } from 'react-toastify';

const PaymentBody = () => {
    const { orderDetails, shipping } = useUserState();
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    const handlePayByPaytm = () => {
        function getData(data) {
            return fetch('http://localhost:5000/pay', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => response.json()).catch(err => console.log(err));
        }
        getData({ amount: 500, email: 'ahadbawani123@gmail.com' })
            .then((response) => {
                console.log(response);
            });
    }

    const handlePlaceOrder = () => {
        getUserByEmailHandler({ email: orderDetails?.email })
            .then(async (userResponse) => {
                if (!userId) {
                    localStorage.setItem('userId', userResponse?._id);
                }
                if (userResponse) {
                    const billingObj = {
                        userId: userResponse?._id,
                        ...orderDetails?.orderBillingAddress
                    }
                    addBillingAddressHandler(dispatch, billingObj, userResponse?._id)
                        .then((billingResponse) => {
                            if (billingResponse) {
                                const shippingObj = {
                                    userId: userResponse?._id,
                                    ...orderDetails?.orderShippingAddress
                                }
                                addShippingAddressHandler(dispatch, shippingObj, userResponse?._id)
                                    .then((shippingResponse) => {
                                        if (shippingResponse) {
                                            const orderObj = {
                                                orderId: orderDetails?.orderId,
                                                userId: userResponse?._id,
                                                products: JSON.stringify(orderDetails?.products),
                                                orderBillingAddress: billingResponse?.billingAddress?._id,
                                                orderShippingAddress: shippingResponse?.shippingAddress?._id,
                                                subTotal: orderDetails?.subTotal,
                                                shipping: shipping?.charges,
                                                paymentType: 'Paytm',
                                                total: orderDetails?.total
                                            }
                                            placeOrderHandler(orderObj)
                                                .then((orderResponse) => {
                                                    if (orderResponse) {
                                                        getUserCartByIdHandler(dispatch, userResponse?._id);
                                                        getUserOrdersHandler(dispatch, userResponse?._id);
                                                        toast.success('Order placed successfully!');
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.log('error in place order handler : ', error);
                                                })
                                        }
                                    })
                                    .catch((error) => {
                                        console.log('error in add shipping address : ', error);
                                    })
                            }
                        })
                        .catch((error) => {
                            console.log('error in add billing address : ', error);
                        })
                }
            })
            .catch((error) => {
                console.log('error in getting user by email : ', error);
            })
    }
    return (
        <div className='ṁ-4 p-4 bg-white'>
            <div className='flex justify-center items-center'>
                <div style={{ border: '2px dashed green' }} className='p-6 flex justify-between w-[60%] my-8'>
                    <div className='flex flex-col text-center'>
                        <span style={{ lineHeight: '1.6', color: '#777' }}>Order number:</span>
                        <span style={{ lineHeight: '1.6', color: '#333', fontWeight: 'bold' }}>
                            {orderDetails?.orderId}
                        </span>
                    </div>
                    <div className='flex flex-col text-center'>
                        <span style={{ lineHeight: '1.6', color: '#777' }}>Date:</span>
                        <span style={{ lineHeight: '1.6', color: '#333', fontWeight: 'bold' }}>
                            {orderDetails?.date}
                        </span>
                    </div>
                    <div className='flex flex-col text-center'>
                        <span style={{ lineHeight: '1.6', color: '#777' }}>Total:</span>
                        <span style={{ lineHeight: '1.6', color: '#333', fontWeight: 'bold' }}>
                            {orderDetails?.total}
                        </span>
                    </div>
                    <div className='flex flex-col text-center'>
                        <span style={{ lineHeight: '1.6', color: '#777' }}>Payment Method:</span>
                        <span style={{ lineHeight: '1.6', color: '#333', fontWeight: 'bold' }}>
                            {orderDetails?.paymentMethod}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <Button text="Place order" onClick={handlePlaceOrder} />
                <div className='mt-4'>
                    <Button text="Pay Using Paytm" onClick={handlePayByPaytm} />
                </div>
            </div>
        </div>
    )
}

export default PaymentBody
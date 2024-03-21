import React, { useState } from 'react'
import useUserState from '../../Hooks/useUserState';
import { LuIndianRupee } from 'react-icons/lu';
import { ImSpinner8 } from "react-icons/im";
import paytm from '../../Images/paytm.jpeg'
import { useDispatch } from 'react-redux';
import { OrderDetailsAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useNavigate } from 'react-router-dom';
import {
    addBillingAddressHandler, addShippingAddressHandler,
    getUserByEmailHandler, placeOrderHandler
} from '../../RequestHandlers/RequestHandler/UserRequestHandler';


const PaymentComponent = () => {
    const { orderDetails, shipping, total } = useUserState();
    const userId = localStorage.getItem('userId');
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handlePlaceOrder = () => {
        setIsProcessing(true);
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
                                                userId: userResponse?._id,
                                                products: JSON.stringify(orderDetails?.products),
                                                orderBillingAddress: billingResponse?.billingAddress?._id,
                                                orderShippingAddress: shippingResponse?.shippingAddress?._id,
                                                subTotal: orderDetails?.subTotal,
                                                shipping: shipping?.charges,
                                                status: 'waiting',
                                                paymentType: 'Phone Pe',
                                                total: total
                                            }
                                            placeOrderHandler(orderObj)
                                                .then((orderResponse) => {
                                                    if (orderResponse) {
                                                        setTimeout(() => {
                                                            dispatch(OrderDetailsAction(orderResponse?.order));
                                                            sessionStorage.setItem('order-detail',
                                                                JSON.stringify(orderResponse?.order));
                                                            navigate('/checkout/order-pay');
                                                            setIsProcessing(false);
                                                        }, 1000)
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
        <div className='m-4 relative'>
            {isProcessing && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                    <ImSpinner8 size={36} className="animate-spin text-black" />
                </div>
            )}
            <div className='border border-[#ddd] rounded-lg px-4'>
                <div className='flex justify-between my-3'>
                    <div>
                        <span>Contact</span>
                        <span
                            className='ml-3 font-bold'
                            style={{ lineHeight: '1.4' }}>
                            {orderDetails?.email}
                        </span>
                    </div>
                    <div>
                        <span
                            className='text-[#999] hover:text-inherit 
                            cursor-pointer transition-all ease-in-out duration-200'>
                            Change
                        </span>
                    </div>
                </div>
                <hr />
                <div className='flex justify-between my-3'>
                    <div>
                        <span>Ship to</span>
                        <span
                            className='ml-3 font-bold'
                            style={{ lineHeight: '1.4' }}>
                            <span>{shipping?.city} </span>
                            <span>{shipping?.state}</span>
                            , <span>{shipping?.postcode}</span>
                        </span>
                    </div>
                    <div>
                        <span
                            className='text-[#999] hover:text-inherit 
                            cursor-pointer transition-all ease-in-out duration-200'>
                            Change
                        </span>
                    </div>
                </div>
                <hr />
                <div className='flex justify-between my-3'>
                    <div className='flex'>
                        <span>Method</span>
                        {
                            shipping?.charges === 'free'
                                ?
                                <>
                                    <span
                                        className='ml-3 font-bold'
                                        style={{ lineHeight: '1.4' }}>
                                        Free Shipping
                                    </span>
                                </>
                                :
                                <>
                                    <span className='ml-3 font-bold'>Delivery Charges : </span>
                                    <div className='flex ml-1 font-bold' style={{ lineHeight: '1.4' }}>
                                        <span><LuIndianRupee className='mt-[4px] mr-[1px]' /></span>
                                        <span>{shipping?.charges}.00</span>
                                    </div>
                                </>
                        }
                    </div>
                    <div>
                        <span
                            className='text-[#999] hover:text-inherit 
                            cursor-pointer transition-all ease-in-out duration-200'>
                            Change
                        </span>
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <span
                    style={{
                        lineHeight: '1.4',
                        fontSize: '130%'
                    }}
                    className='font-semibold'>
                    Payment Methods
                </span>
                <div className='border border-[#ddd] rounded-lg p-4 mt-3'>
                    <div className='flex items-center space-x-2'>
                        <input type='radio' checked readOnly />
                        <span className='text-xl'
                            style={{
                                color: '#4d4d4d',
                                lineHeight: '1.6',
                                fontWeight: 'bold'
                            }}>Paytm</span>
                        <img src={paytm} alt='cc-avenue' height="50px" width="80px" />
                    </div>
                    <div className='mx-4 my-6'>
                        <span style={{ lineHeight: '1.4', fontSize: '100%' }}>Pay securely by UPI/Paytm/ Credit or Debit cards/ Internet Banking/
                            Other Wallets through Paytm Secure Servers.</span>
                    </div>
                </div>
                <hr className='mt-4' />
                <div className='p-4'>
                    <span
                        style={{
                            textRendering: 'optimizeLegibility',
                            color: '#333'
                        }}>Your personal data will be used to process your order,
                        support your experience throughout this website,
                        and for other purposes described in our
                        <span className='underline transition-all ml-1
                        ease-in-out duration-200 hover:text-[#d0bdac] cursor-pointer'>
                            privacy policy
                        </span>
                        .</span>
                </div>
                <hr />
                <div className='mt-4'>
                    <button
                        style={{
                            letterSpacing: '2px',
                            lineHeight: '1.4',
                            height: '42px',
                            fontSize: '12px'
                        }}
                        className='w-[100%] uppercase font-bold bg-[#027148] hover:bg-[#013220] outline-none
                    text-white p-2 rounded-md transition-all ease-in-out duration-200' onClick={handlePlaceOrder}>
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentComponent;
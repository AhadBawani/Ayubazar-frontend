import React, { useEffect, useState } from 'react'
import useUserState from '../../Hooks/useUserState';
import { LuIndianRupee } from 'react-icons/lu';
import { ImSpinner8 } from "react-icons/im";
import phonepe from '../../Images/phonepepng.png';
import { useDispatch } from 'react-redux';
import { CodChargesAction, TotalAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useNavigate } from 'react-router-dom';
import {
    addBillingAddressHandler, addShippingAddressHandler,
    getUserByEmailHandler, placeOrderHandler
} from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { deliveryDate } from '../../Utils/FormatDate';
import { toast } from 'react-toastify';
import axios from 'axios';


const PaymentComponent = () => {
    const { orderDetails, shipping, total, codCharges, codAvailable, handlingCharges, subTotal } = useUserState();
    const userId = localStorage.getItem('userId');
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('PhonePe');
    const codAmount = handlingCharges ? Math.ceil(0.05 * (total + handlingCharges)) : Math.ceil(0.05 * total);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (subTotal) {
            dispatch(TotalAction(subTotal, 'payment component 29'));
        }
        if (shipping?.charges === 'free') {
            return;
        }
        if (shipping && shipping?.charges > 0) {
            dispatch(TotalAction(subTotal + parseInt(shipping?.charges), 'payment component 35'));
        }
    }, [subTotal, shipping, dispatch])

    const handlePaymentMethodChange = (event) => {
        const value = event.target.value;
        setSelectedPaymentMethod(value);
        if (value === 'COD') {
            dispatch(CodChargesAction(codAmount));
        } else {
            dispatch(TotalAction(total - codCharges));
            dispatch(CodChargesAction(null));
        }
    };

    const createPayment = (orderDetails) => {
        setIsProcessing(true);
        const obj = {
            amount: orderDetails?.total,
            orderId: orderDetails?.orderId,
            MUID: "MUID" + Date.now(),
            transactionId: 'T' + Date.now(),
        }
        axios.post('http://localhost:5000/payment', { ...obj })
            .then(res => {
                setTimeout(() => {
                    setIsProcessing(false);
                    window.location.href = res.data
                }, 1500);
            })
            .catch(error => {
                setIsProcessing(false)
                console.error(error);
            });
    }

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
                                                status: codCharges ? 'Pending' : 'cancelled',
                                                paymentType: codCharges ? 'Cash on Delivery' : 'Phone Pe',
                                                codCharges: codAmount,
                                                handlingCharges: handlingCharges,
                                                total: total + handlingCharges,
                                            }
                                            placeOrderHandler(orderObj)
                                                .then((orderResponse) => {
                                                    if (orderResponse) {
                                                        setTimeout(() => {
                                                            if (selectedPaymentMethod === 'COD') {
                                                                navigate('/success');
                                                            } else {
                                                                createPayment(orderResponse?.order);                                                                
                                                            }
                                                            setIsProcessing(false);
                                                        }, 1000)
                                                    }
                                                })
                                                .catch((error) => {
                                                    const message = error?.response?.data?.message;
                                                    toast.error(message);
                                                    setIsProcessing(false);
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
            <div className='my-4'>
                <span className='font-bold'>
                    Order estimated delivery between
                    <span className='ml-1'>{deliveryDate(Date.now()).firstDate} -
                        <span className='ml-1'>{deliveryDate(Date.now()).secondDate}</span>
                    </span>
                </span>
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
                    <label className='flex items-center space-x-2 cursor-pointer'>
                        <input
                            type='radio'
                            value='PhonePe'
                            checked={selectedPaymentMethod === 'PhonePe'}
                            onChange={handlePaymentMethodChange}
                        />
                        <span className='text-xl' style={{ color: '#4d4d4d', lineHeight: '1.6', fontWeight: 'bold' }}>Phone Pe</span>
                        <img src={phonepe} alt='Phone-Pe' height="80px" width="100px" />
                    </label>
                    <div className='mx-4 my-6'>
                        <span style={{ lineHeight: '1.4', fontSize: '100%' }}>
                            Pay securely by UPI/Phone Pe/ Credit or Debit cards/ Internet Banking/ Other Wallets through Paytm Secure Servers.
                        </span>
                    </div>
                    <div>
                        <label
                            className={`flex items-center space-x-2 ${!codAvailable ? 'opacity-50' : 'cursor-pointer'}`}
                        >
                            <input
                                type='radio'
                                value='COD'
                                checked={selectedPaymentMethod === 'COD'}
                                onChange={handlePaymentMethodChange}
                                disabled={!codAvailable}
                            />
                            <span
                                className='text-xl'
                                style={{
                                    color: '#4d4d4d',
                                    lineHeight: '1.6',
                                    fontWeight: 'bold'
                                }}>
                                Cash on Delivery
                            </span>
                        </label>
                        <div className='mx-4 my-6'>
                            {
                                codAvailable &&
                                <span style={{ lineHeight: '1.4', fontSize: '100%' }}>
                                    In COD 5% will be charged on total bill amount {codAmount}/-
                                </span>
                            }
                        </div>
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
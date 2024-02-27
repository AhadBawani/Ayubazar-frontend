import React from 'react'
import useUserState from '../../Hooks/useUserState';
import { LuIndianRupee } from 'react-icons/lu';
import cc from '../../Images/cc.png';
import { useDispatch } from 'react-redux';
import { OrderDetailsAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = () => {
    const { orderDetails, total } = useUserState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentDate = new Date();

    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    const monthName = monthNames[currentDate.getMonth()];

    const day = currentDate.getDate();

    const year = currentDate.getFullYear();

    const formattedDate = `${monthName} ${day}, ${year}`;

    const handlePlaceOrder = () => {
        dispatch(OrderDetailsAction({
            orderNumber: 1234,
            date: formattedDate,
            total: total,
            paymentMethod: 'CCAvenue'
        }));
        navigate('/checkout/order-pay');
    }

    return (
        <div className='m-4'>
            <div className='border border-[#ddd] rounded-lg px-4'>
                <div className='flex justify-between my-3'>
                    <div>
                        <span>Contact</span>
                        <span
                            className='ml-3 font-bold'
                            style={{ lineHeight: '1.4' }}>
                            {orderDetails?.userContact}
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
                            <span>{orderDetails?.shipping?.city} </span>
                            <span>{orderDetails?.shipping?.state}</span>
                            , <span>{orderDetails?.shipping?.postcode}</span>
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
                            orderDetails?.shipping?.charges === 'free'
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
                                        <span>70.00</span>
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
                    <div className='flex space-x-2'>
                        <input type='radio' checked />
                        <span
                            style={{
                                fontSize: '1em',
                                color: '#4d4d4d',
                                lineHeight: '1.6',
                                fontWeight: 'bold'
                            }}>CC Avenue</span>
                        <img src={cc} alt='cc-avenue' className='mt-[-2px]' height="50px" width="80px" />
                    </div>
                    <div className='mx-4 my-6'>
                        <span style={{ lineHeight: '1.4', fontSize: '100%' }}>Pay securely by UPI/Paytm/ Credit or Debit cards/ Internet Banking/
                            Other Wallets through CCAvenue Secure Servers.</span>
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
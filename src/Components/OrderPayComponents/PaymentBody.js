import React, { useState } from 'react'
import useUserState from '../../Hooks/useUserState'
import Button from '../../Fields/Button';
import { ImSpinner8 } from "react-icons/im";
import { formatDate } from '../../Utils/FormatDate';
import phonepe from '../../Images/phonepepng.png';
import axios from 'axios';

const PaymentBody = () => {
    const { orderDetails } = useUserState();    
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        const obj = {
            amount: orderDetails?.total,
            orderId: orderDetails?.orderId,
            MUID: "MUID" + Date.now(),
            transactionId: 'T' + Date.now(),
        }        
        axios.post('https://api.ayubazar.in/payment', { ...obj })
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
    return (
        <div className='ṁ-4 p-4 bg-white relative'>
            {isProcessing && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                    <ImSpinner8 size={36} className="animate-spin text-black" />
                </div>
            )}
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
                            {formatDate(orderDetails?.createdAt)}
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
                            {orderDetails?.paymentType}
                        </span>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <img src={phonepe} alt='Phone-Pe' />
            </div>
            <div className='my-6'>
                <Button text="Pay with phone pe" onClick={handlePlaceOrder} />
            </div>
        </div>
    )
}

export default PaymentBody
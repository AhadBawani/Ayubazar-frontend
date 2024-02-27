import React from 'react'
import useUserState from '../../Hooks/useUserState'

const PaymentBody = () => {
    const { orderDetails } = useUserState();
    return (
        <div className='ṁ-4 p-4 bg-white'>
            <div className='flex justify-center items-center'>
                <div style={{ border: '2px dashed green' }} className='p-6 flex justify-between w-[60%] my-8'>
                    <div className='flex flex-col text-center'>
                        <span style={{ lineHeight: '1.6', color: '#777' }}>Order number:</span>
                        <span style={{ lineHeight: '1.6', color: '#333', fontWeight: 'bold' }}>
                            {orderDetails?.orderNumber}
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
        </div>
    )
}

export default PaymentBody
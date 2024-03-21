import React from 'react'
import useUserState from '../../Hooks/useUserState'
import Button from '../../Fields/Button';
import { getUserCartByIdHandler, updateOrderHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../Utils/FormatDate';

const PaymentBody = () => {
    const { orderDetails } = useUserState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePayByPaytm = () => {

    }

    const handlePlaceOrder = () => {
        const obj = {
            userId: orderDetails?.userId,
            orderId: orderDetails?.orderId,
            status: 'Pending',
        }
        updateOrderHandler(obj)
            .then((response) => {
                toast.success(response?.message);
                getUserCartByIdHandler(dispatch, orderDetails?.userId);
                sessionStorage.removeItem('order-detail')
                navigate('/Home')
            })
            .catch((error) => {
                console.log('error in update order handler : ', error);
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
import React from 'react'
import { LuIndianRupee } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { OpenCartAction } from '../../../Redux/Actions/ComponentActions/ComponentActions';

const CartFooter = ({ total }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleViewCartClick = () => {
        navigate('/shopping-cart');
        dispatch(OpenCartAction(null));
    }
    const handleCheckout = () => {
        navigate('/checkout');
        dispatch(OpenCartAction(null));
    }
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-1">
            <div className='flex flex-col'>
                <div className='m-4 flex justify-between'>
                    <span className='text-[#333] font-semibold'
                        style={{
                            fontSize: '120%',
                        }}
                    >
                        Subtotal
                    </span>
                    <div className='flex'>
                        <span><LuIndianRupee className='mt-[6px] mr-[2px]' /></span>
                        <span className='text-[#333] font-semibold'
                            style={{
                                fontSize: '120%',
                            }}
                        >
                            {total}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-center items-center mb-3'>
                        <button className='uppercase p-2 w-[95%] transition-all 
                            ease-in-out duration-300 bg-[#efefef] hover:bg-[#DFDFDF]
                             text-[#333] font-semibold rounded-md'
                            style={{
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                letterSpacing: '2px',
                                lineHeight: '1.4',
                                fontSize: '12px',
                                height: '42px'
                            }}
                            onClick={handleViewCartClick}
                        >
                            View cart
                        </button>
                    </div>
                    <div className='flex justify-center items-center mb-3'>
                        <button className='uppercase p-2 w-[95%] transition-all 
                            ease-in-out duration-300 bg-[#d0bdac] hover:bg-[#bfae9e]
                             text-white font-semibold rounded-md'
                            style={{
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                letterSpacing: '2px',
                                lineHeight: '1.4',
                                fontSize: '12px',
                                height: '42px'
                            }} onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartFooter
import React from 'react'
import { FiShoppingBag } from "react-icons/fi";
import Button from '../../../Fields/Button';
import { OpenCartAction } from '../../../Redux/Actions/ComponentActions/ComponentActions';
import { useDispatch } from 'react-redux';

const EmptyCart = () => {
    const dispatch = useDispatch();

    const handleReturnToShop = () => {
        dispatch(OpenCartAction(false));
    }
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className='m-4 p-4 flex-col h-full mt-16'>
                    <FiShoppingBag size={160} className='text-[#eee]' />
                </div>
                <div className='text-lg text-[#333333]'>
                    <span>No products in the cart.</span>
                </div>
                <div className='my-3 w-[80%]'>
                    <Button text="Return to shop" onClick={handleReturnToShop} />
                </div>
            </div>
        </>
    )
}

export default EmptyCart
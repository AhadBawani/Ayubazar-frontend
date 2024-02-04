import React from 'react';
import { FiShoppingBag } from "react-icons/fi";
import Button from '../../Fields/Button';
import { OpenCartAction } from '../../Redux/Actions/ComponentActions/ComponentActions';
import UserCartCard from './UserCartCard';

const UserCart = ({ userCart, dispatch }) => {
    const handleReturnToShop = () => {
        dispatch(OpenCartAction(false));
    }
    return (
        <>
            <div>
                {
                    userCart.length > 0
                        ?
                        <>
                            <div className='m-2 p-2'>
                                {
                                    userCart?.map((item, index) => {
                                        return <UserCartCard item={item} key={index} />
                                    })
                                }
                            </div>
                        </>
                        :
                        <>
                            <div className='m-4 p-4 flex justify-center items-center flex-col h-full mt-16'>
                                <FiShoppingBag size={160} className='text-[#eee]' />
                            </div>
                            <div className='flex justify-center items-center text-lg text-[#333333]'>
                                <span>No products in the cart.</span>
                            </div>
                            <div className='flex justify-center items-center my-3'>
                                <Button text="Return to shop" color="#d0bdac" hoverColor="#bfae9e" width="80%" onClick={handleReturnToShop} />
                            </div>
                        </>
                }
            </div>
        </>

    )
}

export default UserCart;
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Requests from '../../RequestHandlers/Requests/Requests';
import { ImSpinner8 } from "react-icons/im";

const UserCartCard = ({ item }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const userLocalCart = JSON.parse(localStorage.getItem('cart'));
    const handleSubtractQuantity = () => {
        const index = userLocalCart.findIndex((usercart) => usercart.id === item.product._id &&
            Object.keys(usercart.option)[0] === Object.keys(item.option)[0]);

        if (index !== -1) {
            const updatedUserLocalCart = [...userLocalCart];
            if (updatedUserLocalCart[index].quantity > 1) {
                updatedUserLocalCart[index].quantity--; // Decrease quantity
            } else {
                // Remove item from cart

            }
            localStorage.setItem('cart', JSON.stringify(updatedUserLocalCart));
            // Update state or dispatch an action to update state if necessary
        }
        setIsProcessing();
    };

    const handleAddQuantity = () => {
        const index = userLocalCart?.findIndex((usercart) => usercart?.id === item?.product?._id &&
            Object.keys(usercart?.option)[0] === Object.keys(item?.option)[0])

        if (index !== -1) {
            const updatedUserLocalCart = [...userLocalCart];
            updatedUserLocalCart[index].quantity++; // Increase quantity
            localStorage.setItem('cart', JSON.stringify(updatedUserLocalCart));
            // Update state or dispatch an action to update state if necessary
        }

        // setIsProcessing(true);
        // setTimeout(() => {
        //     setQuantity((prevQuantity) => prevQuantity + 1);
        //     setIsProcessing(false); // Set processing state to false after 3 seconds
        // }, 3000);        
    };
    return (
        <>
            <div>
                {isProcessing && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
                        <ImSpinner8 size={36} className="animate-spin text-white" />
                    </div>
                )}
                <div className='flex'>
                    <div className='min-h-[90px] max-h-[90px]
                min-w-[90px] max-w-[90px]
                inline-block align-middle'
                        style={{
                            border: '1px solid #ececec'
                        }}>
                        <img className='max-w-[100%]'
                            src={Requests.GET_PRODUCT_IMAGE
                                + item?.product?.productImage}
                            alt='Ayubazar' />
                    </div>
                    <div className='ml-2 flex flex-col'>
                        <div>
                            <span className='transition-all 
                        ease-in-out duration-300 text-[#333] text-base
                        hover:text-[#d0bdac] font-semibold cursor-pointer'
                                style={{
                                    lineHeight: '1.2',
                                }}>
                                {item?.product?.productName}
                            </span>
                        </div>
                        <div className='flex mt-2'>
                            <div
                                className='flex justify-center 
                        h-[20px] items-center p-2 cursor-pointer 
                        transition-all duration-200 ease-in-out
                        hover:text-[#d0bdac] hover:bg-[#f1f1f1]'
                                style={{
                                    border: '1px solid #ddd',
                                    borderTopLeftRadius: '8px',
                                    borderBottomLeftRadius: '8px',
                                }}
                                onClick={handleSubtractQuantity}
                            >
                                <span className='mt-[-2px]'>
                                    -
                                </span>
                            </div>
                            <div
                                className='flex justify-center 
                        h-[20px] items-center p-2'
                                style={{ border: '1px solid #ddd' }}>
                                {item?.quantity}
                            </div>
                            <div
                                className='flex justify-center 
                        h-[20px] items-center p-2 cursor-pointer
                        transition-all ease-in-out duration-200
                        hover:text-[#d0bdac] hover:bg-[#f1f1f1]'
                                style={{
                                    border: '1px solid #ddd',
                                    borderTopRightRadius: '8px',
                                    borderBottomRightRadius: '8px',
                                }}
                                onClick={handleAddQuantity}
                            >
                                <span className='mt-[-2px]'>+</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className='transition-all 
                    ease-in-out duration-300 w-[28px] h-[28px] 
                    rounded-full hover:bg-[#f1f1f1] text-center p-1'>
                        <IoMdClose
                            size={20}
                            className='cursor-pointer'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCartCard
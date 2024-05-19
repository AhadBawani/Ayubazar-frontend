import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { LuIndianRupee } from "react-icons/lu";
import Requests from '../../../RequestHandlers/Requests/Requests';
import { ImSpinner8 } from "react-icons/im";
import useUserState from '../../../Hooks/useUserState';
import { useDispatch } from 'react-redux';
import { UserLocalCartAction } from '../../../Redux/Actions/UserActions/UsersAction';
import { addCartQuantityHandler, getUserCartByIdHandler, removeCartItemHandler, subtractCartQuantityHandler } from '../../../RequestHandlers/RequestHandler/UserRequestHandler';
import { toast } from 'react-toastify';

const UserCartCard = ({ item }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const { user, localUserCart } = useUserState();
    const dispatch = useDispatch();

    const handleRemoveProduct = (cartId, product, option) => {
        setIsProcessing(true);
        if (!user) {
            const arr = [...localUserCart];
            const index = arr.findIndex((items) => items?.id === product?._id
                && Object.keys(items?.option)[0] === Object.keys(option)[0]);
            arr.splice(index, 1);            
            setTimeout(() => {
                dispatch(UserLocalCartAction(arr));
                localStorage.setItem('cart', JSON.stringify(arr));
                setIsProcessing(false);
            }, 1000)
        }
        else {
            removeCartItemHandler(cartId)
                .then((response) => {
                    if (response) {
                        setTimeout(() => {
                            setIsProcessing(false);
                            getUserCartByIdHandler(dispatch, user?._id);
                            toast.error('Product removed successfully!');
                        }, 1000)
                    }
                })
        }
    }

    const handleSubtractQuantity = (quantity, product, option, cartId) => {
        setIsProcessing(true);
        if (quantity === 1) {
            handleRemoveProduct(cartId, product, option);
        } else {
            if (user) {
                const obj = {
                    userId: user?._id,
                    cartId: item?._id
                }
                subtractCartQuantityHandler(obj)
                    .then((response) => {
                        if (response) {
                            setTimeout(() => {
                                setIsProcessing(false);
                                getUserCartByIdHandler(dispatch, user?._id);
                            }, 1000)
                        }
                    })
            } else {
                const index = localUserCart?.findIndex((usercart) => usercart.id === item.product._id &&
                    Object.keys(usercart.option)[0] === Object.keys(item.option)[0]);

                if (index !== -1) {
                    const updatedUserLocalCart = [...localUserCart];
                    if (updatedUserLocalCart[index].quantity > 1) {
                        updatedUserLocalCart[index].quantity--; // Decrease quantity
                    }
                    setTimeout(() => {
                        dispatch(UserLocalCartAction(updatedUserLocalCart));
                        localStorage.setItem('cart', JSON.stringify(updatedUserLocalCart));
                        setIsProcessing(false);
                    }, 1000)
                }
            }
        }
    };


    const handleAddQuantity = (id) => {
        setIsProcessing(true);
        if (!user) {
            const index = localUserCart?.findIndex((usercart) => usercart?.id === item?.product?._id &&
                Object.keys(usercart?.option)[0] === Object.keys(item?.option)[0])

            if (index !== -1) {
                const updatedUserLocalCart = [...localUserCart];
                updatedUserLocalCart[index].quantity++; // Increase quantity

                // Update state or dispatch an action to update state if necessary
                setTimeout(() => {
                    dispatch(UserLocalCartAction(updatedUserLocalCart));
                    localStorage.setItem('cart', JSON.stringify(updatedUserLocalCart));
                    setIsProcessing(false);
                }, 1000)
            }
        } else {
            const obj = {
                userId: user?._id,
                cartId: id
            }
            addCartQuantityHandler(obj)
                .then((response) => {
                    if (response) {
                        setTimeout(() => {
                            setIsProcessing(false);
                            getUserCartByIdHandler(dispatch, user?._id);
                        }, 1000)
                    }
                })
        }
    };

    return (
        <>
            <div className='mb-6 relative'>
                {isProcessing && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                        <ImSpinner8 size={36} className="animate-spin text-black" />
                    </div>
                )}

                <div className='flex'>
                    <div className='min-h-[90px] max-h-[90px] min-w-[90px] max-w-[90px] flex justify-center items-center rounded-md' style={{ border: '1px solid #ececec' }}>
                        <img className='min-h-[80px] max-h-[80px] min-w-[80px] max-w-[80px]' src={Requests.GET_PRODUCT_IMAGE + item?.product?.productImage} alt='Ayubazar' />
                    </div>
                    <div className='ml-2 flex flex-col flex-grow'>
                        <div style={{ maxWidth: '240px' }} className="whitespace-normal">
                            <span
                                className='text-[#333] hover:text-[#d0bdac]
                        cursor-pointer text-sm font-semibold overflow-hidden'
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2, // Limit to two lines
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {item?.product?.productName}
                            </span>
                        </div>
                        <div className='flex mt-auto'>
                            <div
                                className='flex justify-center h-[20px] items-center p-2 
                            cursor-pointer transition-all duration-200 ease-in-out 
                            hover:text-[#d0bdac] hover:bg-[#f1f1f1]'
                                style={{
                                    border: '1px solid #ddd',
                                    borderTopLeftRadius: '8px',
                                    borderBottomLeftRadius: '8px'
                                }}
                                onClick={() => handleSubtractQuantity(item?.quantity, item?.product, item?.option, item?._id)}>
                                <span className='mt-[-2px]'>-</span>
                            </div>
                            <div className='flex justify-center h-[20px] items-center p-2' style={{ border: '1px solid #ddd' }}>
                                {item?.quantity}
                            </div>
                            <div className='flex justify-center h-[20px] items-center p-2
                             cursor-pointer transition-all ease-in-out
                              duration-200 hover:text-[#d0bdac] hover:bg-[#f1f1f1]'
                                style={{
                                    border: '1px solid #ddd',
                                    borderTopRightRadius: '8px',
                                    borderBottomRightRadius: '8px'
                                }}
                                onClick={() => handleAddQuantity(item?._id)}>
                                <span className='mt-[-2px]'>+</span>
                            </div>
                            <div className='flex ml-2'>
                                <span><IoMdClose className='mt-[2px]' /></span>
                                <div className='flex ml-2 mt-[-2px]'>
                                    <LuIndianRupee className='mt-1' />
                                    <span>{Object.values(item?.option) && Object.values(item?.option)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-0 right-0 flex items-center'>
                        <div className='transition-all ease-in-out duration-300 
                            w-[28px] h-[28px] hover:text-[#d0bdac] rounded-full
                            hover:bg-[#f1f1f1] text-center p-1 text-'
                            onClick={() => handleRemoveProduct(item?.product, item?.option)}>
                            <IoMdClose size={20} className='cursor-pointer' />
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0 right-0'>
                    <div className='flex justify-center items-center'>
                        <div className='flex'>
                            <LuIndianRupee className='mt-1' />
                            <span>{Object.values(item?.option) && parseInt(item?.quantity) * Object.values(item?.option)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCartCard
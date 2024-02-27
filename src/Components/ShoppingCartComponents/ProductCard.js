import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { LuIndianRupee } from 'react-icons/lu';
import Requests from '../../RequestHandlers/Requests/Requests';
import useUserState from '../../Hooks/useUserState';
import { ImSpinner8 } from "react-icons/im";
import { addCartQuantityHandler, getUserCartByIdHandler, removeCartItemHandler, subtractCartQuantityHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserLocalCartAction } from '../../Redux/Actions/UserActions/UsersAction';

const CartButton = ({ value, handleAddQuantity, handleSubtractQuantity }) => {
    return (
        <div className='flex'>
            <div className='rounded-l-lg'
                style={{
                    border: '1px solid #efefef',
                    width: '45px',
                    height: '42px',
                    lineHeight: '41px',
                    display: 'inline-block',
                    textAlign: 'center',
                    color: '#666',
                    fontWeight: 400
                }}>
                {value}
            </div>
            <div className='flex flex-col'>
                <div className='rounded-tr-lg hover:bg-[##efefef] hover:text-black'
                    style={{
                        width: '21px',
                        height: '21px',
                        textAlign: 'center',
                        border: '1px solid #efefef',
                        backgroundColor: '#fff',
                        fontWeight: 400,
                        cursor: 'pointer'
                    }}
                    onClick={handleAddQuantity}
                >
                    +
                </div>
                <div className='rounded-br-lg hover:bg-[##efefef] hover:text-black'
                    style={{
                        width: '21px',
                        height: '21px',
                        textAlign: 'center',
                        border: '1px solid #efefef',
                        backgroundColor: '#fff',
                        fontWeight: 400,
                        cursor: 'pointer'
                    }}
                    onClick={handleSubtractQuantity}
                >
                    -
                </div>
            </div>
        </div>
    )
}

const ProductCard = ({ item, isMobileView, isProcessing, setIsProcessing }) => {
    const { user, usercart, localUserCart } = useUserState();
    const [isCardProcessing, setIsCardProcessing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddQuantity = () => {
        setIsProcessing(true);
        setIsCardProcessing(true);
        if (user) {
            const obj = {
                userId: user?._id,
                cartId: item?._id
            }
            addCartQuantityHandler(obj)
                .then((response) => {
                    if (response) {
                        updateUserCart();
                    }
                })
        }
        else {
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
                    setIsCardProcessing(false);
                }, 1000)
            }
        }
    }

    const handleSubtractQuantity = () => {
        setIsProcessing(true);
        setIsCardProcessing(true);
        if (user) {
            const obj = {
                userId: user?._id,
                cartId: item?._id
            }
            subtractCartQuantityHandler(obj)
                .then((response) => {
                    if (response) {
                        updateUserCart();
                    }
                })
        } else {
            const index = localUserCart?.findIndex((usercart) => usercart.id === item.product._id &&
                Object.keys(usercart.option)[0] === Object.keys(item.option)[0]);

            if (index !== -1) {
                const updatedUserLocalCart = [...localUserCart];
                if (updatedUserLocalCart[index].quantity > 1) {
                    updatedUserLocalCart[index].quantity--; // Decrease quantity
                } else {
                    // Remove item from cart

                }
                // Update state or dispatch an action to update state if necessary
                setTimeout(() => {
                    dispatch(UserLocalCartAction(updatedUserLocalCart));
                    localStorage.setItem('cart', JSON.stringify(updatedUserLocalCart));
                    setIsProcessing(false);
                    setIsCardProcessing(false);
                }, 1000)
            }
        }
    }

    const removeCartItem = () => {
        setIsProcessing(true);
        setIsCardProcessing(true);
        if (user) {
            removeCartItemHandler(item?._id)
                .then((response) => {
                    if (response) {
                        updateUserCart();
                    }
                })
        }
        if (usercart?.length === 0) {
            navigate('/home');
        }
    }
    const updateUserCart = () => {
        if (user) {
            setTimeout(() => {
                setIsProcessing(false);
                setIsCardProcessing(false);
                getUserCartByIdHandler(dispatch, user?._id);
            }, 1000)
        }
    }
    return (
        <>
            <div className='relative'>
                <div>
                    {isCardProcessing && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                            <ImSpinner8 size={36} className="animate-spin text-black" />
                        </div>
                    )}
                </div>
                <div className="flex items-center mt-3 mb-4" key={item.product._id}>
                    <div className="w-2/3 flex items-center md:space-x-4">
                        <div className="rounded-full p-1 w-9 h-9 
                    transition-all ease-in-out duration-200 hover:bg-[#f1f1f1]
                    flex justify-center items-center cursor-pointer">
                            <IoMdClose size={24} onClick={removeCartItem} />
                        </div>
                        <img
                            src={Requests.GET_PRODUCT_IMAGE + item.product.productImage}
                            height='70px'
                            width='70px'
                            alt={item.product.productName}
                        />
                        <span className="whitespace-nowrap text-wrap overflow-ellipsis">
                            {item.product.productName}
                        </span>
                    </div>
                    {isMobileView ? (
                        <div className="flex justify-end items-center flex-grow">
                            <CartButton
                                value={item?.quantity}
                                handleAddQuantity={handleAddQuantity}
                                handleSubtractQuantity={handleSubtractQuantity} />
                        </div>
                    ) : (
                        <div className="w-1/3 grid grid-cols-3 gap-2">
                            <div className="flex justify-center items-center">
                                <div className="flex justify-start items-center">
                                    <LuIndianRupee className="mt-[1px]" />
                                    <span>{Object.values(item.option)}.00</span>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <CartButton
                                    value={item?.quantity}
                                    handleAddQuantity={handleAddQuantity}
                                    handleSubtractQuantity={handleSubtractQuantity} />
                            </div>
                            <div className="flex justify-end items-center">
                                <div className="flex justify-start items-center text-[#d0bdac] font-bold">
                                    <LuIndianRupee className="mt-1" />
                                    <span>{Object.values(item.option) * item.quantity}.00</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductCard;

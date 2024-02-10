import React, { useEffect, useState } from 'react'
import { LuIndianRupee } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import useUserState from '../../Hooks/useUserState';
import { ImSpinner8 } from "react-icons/im";

const ShoppingCartTotal = ({ isProcessing }) => {
    const [total, setTotal] = useState();
    const navigate = useNavigate();
    const { usercart } = useUserState();

    useEffect(() => {
        if (usercart.length > 0) {
            let sum = 0;
            usercart.forEach((item) => {
                sum += parseInt(Object.values(item?.option)) * parseInt(item?.quantity);
            })
            setTotal(sum);
        }
    }, [usercart])
    return (
        <>
            <div className='relative'>
                {isProcessing && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                        <ImSpinner8 size={36} className="animate-spin text-black" />
                    </div>
                )}
                <div style={{
                    border: '3px solid #ececec',
                    padding: '30px',
                    fontSize: '15px',
                    color: '#333',
                    lineHeight: '1'
                }}>
                    <div className='font-bold'
                        style={{
                            fontSize: '17px',
                            letterSpacing: '2px',
                            lineHeight: '1'
                        }}
                    >
                        <span>CART TOTALS</span>
                    </div>
                    <div className='flex font-bold mt-8 mb-6 justify-between'
                        style={{
                            fontSize: '1.06em',
                            lineHeight: '1.5'
                        }}>
                        <div>
                            <span>Subtotal</span>
                        </div>
                        <div className='flex'>
                            <span><LuIndianRupee className='mt-[3px]' /></span>
                            <span>{total}.00</span>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between my-6'>
                        <div className='font-semibold'>
                            <span>Shipping</span>
                        </div>
                        <div className='text-[#4d4d4d] font-semibold'>
                            <span>Free Shipping</span>
                        </div>
                    </div>
                    <hr />
                    <div className='mt-6'>
                        <div className='flex justify-between font-bold text-xl'>
                            <span
                                style={{
                                    lineHeight: '1.5',
                                }}>
                                Total
                            </span>
                            <div className='flex font-semibold text-[#d0bdac]'
                                style={{
                                    fontSize: '130%'
                                }}>
                                <span><LuIndianRupee className='mt-[1px]' /></span>
                                <span>{total}.00</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <button
                            style={{
                                letterSpacing: '2px',
                                lineHeight: '1.4',
                                height: '42px',
                                fontSize: '12px'
                            }}
                            className='w-[100%] uppercase font-bold bg-[#d0bdac] hover:bg-[#bfae9e]
                     text-white p-2 rounded-md transition-all ease-in-out duration-200'
                            onClick={() => navigate('/checkout')}>
                            Proceed to checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCartTotal;
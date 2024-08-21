import React, { useState } from 'react'
import { LuIndianRupee } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import useUserState from '../../Hooks/useUserState';
import { ImSpinner8 } from "react-icons/im";
import CalculateShipping from './CalculateShipping';

const ShoppingCartTotal = ({ isProcessing, setIsProcessing }) => {
    const navigate = useNavigate();
    const { total, discount, shipping, subTotal } = useUserState();
    const [calculateShipping, setCalculateShipping] = useState(false);

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
                    lineHeight: '1'
                }}>
                    <div className='font-bold'
                        style={{
                            fontSize: '17px',
                            letterSpacing: '2px',
                            lineHeight: '1',
                            color: '#333',
                        }}
                    >
                        <span>CART TOTALS</span>
                    </div>
                    <div className='flex font-bold mt-8 mb-6 justify-between'
                        style={{
                            fontSize: '1.06em',
                            lineHeight: '1.5',
                            color: '#333',
                        }}>
                        <div>
                            <span>Subtotal</span>
                        </div>
                        <div className='flex'>
                            <span><LuIndianRupee className='mt-[3px]' /></span>
                            <span>{subTotal}.00</span>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between my-6 text-[1em]'>
                        <div className='font-semibold'>
                            <span>Shipping</span>
                        </div>
                        <div className='font-semibold flex flex-col justify-end items-end'>
                            <div className='flex text-[#4d4d4d] '>
                                {
                                    shipping?.charges === 'free'
                                        ?
                                        <>
                                            <span>Free Shipping</span>
                                        </>
                                        :
                                        <>
                                            <span>Shipping Charges : </span>
                                            <div className='flex'>
                                                <span><LuIndianRupee className='ml-1' /></span>
                                                <span>{shipping?.charges}.00</span>
                                            </div>


                                        </>
                                }
                            </div>
                            {
                                (shipping?.state || shipping?.city)
                                &&
                                <div className='flex flex-col mt-3 justify-end items-end'>
                                    <p>Shipping to <span className='font-extrabold'>{shipping?.city} {shipping?.postcode}</span></p>
                                    <span className='mt-2'><b>{shipping?.state}</b></span>
                                </div>
                            }
                            <div className='mt-6'>
                                <span className='text-[#4d4d4d] font-semibold 
                            hover:text-[#d0bdac] cursor-pointer transition-all ease-in-out duration-200'
                                    onClick={() => setCalculateShipping(!calculateShipping)}>
                                    {shipping?.state ? 'Change Address' : 'Calculate Shipping'}
                                </span>
                            </div>
                            {
                                calculateShipping
                                &&
                                <CalculateShipping setIsProcessing={setIsProcessing} setCalculateShipping={setCalculateShipping} />
                            }
                        </div>
                    </div>
                    {
                        discount > 0
                        &&
                        <div className='flex font-bold mt-8 mb-6 justify-between'
                            style={{
                                fontSize: '1.06em',
                                lineHeight: '1.5'
                            }}>
                            <div>
                                <span>Discounted Amount</span>
                            </div>
                            <div className='flex'>
                                <span><LuIndianRupee className='mt-[3px]' /></span>
                                <span>{discount}.00</span>
                            </div>
                        </div>
                    }
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
                            className='w-[100%] uppercase font-bold bg-[#256E1D] hover:bg-[#084701]
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
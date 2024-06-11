import React, { useState } from 'react';
import useUserState from '../../Hooks/useUserState';
import { ImSpinner8 } from "react-icons/im";
import { AiOutlineTag } from "react-icons/ai";
import Input from '../../Fields/Input';
import { toast } from 'react-toastify';
import { applyCouponHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { CouponAction } from '../../Redux/Actions/UserActions/UsersAction';
import { LuIndianRupee } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import UserCartCard from './UserCartCard';

const OrderDetail = () => {
    const { usercart, total, discount, shipping,
        subTotal, couponDisable, codCharges, handlingCharges } = useUserState();
    const [showApplyCoupon, setShowApplyCoupon] = useState(false);
    const [couponValue, setCouponValue] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();

    const handleApplyCoupon = () => {
        if (couponValue) {
            setIsProcessing(true);
            applyCouponHandler(couponValue.toUpperCase())
                .then((response) => {
                    if (response) {
                        if (response?.message === 'Invalid Coupon!') {
                            setTimeout(() => {
                                setIsProcessing(false);
                                toast.error('Invalid coupon!');
                            }, 1000)
                        } else {
                            setTimeout(() => {
                                setIsProcessing(false);
                                setShowApplyCoupon(false);
                                dispatch(CouponAction(response));
                            }, 1000)
                        }
                    }
                })
                .catch((error) => {
                    console.log('error in apply coupon handler : ', error);
                })
        } else {
            toast.error('Please enter coupon code!')
        }
    }

    return (
        <div className='p-4 pt-8 sm:px-[70px] sm:pt-[65px] w-full text-[15px] text-[#333]'>
            <div>
                {usercart?.map((item, index) => {
                    return <div key={index}>
                        <UserCartCard item={item} index={index} />
                    </div>
                })}
            </div>
            {
                !couponDisable
                &&
                <div className='mt-8'>
                    <hr />
                    {
                        discount
                            ?
                            <>
                                <div className='flex font-bold my-5 justify-between'
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
                            </>
                            :
                            <>
                                <div className='my-5 flex font-semibold' style={{ fontSize: '1.06em' }}>
                                    <span><AiOutlineTag size={24} /></span>
                                    <div>
                                        <span className='ml-6 hover:underline text-[#333]
                         hover:text-[#d0bdac] transition-all cursor-pointer
                         ease-in-out duration-200' onClick={() => setShowApplyCoupon(!showApplyCoupon)}>
                                            Have a coupon code?
                                        </span>
                                        <span className='ml-3 hover:underline text-[#333]
                         hover:text-[#d0bdac] transition-all cursor-pointer
                         ease-in-out duration-200' onClick={() => setShowApplyCoupon(!showApplyCoupon)}>
                                            {showApplyCoupon ? 'Close' : 'Add'}
                                        </span>
                                    </div>
                                </div>
                            </>
                    }
                    {showApplyCoupon && (
                        <div className="transition-all ease-in-out duration-500 my-5">
                            {isProcessing && (
                                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                                    <ImSpinner8 size={36} className="animate-spin text-black" />
                                </div>
                            )}
                            <div className='flex'>
                                <div className='w-full'>
                                    <Input
                                        type="text"
                                        className="uppercase p-2 rounded-lg w-full outline-none"
                                        onChange={(e) => setCouponValue(e.target.value)} />
                                </div>
                                <div className='md:ml-2'>
                                    <button
                                        style={{
                                            height: '40px',
                                            lineHeight: '40px',
                                            padding: '0 10px',
                                            fontSize: '12px',
                                            borderRadius: '5px',
                                            fontWeight: '600',
                                            letterSpacing: '2px',
                                        }} className='md:min-w-[95px] transition-all uppercase 
                                ease-in-out duration-200 text-white bg-[#d0bdac] hover:bg-[#bfae9e]'
                                        onClick={handleApplyCoupon}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
            <hr />
            <div className='my-4 relative'>
                {isProcessing && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                        <ImSpinner8 size={36} className="animate-spin text-black" />
                    </div>
                )}
                <div className='flex justify-between mb-4'
                    style={{
                        fontSize: '120%'
                    }}>
                    <span className='text-black font-extrabold'>
                        Subtotal
                    </span>
                    <div className='flex text-[#d0bdac] font-black'>
                        <span><LuIndianRupee className='mt-[4px] mr-[1px]' /></span>
                        <span>{subTotal}.00</span>
                    </div>
                </div>
                <div className='flex justify-between mb-4'
                    style={{
                        fontSize: '120%'
                    }}>
                    <span className='text-black font-extrabold'>
                        Shipping
                    </span>
                    <div className='flex text-[#333] font-black'>
                        {
                            !shipping
                                ?
                                <>
                                    <span>Free Shipping</span>
                                </>
                                :
                                <>
                                    {
                                        shipping?.charges === 'free'
                                            ?
                                            <>
                                                <div className='flex flex-col items-end'>
                                                    <span>Free Shipping</span>
                                                    <span>{shipping?.city}</span>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className='flex'>
                                                    <div>
                                                        <span>Shipping Charge : </span>
                                                    </div>
                                                    <div className='flex text-[#d0bdac]'>
                                                        <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                                        <span>{shipping?.charges}.00</span>
                                                    </div>
                                                </div>
                                            </>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
            {
                codCharges > 0 && !isProcessing
                &&
                <>
                    <div className='my-8 flex justify-between font-black'
                        style={{
                            fontSize: '130%'
                        }}>
                        <span className='text-black'>COD Charges</span>
                        <div className='flex text-[#d0bdac]'>
                            <span><LuIndianRupee className='mt-[4px] mr-[1px]' /></span>
                            <span>{codCharges}.00</span>
                        </div>
                    </div>
                </>
            }
            {
                handlingCharges > 0 && !isProcessing
                &&
                <>
                    <div className='my-8 flex justify-between font-black'
                        style={{
                            fontSize: '130%'
                        }}>
                        <span className='text-black'>Handling Charges</span>
                        <div className='flex text-[#d0bdac]'>
                            <span><LuIndianRupee className='mt-[4px] mr-[1px]' /></span>
                            <span>{handlingCharges}.00</span>
                        </div>
                    </div>
                </>
            }
            <div className='my-8 flex justify-between font-black'
                style={{
                    fontSize: '130%'
                }}>
                <span className='text-black'>TOTAL</span>
                <div className='flex text-[#d0bdac]'>
                    <span><LuIndianRupee className='mt-[4px] mr-[1px]' /></span>
                    {
                        handlingCharges > 0
                            ?
                            <>
                                <span>{total + handlingCharges}.00</span>
                            </>
                            :
                            <>
                                <span>{total}.00</span>
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default OrderDetail;

import React, { useEffect, useState } from 'react';
import useUserState from '../../Hooks/useUserState';
import { LuIndianRupee } from 'react-icons/lu';
import { AiOutlineTag } from "react-icons/ai";
import Requests from '../../RequestHandlers/Requests/Requests';
import Input from '../../Fields/Input';

const OrderDetail = () => {
    const { usercart } = useUserState();
    const [showApplyCoupon, setShowApplyCoupon] = useState(false);
    const [total, setTotal] = useState();

    useEffect(() => {
        if (usercart?.length > 0) {
            let total = 0;
            usercart.forEach((item) => {
                total += parseInt(item?.quantity) * parseInt(Object.values(item?.option));
            })
            setTotal(total);
        }
    }, [usercart])
    return (
        <div style={{
            paddingLeft: '70px',
            paddingRight: '70px',
            paddingTop: '65px',
            width: '100%',
            fontSize: '15px',
            color: '#333',
        }}>
            <div>
                {usercart?.map((item, index) => (
                    <div key={index} className='flex mb-12 items-center'>
                        <div className='flex justify-center items-center' style={{
                            border: '1px solid rgba(0,0,0,.1)',
                            borderRadius: '5px',
                            height: '70px',
                            width: '80px',
                        }}>
                            <div className='relative'>
                                <img
                                    className='object-cover'
                                    src={Requests.GET_PRODUCT_IMAGE + item?.product?.productImage}
                                    alt={item?.product?.productName} />
                                <div className='absolute top-1 right-2 transform translate-x-full -translate-y-full bg-[#555] rounded-full h-[17px] w-[17px] flex items-center justify-center'
                                    style={{
                                        fontSize: '12px',
                                        color: '#fff',
                                        textAlign: 'center',
                                        boxShadow: '1px 1px 3px 0 rgba(0,0,0,.3)',
                                        lineHeight: '20px',
                                        fontWeight: '700',
                                    }}>
                                    {item?.quantity}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mx-3' style={{
                            lineHeight: '1.24em',
                            fontSize: '1.06em',
                            fontWeight: '700',
                            wordBreak: 'break-word',
                        }}>
                            <div>{item?.product?.productName}</div>
                            <div className='mt-3' style={{
                                fontSize: '100%',
                                lineHeight: '1.6',
                                textRendering: 'optimizeLegibility',
                                color: '#888888',
                            }}>
                                {Object.keys(item?.option)}
                            </div>
                        </div>
                        <div className='flex font-black'>
                            <span><LuIndianRupee className='mt-[3px]' /></span>
                            <span>{parseInt(Object.values(item?.option)) * parseInt(item?.quantity)}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-8'>
                <hr />
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
                {showApplyCoupon && (
                    <div className="transition-all ease-in-out duration-500 my-5">
                        <div className='flex'>
                            <div className='w-full'>
                                <Input />
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
                                ease-in-out duration-200 text-white bg-[#d0bdac] hover:bg-[#bfae9e]'>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <hr />
            <div className='my-4'>
                <div className='flex justify-between mb-4'
                    style={{
                        fontSize: '120%'
                    }}>
                    <span className='text-black font-extrabold'>
                        Subtotal
                    </span>
                    <div className='flex text-[#d0bdac] font-black'>
                        <span><LuIndianRupee className='mt-[4px] mr-[1px]' /></span>
                        <span>{total}.00</span>
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
                        Free shipping
                    </div>
                </div>
            </div>
            <div className='my-8 flex justify-between font-black'
                style={{
                    fontSize: '130%'
                }}>
                <span className='text-black'>TOTAL</span>
                <div className='flex text-[#d0bdac]'>
                    <span><LuIndianRupee className='mt-[4px] mr-[1px]' /></span>
                    <span>{total}.00</span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;

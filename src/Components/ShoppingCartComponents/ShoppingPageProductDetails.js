import React, { useState } from 'react';
import useUserState from '../../Hooks/useUserState';
import ProductCard from './ProductCard';
import { applyCouponHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { LuIndianRupee } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { CouponAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useDispatch } from 'react-redux';
import useComponentState from '../../Hooks/useComponentState';

const ShoppingPageProductDetails = ({ isProcessing, setIsProcessing, setCoupon }) => {
    const { usercart, discount, couponDisable } = useUserState();
    const { mobile } = useComponentState();
    const [couponValue, setCouponValue] = useState();
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
                            dispatch(CouponAction(response));
                            setTimeout(() => {
                                setIsProcessing(false);
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
        <div>
            <div className='flex text-[#222] font-semibold' style={{ lineHeight: '1.24em', fontSize: '1.06em' }}>
                <div className='w-2/3'>
                    <span>PRODUCT</span>
                </div>
                {
                    mobile
                        ?
                        <>
                            <div className='w-1/3 flex space-x-4 justify-end items-end'>
                                <span>QUANTITY</span>
                            </div>
                        </>
                        :
                        <div className='w-1/3 flex space-x-4 justify-end items-end'>
                            <span>PRICE</span>
                            <span>QUANTITY</span>
                            <span>SUBTOTAL</span>
                        </div>
                }
            </div>
            <div className='border-b-2 border-[#ECECEC] my-2'></div>
            <div className='my-3'>
                {
                    usercart &&
                    usercart.map((item, index) => {
                        return <div key={index}>
                            <ProductCard item={item}
                                setIsProcessing={setIsProcessing} />
                        </div>
                    })
                }
            </div>
            {
                !couponDisable
                &&
                <div className='mt-8'>
                    <div className="flex items-center flex-wrap">
                        {
                            discount && !isProcessing
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
                                            <span className='ml-2'><LuIndianRupee className='mt-[3px]' /></span>
                                            <span>{discount}.00</span>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-l px-1 md:px-4 py-1 h-[42px] outline-none w-full md:w-1/2 uppercase"
                                        placeholder='Coupon code'
                                        onChange={(e) => setCouponValue(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        style={{
                                            letterSpacing: '2px',
                                            lineHeight: '1.4',
                                            fontSize: '12px'
                                        }}
                                        className="bg-[#d0bdac] font-bold text-white rounded-r hover:bg-[#bfae9e]
                                    px-4 w-full md:w-1/2 md:px-8 py-2 uppercase h-[42px] mt-2 md:mt-0 transition-all ease-in-out duration-200"
                                        onClick={handleApplyCoupon}
                                    >
                                        Apply Coupon
                                    </button>
                                </>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default ShoppingPageProductDetails;

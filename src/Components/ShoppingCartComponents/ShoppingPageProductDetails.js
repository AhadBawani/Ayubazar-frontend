import React, { useEffect, useState } from 'react';
import useUserState from '../../Hooks/useUserState';
import ProductCard from './ProductCard';

const ShoppingPageProductDetails = ({ isProcessing, setIsProcessing }) => {
    const { usercart } = useUserState();
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768;
            setIsMobileView(isMobile);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className='flex text-[#222] font-semibold' style={{ lineHeight: '1.24em', fontSize: '1.06em' }}>
                <div className='w-2/3'>
                    <span>PRODUCT</span>
                </div>
                {
                    isMobileView
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
                {usercart &&
                    usercart.map((item) => (
                        <>
                            <ProductCard item={item} isMobileView={isMobileView} 
                            isProcessing={isProcessing} setIsProcessing={setIsProcessing}/>
                        </>
                    ))}
            </div>
            <div className='mt-8'>
                <div className="flex items-center flex-wrap">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-l px-1 md:px-4 py-1 h-[42px] outline-none w-full md:w-1/2"
                        placeholder='Coupon code'
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
                    >
                        Apply Coupon
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingPageProductDetails;

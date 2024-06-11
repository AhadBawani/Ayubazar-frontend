import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ImSpinner8 } from "react-icons/im";
import ProductsCard from '../ProductsCard';

const FilterProduct = ({ filterProduct }) => {
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShow(true);
        }, 1500)
    }, [filterProduct])
    return (
        <div className='relative'>
            {isProcessing && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                    <ImSpinner8 size={36} className="animate-spin text-black" />
                </div>
            )}
            {
                show
                &&
                <div className='p-2 m-2 sm:m-4 sm:p-4 transition-all ease-in-out duration-200'>
                    <div className='flex flex-col justify-center items-center'>
                        <span className='text-[rgb(51,51,51)] text-2xl' style={{ fontWeight: 'bolder' }}>{filterProduct?.title}</span>
                        <img src='https://www.neelayurvedics.com/wp-content/themes/elessi-theme/assets/images/hr-type-baby.png'
                            alt='Ayubazar' className='my-4' />
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6'>
                        {
                            show && filterProduct?.products?.map((item, index) => {
                                return <div key={index}>
                                    <ProductsCard product={item} dispatch={dispatch} />
                                </div>
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default FilterProduct;
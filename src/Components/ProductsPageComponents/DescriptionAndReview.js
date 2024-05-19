import React, { useState } from 'react'
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import useProductsState from '../../Hooks/useProductsState';

const DescriptionAndReview = ({ product }) => {
    const [state, setState] = useState('Description');
    const { productReviews } = useProductsState();
    return (
        <div>
            <div className='block sm:hidden m-4 p-4'>                
                <span className='text-[130%] font-bold text-[#333]'>Safety Information</span>
                <div className=' text-[#999] mt-4'>
                    <p>- Read the label carefully before use</p>
                    <p>- Do not exceed the recommended dose</p>
                    <p>- Keep out of the reach and sight of children</p>
                    <p>- Use under medical supervision</p>
                </div>
            </div>
            <div className='m-4 flex justify-center items-center space-x-4'>
                <div
                    className='text-2xl w-[200px] rounded-3xl font-semibold
                    text-center p-1 cursor-pointer'
                    style={
                        state === 'Description' ?
                            {
                                backgroundColor: '#d0bdac',
                                color: '#fff'
                            }
                            :
                            { color: '#d0bdac' }}
                    onClick={() => setState('Description')}
                >
                    <span
                        className='transition-all duration-300 ease-in-out'>
                        Description
                    </span>
                </div>
                <div
                    className='text-2xl w-[200px] rounded-3xl p-1 font-semibold
                    text-center cursor-pointer hover:bg-transparent'
                    style={
                        state === 'Reviews' ?
                            {
                                backgroundColor: '#d0bdac',
                                color: '#fff'
                            }
                            :
                            { color: '#d0bdac' }}
                    onClick={() => setState('Reviews')}
                >
                    <span>Reviews ({productReviews?.length})</span>
                </div>
                <div
                    className='text-[22px] w-[200px] rounded-3xl p-1 font-semibold
                    text-center cursor-pointer hover:bg-transparent hidden sm:block'
                    style={
                        state === 'safetyInformation' ?
                            {
                                backgroundColor: '#d0bdac',
                                color: '#fff'
                            }
                            :
                            { color: '#d0bdac' }}
                    onClick={() => setState('safetyInformation')}
                >
                    <span>Safety Information</span>
                </div>
            </div>

            <div className='m-4 mt-4 transition-all duration-1000 ease-in-out'>
                {
                    state === 'Description'
                        ?
                        <div className='text-center'>
                            <ProductDescription description={product?.description} />
                        </div>
                        :
                        <>
                            {
                                state === 'safetyInformation'
                                    ?
                                    <>
                                        <div className='m-4 p-4 text-[#999]'>
                                            <p>- Read the label carefully before use</p>
                                            <p>- Do not exceed the recommended dose</p>
                                            <p>- Keep out of the reach and sight of children</p>
                                            <p>- Use under medical supervision</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <ProductReview reviews={productReviews} product={product} />
                                    </>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default DescriptionAndReview;
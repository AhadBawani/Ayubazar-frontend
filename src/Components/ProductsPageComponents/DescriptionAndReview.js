import React, { useState } from 'react'
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import SingleProductFooter from './SingleProductFooter';

const DescriptionAndReview = ({ product }) => {
    const [state, setState] = useState('Description');
    return (
        <div>
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
                    <span>Reviews (0)</span>
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
                        <ProductReview review={[]} productName={product?.productName} />
                }
            </div>
            <hr />
            <div className='m-4'>
                <SingleProductFooter />
            </div>
        </div>
    )
}

export default DescriptionAndReview;
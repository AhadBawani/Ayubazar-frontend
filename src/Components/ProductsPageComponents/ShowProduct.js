import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import ProductDetail from './ProductDetail';
import ProductImage from './ProductImage';
import DescriptionAndReview from './DescriptionAndReview';
import Footer from '../GeneralComponents/Footer';
import { getProductReviewByIdHandler } from '../../RequestHandlers/RequestHandler/ProductRequestHandler';
import useComponentState from '../../Hooks/useComponentState';


const ShowProduct = ({ product }) => {
    const dispatch = useDispatch();
    const { mobile } = useComponentState();

    useEffect(() => {
        if (product) {
            getProductReviewByIdHandler(dispatch, product?._id);
        }
    }, [dispatch, product])

    return (
        <>
            {
                mobile
                    ?
                    <>
                        <div className='flex flex-col w-full max-w-sm'>
                            <div>
                                <ProductImage product={product} />
                            </div>
                            <div className='mt-4 p-2'>
                                <ProductDetail product={product} dispatch={dispatch} />
                            </div>
                            <div className='mt-8'>
                                <DescriptionAndReview product={product} />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='bg-[#F8F8F8]'>
                            <div className='flex m-4 p-4 ml-24 mt-32 '>
                                <ProductImage product={product} />
                                <div className='ml-4'>
                                    <ProductDetail product={product} dispatch={dispatch} />
                                </div>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <DescriptionAndReview product={product} />
                        </div>
                        <div>
                            <Footer />
                        </div>
                    </>
            }
        </>
    )
}

export default ShowProduct;
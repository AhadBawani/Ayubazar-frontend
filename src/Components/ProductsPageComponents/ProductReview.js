import React from 'react'
import StarRating from './StarRating';
import ProductReviewForm from './ProductReviewForm';
import ReviewCard from './ReviewCard';

const ProductReview = ({ review, product }) => {
    const star = [5, 4, 3, 2, 1];

    return (
        <>
            <div className='flex flex-col sm:flex-row'>
                <div className='flex flex-col w-full sm:w-1/2'>
                    <div>
                        <span>Based On {review.length} Reviews</span>
                    </div>
                    <div className='mt-3 sm:mt-8'>
                        <p>
                            <span className='text-[#690]' style={{ fontSize: '180%', fontWeight: '600' }}>
                                0.00
                            </span>
                            <span className='ml-2'>Overall</span>
                        </p>
                        <div className='mt-2'>
                            {
                                star.map((item, index) => {
                                    return <StarRating starValue={item}
                                        key={index} showProgressBar={true} clickable={false} />
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='mt-6 sm:ml-8 flex flex-col space-y-2'>
                    <div>
                        <span
                            style={{
                                color: '#2d2a2a',
                                fontWeight: 'bold'
                            }}>
                            Be the first one to Review " {product?.productName}"
                        </span>
                    </div>
                    <div>
                        <ProductReviewForm product={product} />
                    </div>
                </div>
            </div >
            <div className='mt-12 flex flex-col'>

                <div className='mt-4'>
                    {
                        review?.length > 0
                            ?
                            <>
                                <p
                                    style={{
                                        fontSize: '110%',
                                        lineHeight: '1.4',
                                        textTransform: 'capitalize',
                                        fontWeight: '600',
                                        textRendering: 'optimizeLegibility',
                                        color: '#333',
                                        display: 'block',
                                        marginBottom: '15px'
                                    }}
                                >
                                    {review?.length} Review For {product?.productName}
                                </p>
                                <div>
                                    {
                                        review?.map((item, index) => {
                                            const isLast = index === review.length - 1;
                                            return (
                                                <React.Fragment key={item._id}>
                                                    <ReviewCard review={item} isLast={isLast} />
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </div>
                            </>
                            :
                            <>
                                <span className='font-semibold'>Reviews</span>
                                <span className='text-[#333]'>There are no reviews yet.</span>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductReview;
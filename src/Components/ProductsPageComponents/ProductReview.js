import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';
import ProductReviewForm from './ProductReviewForm';
import ReviewCard from './ReviewCard';

const ProductReview = ({ reviews, product }) => {
    const [starPercentage, setStarPercentage] = useState();

    const calculateReviewsAverage = () => {
        let average = reviews.reduce((acc, review) => {
            return acc + review.rating;
        }, 0) / reviews.length;

        return average > 0 ? average.toFixed(1) : 0;
    };

    useEffect(() => {
        const calculatePercentages = () => {
            const totalReviews = reviews.length;
            const star = [5, 4, 3, 2, 1];
            const percentages = star.map(rating => {
                const reviewsWithRating = reviews.filter(review => review.rating === rating);
                const percentage = totalReviews > 0 ? Math.round((reviewsWithRating.length / totalReviews) * 100) : 0;
                return { rating, percentage };
            });

            setStarPercentage(percentages);
        };
        calculatePercentages();
    }, [reviews])
    return (
        <>
            <div className='flex flex-col sm:flex-row'>
                <div className='flex flex-col w-full sm:w-1/2'>
                    <div>
                        <span>Based On {reviews.length} Reviews</span>
                    </div>
                    <div className='mt-3 sm:mt-8'>
                        <p>
                            <span className='text-[#690]' style={{ fontSize: '180%', fontWeight: '600' }}>
                                {reviews?.length > 0
                                    ?
                                    <>
                                        {calculateReviewsAverage()}
                                    </>
                                    :
                                    <>
                                        0.00
                                    </>
                                }
                            </span>
                            <span className='ml-2'>Overall</span>
                        </p>
                        <div className='mt-2'>
                            {
                                starPercentage?.map((item, index) => {
                                    return <StarRating starValue={item?.rating} percentage={item?.percentage}
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
                        reviews?.length > 0
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
                                    {reviews?.length} Review For {product?.productName}
                                </p>
                                <div>
                                    {
                                        reviews?.map((item, index) => {
                                            const isLast = index === reviews.length - 1;                                            
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
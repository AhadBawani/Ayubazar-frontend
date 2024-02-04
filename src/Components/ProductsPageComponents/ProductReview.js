import React, { useState } from 'react'
import StarRating from './StarRating';
import useUserState from '../../Hooks/useUserState';
import { useDispatch } from 'react-redux';
import { AuthenticateDialogAction } from '../../Redux/Actions/ComponentActions/ComponentActions';

const ProductReview = ({ review, productName }) => {
    const { user } = useUserState();
    const [starValue, setStarValue] = useState();
    const [reviewText, setReviewText] = useState();
    const star = [5, 4, 3, 2, 1];
    const dispatch = useDispatch();
    const handleReviewSubmit = () => {
        console.log('star : ', starValue, " Text : ", reviewText);
    }
    return (
        <>
            <div className='flex'>
                <div className='flex flex-col w-1/2'>
                    <div>
                        <span>Based On {review.length} Reviews</span>
                    </div>
                    <div className='mt-8'>
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
                <div className='ml-8 flex flex-col space-y-2'>
                    <div>
                        <span
                            style={{
                                color: '#2d2a2a',
                                fontWeight: 'bold'
                            }}>
                            Be the first one to Review " {productName}"
                        </span>
                    </div>
                    {
                        user
                            ?
                            <>
                                <div className='flex'>
                                    <span>Your Rating : </span>
                                    <div className='ml-2'>
                                        <StarRating starValue={starValue} setStarValue={setStarValue} showProgressBar={false} />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <span className='review-text'>Your Review *</span>
                                    <textarea
                                        className="resize-none border rounded-md p-2 w-full h-32 outline-none"
                                        placeholder="Your review"
                                        onChange={(e) => setReviewText(e.target.value)}
                                    />
                                    <button
                                        className='bg-[#d0bdac] text-white font-semibold
                                            p-2 rounded-md border-none outline-none w-[120px]'
                                        onClick={handleReviewSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </>
                            :
                            <>
                                <p style={{
                                    fontSize: '100%',
                                    lineHeight: '1.6',
                                    textRendering: "optimizeLegibility",
                                    color: '#333'
                                }}>
                                    You must be
                                    <span
                                        className='underline mx-1 
                                        cursor-pointer hover:text-[#d0bdac] 
                                        transition-all duration-200 ease-in-out' 
                                        onClick={() => dispatch(AuthenticateDialogAction(true))}>
                                        logged in
                                    </span>
                                    to post a review.
                                </p>
                            </>
                    }
                </div>
            </div >
            <div className='mt-12 flex flex-col'>
                <span className='font-semibold'>Reviews</span>
                <div className='mt-4'>
                    {
                        review?.length > 0
                            ?
                            <>
                            </>
                            :
                            <>
                                <span className='text-[#333]'>There are no reviews yet.</span>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductReview;
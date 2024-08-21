import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ImSpinner8 } from "react-icons/im";
import StarRating from './StarRating';
import { AuthenticateDialogAction } from '../../Redux/Actions/ComponentActions/ComponentActions';
import { addProductReviewHandler, getProductReviewByIdHandler } from '../../RequestHandlers/RequestHandler/ProductRequestHandler';
import useUserState from '../../Hooks/useUserState';

const ProductReviewForm = ({ product }) => {
    const { user } = useUserState();
    const [starValue, setStarValue] = useState();
    const [reviewText, setReviewText] = useState();
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();
    const handleReviewSubmit = () => {
        setIsProcessing(true);
        const obj = {
            userId: user?._id,
            productId: product?._id,
            rating: starValue,
            review: reviewText
        }
        addProductReviewHandler(obj)
            .then((reviewResponse) => {
                if (reviewResponse) {
                    setTimeout(() => {
                        getProductReviewByIdHandler(dispatch, product?._id);
                        setIsProcessing(false);
                    }, 2000)
                }
            })
    }
    return (
        <>
            {
                user
                    ?
                    <>
                        <div className='relative'>
                            {isProcessing && (
                                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                                    <ImSpinner8 size={36} className="animate-spin text-black" />
                                </div>
                            )}
                            <div className='flex'>
                                <span>Your Rating : </span>
                                <div className='ml-2 mt-[5px]'>
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
        </>
    )
}

export default ProductReviewForm
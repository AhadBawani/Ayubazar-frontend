import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import ImageZoom from './ImageZoom';
import useUserState from '../../Hooks/useUserState';
import { useDispatch } from 'react-redux';
import { UserLocalWishlistAction } from '../../Redux/Actions/UserActions/UsersAction';
import { toast } from 'react-toastify';
import Requests from '../../RequestHandlers/Requests/Requests';
import useComponentState from '../../Hooks/useComponentState';

const ProductImage = ({ product }) => {
    const { wishlist, localWishlist } = useUserState();
    const { mobile } = useComponentState();
    const [selectedImage, setSelectedImage] = useState(product?.productImages[0]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (product) {
            setSelectedImage(product?.productImages[0]);
        }
    }, [product])
    const removeFromWishList = (e, id) => {
        e.stopPropagation();
        let arr = localWishlist;
        const filteredArr = arr.filter((item) => item !== id);
        dispatch(UserLocalWishlistAction(filteredArr));
        localStorage.setItem('wishlist', JSON.stringify(filteredArr));
    }

    const addToWishList = async (e, id) => {
        e.stopPropagation();
        dispatch(UserLocalWishlistAction([...localWishlist, id]));
        if (!localWishlist) {
            const arr = [];
            arr.push(id);
            localStorage.setItem('wishlist', JSON.stringify(arr));
        }
        else {
            let ar = localWishlist;
            ar.push(id);
            localStorage.setItem('wishlist', JSON.stringify(ar));
        }
        toast.success('Added to wish list');
    }
    return (
        <div className='relative min-w-sm max-w-sm sm:min-w-[600px] sm:max-w-[600px]'>
            {
                !mobile
                &&
                <div className='text-[#666] p-4 h-[32px] w-[32px] text-center bg-transparent'>
                    {
                        wishlist?.findIndex((item) => item?._id === product?._id) >= 0
                            ?
                            <>
                                <FaHeart
                                    size={24}
                                    color='red'
                                    className='cursor-pointer'
                                    onClick={(e) => removeFromWishList(e, product?._id)}
                                />
                            </>
                            :
                            <>
                                <CiHeart className=' text-[#333] cursor-pointer'
                                    size={24}
                                    onClick={(e) => addToWishList(e, product?._id)}
                                />
                            </>
                    }
                </div>
            }
            <div className='flex justify-center items-center flex-col'>
                <div className='h-[400px] w-[400px]'>
                    <ImageZoom imageUrl={selectedImage} />
                </div>
                <div className='flex gap-x-6 mt-4'>
                    {
                        product?.productImages?.length > 1
                        &&
                        <>
                            {
                                product?.productImages?.map((productImage, index) => {
                                    return <div
                                        key={index}
                                        onClick={() => setSelectedImage(productImage)}
                                        className={`rounded-xl cursor-pointer`}
                                        style={selectedImage === productImage ? { border: '1px solid #ececec' } : {}}>
                                        <img
                                            src={Requests.GET_PRODUCT_IMAGE + productImage}
                                            alt="Product"
                                            height="80px"
                                            width="80px"
                                            className={`transition-transform duration-300 transform origin-top-left`}
                                        />
                                    </div>
                                })
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductImage;
import React from 'react'
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import ImageZoom from './ImageZoom';
import useUserState from '../../Hooks/useUserState';
import { useDispatch } from 'react-redux';
import { UserLocalWishlistAction } from '../../Redux/Actions/UserActions/UsersAction';
import { toast } from 'react-toastify';

const ProductImage = ({ product }) => {
    const { wishlist, localWishlist } = useUserState();    
    const dispatch = useDispatch();
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
        <div className='min-w-sm max-w-sm sm:min-w-[600px] sm:max-w-[600px]'>
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
            <div className='flex justify-center items-center'>
                <ImageZoom imageUrl={product?.productImage} />
            </div>
        </div>
    )
}

export default ProductImage
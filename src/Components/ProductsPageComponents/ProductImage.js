import React from 'react'
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import ImageZoom from './ImageZoom';
import useUserState from '../../Hooks/useUserState';

const ProductImage = ({ product }) => {
    const { wishlist } = useUserState();
    return (
        <div className='min-w-[600px] max-w-[600px]'>
            <div className='text-[#666] p-4 h-[32px] w-[32px] text-center bg-transparent'>
                {
                    wishlist?.findIndex((item) => item?._id === product?._id) >= 0
                        ?
                        <>
                            <FaHeart
                                size={24}
                                color='red'
                                className='cursor-pointer'
                            />
                        </>
                        :
                        <>
                            <CiHeart className=' text-[#333] cursor-pointer'
                                size={24}
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
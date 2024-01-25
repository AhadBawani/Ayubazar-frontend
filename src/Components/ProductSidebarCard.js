import React, { useEffect, useState } from 'react'
import Requests from '../RequestHandlers/Requests/Requests';
import { LuIndianRupee } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import useUserState from '../Hooks/useUserState';
import { UserLocalWishlistAction } from '../Redux/Actions/UserActions/UsersAction';

const ProductSidebarCard = ({ product }) => {
    const [firstPrice, setFirstPrice] = useState();
    const [lastPrice, setLastPrice] = useState();
    const { localWishlist } = useUserState();
    const dispatch = useDispatch();

    useEffect(() => {
        let productOptions = JSON.parse(product.options);

        const optionKeys = Object.keys(productOptions);

        if (optionKeys.length > 0) {
            setFirstPrice(productOptions[optionKeys[0]]);
            setLastPrice(productOptions[optionKeys[optionKeys.length - 1]]);
        }
    }, [product])
    const handleRemoveFromList = (id) => {
        const filterArr = localWishlist.filter((item) => item !== id);        
        dispatch(UserLocalWishlistAction(filterArr));
        localStorage.setItem('wishlist', JSON.stringify(filterArr));        
    }
    return (
        <div className='flex'>
            <div className='h-[100px] w-[140px]' style={{ border: '1px solid #ececec' }}>
                <img
                    className='mt-2'
                    src={Requests.GET_PRODUCT_IMAGE + product?.productImage}
                    alt='Ayubazar' />
            </div>
            <div className='ml-4'
                style={{ fontSize: '16px' }}>
                <span className='hover:text-[#d0bdac] hover:font-bold cursor-pointer'>{product?.productName}</span>
                <div className='text-[#333] mt-1'>
                    <span className='flex' style={{ fontWeight: 500 }}>
                        <LuIndianRupee className='mt-1' /> {firstPrice}.00 -
                        <LuIndianRupee className='mt-1' />{lastPrice}.00
                    </span>
                </div>
                <div className='uppercase text-[75%] mt-2
                    cursor-pointer font-semibold text-[#333] hover:text-[#d0bdac]'>
                    Select options
                </div>
            </div>
            <div>
                <IoMdClose
                    size={20}
                    className='cursor-pointer'
                    onClick={() => handleRemoveFromList(product._id)} />
            </div>
        </div>
    )
}

export default ProductSidebarCard;
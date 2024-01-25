import React, { useEffect, useState } from 'react';
import Requests from '../RequestHandlers/Requests/Requests';
import { LuIndianRupee } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { toast } from 'react-toastify';
// import useUserState from '../Hooks/useUserState';
import { FaHeart } from "react-icons/fa";
import { getAllProductsHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import useUserState from '../Hooks/useUserState';
import { UserLocalWishlistAction } from '../Redux/Actions/UserActions/UsersAction';


const ProductsCard = ({ product, dispatch }) => {
    // const { user } = useUserState();    
    // const { wishlist } = useUserState();
    const { localWishlist } = useUserState();
    const [firstPrice, setFirstPrice] = useState();
    const [lastPrice, setLastPrice] = useState();
    const { wishlist } = useUserState();
    useEffect(() => {
        let productOptions = JSON.parse(product.options);

        const optionKeys = Object.keys(productOptions);

        if (optionKeys.length > 0) {
            setFirstPrice(productOptions[optionKeys[0]]);
            setLastPrice(productOptions[optionKeys[optionKeys.length - 1]]);
        }
    }, [product, dispatch])

    useEffect(() => {
        getAllProductsHandler(dispatch);
    }, [localWishlist, dispatch])

    const addToWishList = async (id) => {
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
    const removeFromWishList = (id) => {
        let arr = localWishlist;
        const filteredArr = arr.filter((item) => item !== id);
        dispatch(UserLocalWishlistAction(filteredArr));
        localStorage.setItem('wishlist', JSON.stringify(filteredArr));
    }
    return (
        <>
            <div key={product._id} className='h-[200px] w-[210px] bg-white shadow-xl rounded-md'>
                <div className='p-2 flex justify-between'>
                    <div>
                        <img src={Requests.GET_PRODUCT_IMAGE + product?.productImage}
                            className='h-[180px] w-[190px] ' alt={product?.productName} />
                    </div>
                    <div className='p-1'>
                        {
                            wishlist.findIndex((item) => item?._id === product?._id) >= 0
                                ?
                                <>
                                    <FaHeart
                                        size={24}
                                        color='red'
                                        className='cursor-pointer'
                                        onClick={() => removeFromWishList(product?._id)} />
                                </>
                                :
                                <>
                                    <CiHeart className=' text-[#333] cursor-pointer'
                                        size={24}
                                        onClick={() => addToWishList(product?._id)} />
                                </>
                        }

                    </div>
                </div>
            </div>
            <div className='w-[190px] mt-2'>
                <span
                    style={{
                        lineHeight: '20px',
                        paddingBottom: '3px',
                        paddingTop: '5px',
                        color: '#333',
                        overflow: 'hidden',
                        fontSize: '14px',
                        fontWeight: 600
                    }}>
                    {product?.productName}
                </span>
                <div className='text-[#333]'>
                    <span className='flex' style={{ fontWeight: 500 }}>
                        <LuIndianRupee className='mt-1' /> {firstPrice}.00 -
                        <LuIndianRupee className='mt-1' />{lastPrice}.00
                    </span>
                </div>
            </div>
        </>
    )
}

export default ProductsCard
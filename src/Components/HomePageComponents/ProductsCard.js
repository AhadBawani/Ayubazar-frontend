import React, { useEffect, useState } from 'react';
import Requests from '../../RequestHandlers/Requests/Requests';
import { LuIndianRupee } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { getAllProductsHandler } from '../../RequestHandlers/RequestHandler/ProductRequestHandler';
import useUserState from '../../Hooks/useUserState';
import { UserLocalWishlistAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useNavigate } from 'react-router-dom';
import { showSingleProductAction } from '../../Redux/Actions/ProductsActions/ProductsActions';
import OptionSelection from './OptionSelection';
import OtherHoverOptions from './OtherHoverOptions';

const ProductsCard = ({ product, dispatch }) => {
    const { localWishlist } = useUserState();    
    const [firstPrice, setFirstPrice] = useState();
    const [lastPrice, setLastPrice] = useState();
    const [isHovered, setIsHovered] = useState(false);
    const { wishlist } = useUserState();
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
        let productOptions = JSON.parse(product.options);
        productOptions.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        let first = productOptions[0].price;
        let last = productOptions[productOptions.length - 1].price;
        setFirstPrice(first);
        setLastPrice(last);

        if (showOptions.length === 0) {
            let arr = [];
            productOptions.map((item) => {
                const { option, price } = item;
                const obj = { [option]: price };
                arr.push(obj);
                return null;
            })
            setShowOptions(arr);
        }
    }, [product, dispatch, showOptions])
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
    const handleHoverEnter = () => {
        setIsHovered(true);
    };

    const handleHoverLeave = () => {
        setTimeout(() => {
            setIsHovered(false);
        }, 400)
    };

    const handleShowProduct = (product) => {
        navigate("/product");
        dispatch(showSingleProductAction(product));
        sessionStorage.setItem('product', product?._id);
    }
    
    return (
        <div onClick={() => handleShowProduct(product)}>
            <div key={product._id}
                className={`h-[200px] w-[200px] sm:w-[220px] bg-white 
                cursor-pointer relative
                shadow-xl rounded-md ${isHovered ? 'hovered' : ''
                    }`}
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
            >
                <div className='p-2 flex justify-between'>
                    <div>
                        <img src={Requests.GET_PRODUCT_IMAGE + product?.productImage}
                            className='h-[180px] w-[190px] ' alt={product?.productName} />
                    </div>
                    <div className='absolute right-2'>
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
                        {
                            isHovered &&
                            <>
                                <OtherHoverOptions product={product} selectedOption={selectedOption}/>
                            </>
                        }
                    </div>
                    {
                        isHovered
                        &&
                        <>
                            <OptionSelection
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                                showOptions={showOptions} />
                        </>
                    }
                </div>
            </div>
            <div className='w-[190px] mt-2'>
                <span
                    className='text-[#333] hover:text-[#d0bdac]
                    cursor-pointer text-sm font-semibold overflow-hidden'>
                    {product?.productName}
                </span>
                <div className='text-[#333] mt-1'>
                    <span className='flex' style={{ fontWeight: 500 }}>
                        {
                            selectedOption
                                ?
                                <>
                                    <LuIndianRupee className='mt-1' /> {Object.values(selectedOption)}.00
                                </>
                                :
                                <>
                                    <LuIndianRupee className='mt-1' /> {firstPrice}.00 -
                                    <LuIndianRupee className='mt-1' />{lastPrice}.00
                                </>
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductsCard;
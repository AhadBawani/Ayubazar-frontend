import React, { useEffect, useState } from 'react';
import Requests from '../../RequestHandlers/Requests/Requests';
import { LuIndianRupee } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { getAllProductsHandler } from '../../RequestHandlers/RequestHandler/ProductRequestHandler';
import useUserState from '../../Hooks/useUserState';
import { HandlingChargesAction, UserLocalCartAction, UserLocalWishlistAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useNavigate } from 'react-router-dom';
import { showSingleProductAction } from '../../Redux/Actions/ProductsActions/ProductsActions';
import OptionSelection from './OptionSelection';
import OtherHoverOptions from './OtherHoverOptions';
import { addToUserCartHandler, getUserCartByIdHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import useComponentState from '../../Hooks/useComponentState';

const ProductsCard = ({ product, dispatch }) => {
    const { localWishlist, user, localUserCart, handlingCharges } = useUserState();
    const { mobile } = useComponentState();
    const [discountPrice, setDiscountPrice] = useState();
    const [isHovered, setIsHovered] = useState(false);
    const { wishlist } = useUserState();
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const productOptions = product?.options === null ? [] : JSON.parse(product.options);
    productOptions?.length > 0 && productOptions.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    const firstPrice = productOptions?.length > 0 && productOptions[0]?.price;
    const lastPrice = productOptions?.length > 0 && productOptions[productOptions.length - 1]?.price;

    useEffect(() => {
        if (showOptions.length === 0) {
            let arr = [];
            productOptions.map((item) => {
                const { option, price, quantity } = item;
                const obj = { [option]: price, "quantity": quantity };
                arr.push(obj);
                return null;
            })
            setShowOptions(arr);
        }
    }, [product])

    useEffect(() => {
        getAllProductsHandler(dispatch);
    }, [localWishlist, dispatch])

    useEffect(() => {
        if (selectedOption && product?.discount) {
            let discountAmt = (Object.values(selectedOption) * (product?.discount / 100));
            setDiscountPrice(Math.floor(discountAmt));
        }
    }, [selectedOption, product])

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
    const removeFromWishList = (e, id) => {
        e.stopPropagation();
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
        if (product?.outOfStock) {
            toast.error('Currently product is out of stock');
            return;
        }
        navigate("/product");
        dispatch(showSingleProductAction(product));
        sessionStorage.setItem('product', product?._id);
    }

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const updatedUserLocalCart = [...localUserCart];
        if (!selectedOption) {
            if (mobile) {
                setIsHovered(true);
            };
            toast.error('Please an option');
        } else {
            if (!user) {
                if (localUserCart) {
                    const index = localUserCart.findIndex((usercart) => usercart.id === product?._id &&
                        Object.keys(usercart.option)[0] === Object.keys(selectedOption)[0]);

                    if (index >= 0) {
                        updatedUserLocalCart[index].quantity++;
                    } else {
                        const obj = {
                            id: product?._id,
                            quantity: 1,
                            option: selectedOption
                        }
                        updatedUserLocalCart.push(obj);
                    }
                    localStorage.setItem('cart', JSON.stringify(updatedUserLocalCart));
                    dispatch(UserLocalCartAction(updatedUserLocalCart));
                }
                else {
                    let arr = [];
                    arr.push({
                        id: product?._id,
                        quantity: 1,
                        option: selectedOption
                    });
                    localStorage.setItem('cart', JSON.stringify(arr));
                    dispatch(UserLocalCartAction(arr));
                }
            }
            else {
                const obj = {
                    userId: user?._id,
                    productId: product?._id,
                    option: selectedOption,
                    quantity: 1
                }

                if (product?.handlingCharges && (!handlingCharges || handlingCharges === undefined)) {
                    dispatch(HandlingChargesAction(product?.handlingCharges));
                }
                addToUserCartHandler(obj)
                    .then((response) => {
                        if (response) {
                            getUserCartByIdHandler(dispatch, user?._id);
                        }
                    })
            }
            toast.success('Added to Cart');
        }
    }

    return (
        <div
            onClick={() => handleShowProduct(product)}
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave} key={product?._id}
            className='w-[120px] h-[300px] sm:w-auto sm:h-auto'>
            <div
                className={`w-[130px] h-[120px] sm:h-[200px] sm:w-[220px] bg-white 
                cursor-pointer relative
                shadow-xl rounded-md ${isHovered ? 'hovered' : ''}`}
            >
                <div className='p-2 flex justify-between'>
                    <div className="relative">
                        {product?.outOfStock && (
                            <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <div className="text-sm p-2 transition-all ease-in-out duration-200
                                    font-semibold rounded-3xl text-[#333] bg-gray-300 hover:bg-gray-400">
                                        Out of Stock
                                    </div>
                                </div>
                            </div>
                        )}
                        <img
                            src={Requests.GET_PRODUCT_IMAGE + product?.productImages[0]}
                            className='sm:h-[180px] sm:w-[190px] h-[110px] w-[180px]'
                            alt={product?.productName}
                        />
                    </div>
                    {
                        product?.discount
                        &&
                        <div className='absolute left-2'>
                            <div className='bg-[#83b738] font-semibold clear-both'
                                style={{
                                    padding: '3px 10px',
                                    zIndex: 4,
                                    display: 'block',
                                    fontSize: '80%',
                                    lineHeight: '15px',
                                    color: '#FFF',
                                    textAlign: 'center',
                                    borderRadius: '50px',
                                    textTransform: 'uppercase'
                                }}>
                                sale
                            </div>
                        </div>
                    }
                    <div className='absolute right-2'>
                        {
                            product?.outOfStock
                                ?
                                <>

                                </>
                                :
                                <>
                                    {
                                        !mobile
                                        &&
                                        <>
                                            {
                                                wishlist.findIndex((item) => item?._id === product?._id) >= 0
                                                    ?
                                                    <>
                                                        <FaHeart
                                                            size={24}
                                                            color='red'
                                                            className='cursor-pointer'
                                                            onClick={(e) => removeFromWishList(e, product?._id)} />
                                                    </>
                                                    :
                                                    <>
                                                        <CiHeart className=' text-[#333] cursor-pointer'
                                                            size={24}
                                                            onClick={(e) => addToWishList(e, product?._id)} />
                                                    </>
                                            }
                                        </>
                                    }
                                    {
                                        isHovered && !product?.outOfStock
                                        &&
                                        <>
                                            <OtherHoverOptions product={product} selectedOption={selectedOption} />
                                        </>
                                    }
                                </>
                        }
                    </div>
                    {
                        isHovered && !product?.outOfStock
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
                        cursor-pointer text-sm font-semibold overflow-hidden'
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // Limit to two lines
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {product?.productName}
                </span>
                <div className='text-[#333] mt-1'>
                    <span className='flex' style={{ fontWeight: 500 }}>
                        {
                            selectedOption
                                ?
                                <>
                                    {
                                        product?.discount
                                            ?
                                            <>
                                                <div className='flex'>
                                                    <div className='text-[#777777]'>
                                                        <del className='flex'>
                                                            <LuIndianRupee className='mt-1' /> {parseInt(Object.values(selectedOption)) + parseInt(discountPrice)}.00
                                                        </del>
                                                    </div>
                                                    <div className='flex ml-2'>
                                                        <LuIndianRupee className='mt-1' /> {Object.values(selectedOption)}.00
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <LuIndianRupee className='mt-1' /> {Object.values(selectedOption)[0]}.00
                                            </>
                                    }
                                </>
                                :
                                <>
                                    <LuIndianRupee className='mt-1' /> {firstPrice}.00 -
                                    <LuIndianRupee className='mt-1' />{lastPrice}.00
                                </>
                        }
                    </span>
                </div>
                <div className='w-[190px] mt-2'>
                    <div className='mt-2 sm:ml-4 mb-4'>
                        {(mobile || isHovered) &&
                            <>
                                {
                                    mobile
                                        ?
                                        <>
                                            <button
                                                style={{
                                                    letterSpacing: '2px',
                                                    lineHeight: '1.4',
                                                    height: '32px',
                                                    fontSize: '10px'
                                                }}
                                                className='w-[70%] uppercase font-bold
                                 bg-[#027148] hover:bg-[#013220] outline-none 
                                 text-white p-1 rounded-md transition-all 
                                 ease-in-out duration-200' onClick={handleAddToCart}>
                                                {selectedOption ? 'Add to cart' : 'Select Option'}
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button
                                                style={{
                                                    letterSpacing: '2px',
                                                    lineHeight: '1.4',
                                                    height: '42px',
                                                    fontSize: '12px'
                                                }}
                                                className='w-[100%] uppercase font-bold
                                 bg-[#027148] hover:bg-[#013220] outline-none 
                                 text-white p-2 rounded-md transition-all 
                                 ease-in-out duration-200' onClick={handleAddToCart}>
                                                {selectedOption ? 'Add to cart' : 'Select Option'}
                                            </button>
                                        </>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsCard;
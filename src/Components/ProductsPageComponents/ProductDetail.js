import React, { useEffect, useState } from 'react'
import { LuIndianRupee } from "react-icons/lu";
import { CiFaceSmile } from "react-icons/ci";
import { toast } from 'react-toastify';
import useUserState from '../../Hooks/useUserState';
import { addToUserCartHandler, getUserCartByIdHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { UserCartAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useNavigate } from 'react-router-dom';

const CartButton = ({ cart, setCart }) => {
    return (
        <div className='flex'>
            <div className='rounded-l-lg'
                style={{
                    border: '1px solid #efefef',
                    width: '45px',
                    height: '42px',
                    lineHeight: '41px',
                    display: 'inline-block',
                    textAlign: 'center',
                    color: '#666',
                    fontWeight: 400
                }}>
                {cart}
            </div>
            <div className='flex flex-col'>
                <div className='rounded-tr-lg hover:bg-[##efefef] hover:text-black'
                    style={{
                        width: '21px',
                        height: '21px',
                        textAlign: 'center',
                        border: '1px solid #efefef',
                        backgroundColor: '#fff',
                        fontWeight: 400,
                        cursor: 'pointer'
                    }}
                    onClick={() => setCart((cart) => cart + 1)}
                >
                    +
                </div>
                <div className='rounded-br-lg hover:bg-[##efefef] hover:text-black'
                    style={{
                        width: '21px',
                        height: '21px',
                        textAlign: 'center',
                        border: '1px solid #efefef',
                        backgroundColor: '#fff',
                        fontWeight: 400,
                        cursor: 'pointer'
                    }}
                    onClick={() => setCart((cart) => cart = cart > 1 ? cart - 1 : cart)}
                >
                    -
                </div>
            </div>
        </div>
    )
}

const ProductDetail = ({ product, dispatch }) => {
    const { user } = useUserState();
    const [selectedOption, setSelectedOption] = useState();
    const [currentWatch, setCurrentWatch] = useState(10);
    const [firstPrice, setFirstPrice] = useState();
    const [lastPrice, setLastPrice] = useState();
    const [showOptions, setShowOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            let productOptions = JSON.parse(product?.options);
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
        }
    }, [product, dispatch, showOptions])

    useEffect(() => {
        const generateRandomNumber = () => {
            const increment = Math.floor(Math.random() * 2) === 0 ? -1 : 1; // Randomly select increment or decrement
            const change = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 9
            const newWatch = currentWatch + increment * change;
            if (newWatch >= 80 && newWatch <= 200) {
                return newWatch;
            } else {
                // If the new value goes out of range, adjust it to stay within the range
                return Math.min(Math.max(newWatch, 80), 200);
            }
        };

        const timeout = setTimeout(() => {
            setCurrentWatch(generateRandomNumber());
        }, 15000);

        return () => clearTimeout(timeout);
    }, [currentWatch]);

    const handleAddToCart = () => {
        if (!selectedOption) {
            toast.error('Please select any options');
            return;
        }
        if (user) {
            const index = showOptions.findIndex((item) => Object.values(item)[0] === selectedOption)

            const obj = {
                userId: user?._id,
                productId: product?._id,
                quantity: quantity,
                option: showOptions[index]
            }
            addToUserCartHandler(obj)
                .then((response) => {
                    if (response) {
                        getUserCartByIdHandler(dispatch, user?._id);
                        toast.success('Product added to cart!');
                        dispatch(UserCartAction('usercart'));
                    }
                })
        }
    }

    const handleBuyNow = () => {
        if (!selectedOption) {
            toast.error('Please select any options');
        }
        const index = showOptions.findIndex((item) => Object.values(item)[0] === selectedOption)

        const obj = {
            userId: user?._id,
            productId: product?._id,
            quantity: quantity,
            option: showOptions[index]
        }
        addToUserCartHandler(obj)
            .then((response) => {
                if (response) {
                    getUserCartByIdHandler(dispatch, user?._id);
                    navigate('/checkout')
                }
            })
    }
    return (
        <>
            <p
                style={{
                    color: '#2d2a2a',
                    lineHeight: '1.1',
                    fontSize: '230%',
                    fontWeight: 900,
                    wordWrap: 'break-word'
                }}>
                {product?.productName}
            </p>
            <div className='my-6 sm:my-0'>
                <span className='flex mt-4'
                    style={{
                        fontWeight: 'bold',
                        fontFamily: 'poppins,Arial,Helvetica,sans-serif',
                        fontSize: '180%',
                        color: '#333',
                        lineHeight: '1.2'
                    }}>
                    {
                        <>
                            <LuIndianRupee className='mt-1' /> {firstPrice}.00 -
                            <LuIndianRupee className='mt-1' />{lastPrice}.00
                        </>
                    }
                </span>
            </div>
            <div className='my-4'>
                <span className='text-[#777777] text-base'
                    style={{
                        lineHeight: '1.6',
                        textRendering: 'optimizeLegibility'
                    }}>
                    <ul style={{ listStyleType: 'disc' }}>
                        {product && JSON.parse(product?.bulletDescription)?.map((desc) => {
                            return <>
                                <li>{Object.values(desc)[1]}</li>
                            </>
                        })}
                    </ul>
                </span>
            </div>
            <div>
                <div className='my-12 sm:my-0'>
                    <span className='uppercase'
                        style={{
                            letterSpacing: '.1em',
                            fontSize: '85%',
                            color: '#333'
                        }}>
                        Weight
                    </span>
                    <div className='my-3'>
                        <div className='flex justify-start space-x-2'>
                            {
                                showOptions.length > 0
                                &&
                                showOptions.map((option) => {
                                    return <>
                                        {
                                            selectedOption && Object.keys(selectedOption)[0] === Object.keys(option)[0]
                                                ?
                                                <>
                                                    <div
                                                        className='transition-all p-1 border border-[#d0bdac]
                                                    ease-in-out duration-300 text-center cursor-pointer text-[#d0bdac]'
                                                        style={{
                                                            width: '70px',
                                                            borderRadius: '3px'
                                                        }}
                                                        onClick={() => setSelectedOption(option)}>
                                                        {Object.keys(option)}
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div
                                                        className='text-[#333] transition-all p-1 border border-[#cccccc] hover:border-[#d0bdac]
                                        ease-in-out duration-300 text-center cursor-pointer hover:text-[#d0bdac]'
                                                        style={{
                                                            width: '70px',
                                                            borderRadius: '3px'
                                                        }}
                                                        onClick={() => setSelectedOption(option)}>
                                                        {Object.keys(option)}
                                                    </div>
                                                </>
                                        }
                                    </>
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    selectedOption
                    &&
                    <div>
                        <span
                            className='text-[#333333] flex'
                            style={{ fontSize: '180%', fontWeight: 600 }}>
                            <LuIndianRupee className='mt-2' />{Object.values(selectedOption)}
                        </span>
                    </div>
                }
                <div className='flex mt-2'>
                    <div>
                        <CartButton cart={quantity} setCart={setQuantity} />
                    </div>
                    <div className='w-2/4 ml-2'>
                        <button
                            className={`flex-grow mr-2 bg-[#d0bdac] text-white w-full
                            ${!selectedOption && 'cursor-not-allowed'}
                                py-2 px-4 rounded-md transition-all duration-200 ease-in-out`}
                            onClick={handleAddToCart}
                        >
                            ADD TO CART
                        </button>
                    </div>
                    <div className='w-2/4 ml-3'>
                        <button
                            className={`flex-grow bg-[#6ca300] text-white w-full 
                                    ${!selectedOption && 'cursor-not-allowed'}
                                 py-2 px-4 rounded-md transition-all duration-200 ease-in-out`}
                            onClick={handleBuyNow}
                        >
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>
            <div className='my-4 clear-both text-sm'>
                <span>Select a product variation to get estimate</span>
            </div>
            <div className='my-4 flex'>
                <CiFaceSmile size={25} /> <b className='mx-1 transition-all duration-300 ease-in-out'>{currentWatch} People</b> are viewing this right now
            </div>
        </>
    )
}

export default ProductDetail
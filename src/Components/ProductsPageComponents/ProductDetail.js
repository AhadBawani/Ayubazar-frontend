import React, { useEffect, useState } from 'react'
import { LuIndianRupee } from "react-icons/lu";
import { CiFaceSmile } from "react-icons/ci";
import { toast } from 'react-toastify';
import useUserState from '../../Hooks/useUserState';
import { addToUserCartHandler, getUserCartByIdHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { UserLocalCartAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useNavigate } from 'react-router-dom';
import paymentIcos from '../../Images/Narayani-images/payment-icos.png';

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
    const { user, localUserCart } = useUserState();
    const [selectedOption, setSelectedOption] = useState();
    const [currentWatch, setCurrentWatch] = useState(50);
    const [firstPrice, setFirstPrice] = useState();
    const [lastPrice, setLastPrice] = useState();
    const [showOptions, setShowOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        if (product && JSON.parse(product?.options)?.length > 0) {
            let productOptions = JSON.parse(product?.options);
            productOptions.sort((a, b) => parseInt(a.price) - parseInt(b.price));
            let first = productOptions[0].price;
            let last = productOptions[productOptions.length - 1].price;
            setFirstPrice(first);
            setLastPrice(last);

            if (showOptions.length === 0) {
                let arr = [];
                productOptions.map((item) => {
                    const { option, price, quantity } = item;
                    const obj = { [option]: price, quantity };
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

            // Ensure the new value is within the range 50 to 200
            return Math.min(Math.max(newWatch, 50), 200);
        };

        const timeout = setTimeout(() => {
            setCurrentWatch(generateRandomNumber());
        }, 7000);

        return () => clearTimeout(timeout);
    }, [currentWatch]);

    const handleAddToCart = () => {
        if (!selectedOption) {
            toast.error('Please select any options');
            return;
        }
        if (user) {
            const obj = {
                userId: user?._id,
                productId: product?._id,
                quantity: quantity,
                option: selectedOption
            }
            addToUserCartHandler(obj)
                .then((response) => {
                    if (response) {
                        getUserCartByIdHandler(dispatch, user?._id);
                        setQuantity(1);
                    }
                })
        } else {
            const updatedUserLocalCart = [...localUserCart];
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
        toast.success('Product added to cart!');
    }

    const handleBuyNow = () => {
        if (!selectedOption) {
            toast.error('Please select any options');
        }
        if (user) {
            const obj = {
                userId: user?._id,
                productId: product?._id,
                quantity: quantity,
                option: selectedOption
            }
            addToUserCartHandler(obj)
                .then((response) => {
                    if (response) {
                        getUserCartByIdHandler(dispatch, user?._id);
                        navigate('/checkout');
                    }
                })
        }
        else {
            const updatedUserLocalCart = [...localUserCart];
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
            navigate('/checkout');
        }
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
                {
                    product?.bulletDescription?.length > 0 && JSON.parse(product?.bulletDescription)?.map((text, index) => {
                        return <>
                            {
                                text?.length > 0 &&
                                <div key={index}>
                                    <span className='text-[#777777] text-base'
                                        style={{
                                            lineHeight: '1.6',
                                            textRendering: 'optimizeLegibility'
                                        }}>
                                        <ul style={{ listStyleType: 'disc' }}>
                                            {product
                                                &&
                                                JSON.parse(product?.bulletDescription)?.map((desc, index) => {
                                                    return <li key={index}>{Object.values(desc)[1]}</li>
                                                })}
                                        </ul>
                                    </span>
                                </div>
                            }
                        </>
                    })
                }
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
                                showOptions.map((option, index) => {
                                    return <div key={index}>
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
                                                        {Object.keys(option)[0]}
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    {
                                                        Object.values(option)[1] <= 0
                                                            ?
                                                            <>
                                                                <div
                                                                    className='text-white transition-all p-1 bg-gray-300
                                                                        ease-in-out duration-300 text-center cursor-pointer'
                                                                    style={{
                                                                        width: '70px',
                                                                        borderRadius: '3px'
                                                                    }}
                                                                    onClick={() => toast.error('Currently variation not available!')}>
                                                                    {Object.keys(option)[0]}
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div
                                                                    className='text-[#333] transition-all p-1 border border-[#cccccc] hover:border-[#d0bdac]
                                                                                ease-in-out duration-300 text-center 
                                                                                cursor-pointer hover:text-[#d0bdac]'
                                                                    style={{
                                                                        width: '70px',
                                                                        borderRadius: '3px'
                                                                    }}
                                                                    onClick={() => setSelectedOption(option)}>
                                                                    {Object.keys(option)[0]}
                                                                </div>
                                                            </>
                                                    }
                                                </>
                                        }
                                    </div>
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
                            <LuIndianRupee className='mt-2' />{Object.values(selectedOption)[0]}
                        </span>
                    </div>
                }
                <div className='flex mt-2'>
                    <div>
                        <CartButton cart={quantity} setCart={setQuantity} />
                    </div>
                    <div className='w-2/4 ml-2'>
                        <button
                            className={`flex-grow mr-2 bg-[#256E1D] text-white w-full outline-none
                            ${!selectedOption && 'cursor-not-allowed'}
                                py-2 px-4 rounded-md transition-all duration-200 ease-in-out`}
                            onClick={handleAddToCart}
                        >
                            ADD TO CART
                        </button>
                    </div>
                    <div className='w-2/4 ml-3'>
                        <button
                            className={`flex-grow bg-[#074900] text-white w-full 
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
                <CiFaceSmile size={25} />
                <b className='mx-1 transition-all duration-300 ease-in-out'>
                    {currentWatch} People</b>
                are viewing this right now
            </div>
            <div>
                <img src={paymentIcos} alt='Ayubazar' />
            </div>
        </>
    )
}

export default ProductDetail
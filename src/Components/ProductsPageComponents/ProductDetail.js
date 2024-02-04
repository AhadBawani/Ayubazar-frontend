import React, { useEffect, useState } from 'react'
import { LuIndianRupee } from "react-icons/lu";
import { CiFaceSmile } from "react-icons/ci";
import { toast } from 'react-toastify';

const CartButton = () => {
    const [cartQuantity, setCartQuantity] = useState(1);
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
                {cartQuantity}
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
                    onClick={() => setCartQuantity((cart) => cart + 1)}
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
                    onClick={() => setCartQuantity((cart) => cart = cart > 1 ? cart - 1 : cart)}
                >
                    -
                </div>
            </div>
        </div>
    )
}

const ProductDetail = ({ product, dispatch }) => {
    const [selectedOption, setSelectedOption] = useState();
    const [currentWatch, setCurrentWatch] = useState(10);
    const [firstPrice, setFirstPrice] = useState();
    const [lastPrice, setLastPrice] = useState();
    const [showOptions, setShowOptions] = useState([]);

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
        setTimeout(() => {
            setCurrentWatch(Math.floor(Math.random() * 200) + 1);
        }, 20000)
    }, [currentWatch]);

    const handleAddToCart = () => {
        if (!selectedOption) {
            toast.error('Please select any options');
        }
    }

    const handleBuyNow = () => {
        if (!selectedOption) {
            toast.error('Please select any options');
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
            <div>
                <span className='flex mt-4'
                    style={{
                        fontWeight: 'inherit',
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
                    {product?.description}
                </span>
            </div>
            <div>
                <span className='uppercase'
                    style={{
                        letterSpacing: '.1em',
                        fontSize: '85%',
                        color: '#333'
                    }}>
                    Weight
                </span>
                <div className='my-3'>
                    <select className='w-full p-2 rounded-lg outline-none'
                        style={{
                            border: '1px solid #dedede'
                        }}
                        onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="" selected>Choose an option</option>
                        {
                            showOptions.length > 0
                            &&
                            showOptions.map((option) => {
                                return <option value={Object.values(option)}>
                                    {Object.keys(option)}
                                </option>
                            })
                        }
                    </select>
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
                        <CartButton />
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
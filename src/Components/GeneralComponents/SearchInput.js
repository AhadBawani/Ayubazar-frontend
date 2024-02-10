import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import useProductsState from '../../Hooks/useProductsState';
import Requests from '../../RequestHandlers/Requests/Requests';
import { showSingleProductAction } from '../../Redux/Actions/ProductsActions/ProductsActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { products } = useProductsState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);

        // Perform search logic
        const filteredProducts = products.filter(product =>
            product.productName.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredProducts);
    }

    const highlightSearchTerm = (productName, searchTerm) => {
        const index = productName.toLowerCase().indexOf(searchTerm.toLowerCase());
        if (index === -1) return productName;
        return (
            <>
                {productName.substring(0, index)}
                <span className="font-bold">{productName.substring(index, index + searchTerm.length)}</span>
                {productName.substring(index + searchTerm.length)}
            </>
        );
    }

    const handleShowProduct = (product) => {
        navigate("/product");
        dispatch(showSingleProductAction(product));
        sessionStorage.setItem('product', product?._id);
    }

    return (
        <div className='relative'>
            {/* Overlay */}
            {isFocused && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-500 opacity-50 z-50"
                    onClick={handleBlur}
                ></div>
            )}
            {/* Search Input */}
            <div
                className="relative"
                onClick={() => setIsFocused(true)}
            >
                <div className={
                    searchTerm?.length
                        ?
                        'flex items-center rounded-t-lg'
                        :
                        'flex items-center rounded-full'
                }
                    style={{
                        width: '90%',
                        border: "1px solid #ccc",
                        background: '#DFDFDF',
                        transition: 'border-color 0.3s ease',
                        position: 'relative',
                        zIndex: '50'
                    }}
                >
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '12px',
                        }}
                    >
                        <FaSearch size={22} className='text-gray-700' />
                    </span>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        autoComplete="off"
                        className={
                            searchTerm?.length
                                ?
                                'border-none outline-none p-[12px] rounded-t-lg bg-[#DFDFDF]'
                                :
                                'border-none outline-none p-[12px] rounded-full bg-[#DFDFDF]'
                        }
                        style={{
                            flex: '1',
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                </div>
                {/* Results */}
                {isFocused && searchTerm?.length > 0 &&
                    <div
                        className="absolute top-full left-0 w-[90%] bg-white shadow-lg p-2 rounded-b-lg"
                        style={{ zIndex: 50 }}
                    >
                        {
                            searchResults.length > 0
                                ?
                                <>
                                    <div>
                                        <div>
                                            <span className='my-1'>PRODUCTS</span>
                                            <hr />
                                        </div>
                                        <div className='mt-2'>
                                            {
                                                searchResults?.map((item) => {
                                                    return <>
                                                        <div className='flex hover:bg-[#DDDBDC] p-2 cursor-pointer'
                                                            onClick={() => handleShowProduct(item)}>
                                                            <div className='h-[45px] w-[45px] rounded-sm'
                                                                style={{ border: '1px solid #ececec' }}>
                                                                <img
                                                                    src={Requests.GET_PRODUCT_IMAGE + item?.productImage}
                                                                    alt={item?.productName} />
                                                            </div>
                                                            <div className='flex items-center ml-2'>
                                                                {highlightSearchTerm(item?.productName, searchTerm)}
                                                            </div>
                                                        </div>
                                                    </>
                                                })
                                            }
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    {
                                        searchResults?.length === 0 && searchTerm?.length > 0
                                        &&
                                        <span>No result found</span>
                                    }
                                </>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchInput;

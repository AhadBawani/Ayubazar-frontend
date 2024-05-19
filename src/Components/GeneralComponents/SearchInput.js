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

    const handleBlur = (e) => {
        if (e.target.closest(".search-results") === null) {
            // If the click is outside the search result area, close the search input
            setIsFocused(false);
            setSearchResults([]);
            setSearchTerm('');
            document.getElementById('searchInput').value = null;
        }
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
        if (!searchTerm.trim()) return productName; // Return the original product name if the search term is empty
        const regex = new RegExp(`(${searchTerm})`, 'gi'); // Create a case-insensitive regex to match the search term
        return productName.split(regex).map((part, index) => {
            if (part.toLowerCase() === searchTerm.toLowerCase()) {
                // If the part matches the search term exactly, wrap it in <span> for highlighting
                return <span className="font-bold" key={index}>{part}</span>;
            } else {
                return part; // Otherwise, return the part as is
            }
        });
    };


    const handleShowProduct = (product) => {
        navigate("/product");
        dispatch(showSingleProductAction(product));
        sessionStorage.setItem('product', product?._id);
        setIsFocused(false);
        setSearchResults([]);
        setSearchTerm('');
        document.getElementById('searchInput').value = null;
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
                        'flex items-center rounded-t-lg search-results'
                        :
                        'flex items-center rounded-full search-results'
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
                        id='searchInput'
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
                                                searchResults?.map((item) => (
                                                    <div
                                                        key={item._id}
                                                        className='flex hover:bg-[#DDDBDC] p-2 cursor-pointer'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleShowProduct(item);
                                                        }}
                                                        style={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}
                                                    >
                                                        <div className='h-[45px] w-[45px] rounded-sm flex-shrink-0' style={{ border: '1px solid #ececec' }}>
                                                            <img
                                                                src={Requests.GET_PRODUCT_IMAGE + item?.productImage}
                                                                alt={item?.productName}
                                                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                        <div className='flex-grow ml-2 overflow-hidden'>
                                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                {highlightSearchTerm(item?.productName, searchTerm)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
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

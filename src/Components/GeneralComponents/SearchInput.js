import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import useProductsState from '../../Hooks/useProductsState';
import Requests from '../../RequestHandlers/Requests/Requests';
import { SearchedProductAction, showSingleProductAction } from '../../Redux/Actions/ProductsActions/ProductsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useComponentState from '../../Hooks/useComponentState';
import Button from '../../Fields/Button';
import { toast } from 'react-toastify';

const SearchInput = ({ setSearchProductPage }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchedCompany, setSearchedCompany] = useState([]);
    const { products } = useProductsState();
    const company = useSelector((state) => state?.Company?.company) || [];
    const { mobile } = useComponentState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = (e) => {
        if (e.target.closest(".search-results") === null) {
            setIsFocused(false);
            setSearchResults([]);
            setSearchTerm('');
            document.getElementById('searchInput').value = null;
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);

        const filteredProducts = products.filter(product =>
            product.productName.toLowerCase().includes(value.toLowerCase())
        );
        if (filteredProducts?.length > 0) {
            setSearchResults(filteredProducts);
        }
        else if (filteredProducts?.length === 0) {
            setSearchResults([]);
            const filteredCompany = company.filter(company =>
                company.companyName.toLowerCase().includes(value.toLowerCase())
            );
            setSearchedCompany(filteredCompany);
        }
    }
    const highlightSearchTerm = (productName, searchTerm) => {
        if (!searchTerm.trim()) return productName;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return productName.split(regex).map((part, index) => {
            if (part.toLowerCase() === searchTerm.toLowerCase()) {
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
        if (mobile) setSearchProductPage(false);
        document.getElementById('searchInput').value = null;
    }
    const handleSearch = (e) => {
        handleNoResultFound(e);
    }

    const handleNoResultFound = (e) => {
        e.stopPropagation();
        const value = document.getElementById('searchInput').value;
        if (value.length === 0 | !value) {
            toast.error('Please enter some text!');
            return;
        };
        setIsFocused(false);
        setSearchResults([]);
        setSearchTerm('');
        if (mobile) setSearchProductPage(false);
        document.getElementById('searchInput').value = null;
        navigate('/product-enquiry');
    }
    const handleShowCompany = (data) => {
        if (data?.products?.length > 0) {
            dispatch(SearchedProductAction(data));
            if (mobile) setSearchProductPage(false);
            setIsFocused(false);
            setSearchResults([]);
            setSearchTerm('');
            document.getElementById('searchInput').value = null;
            navigate('/search-product');
        }
    }
    return (
        <div className='relative'>
            {/* Overlay */}
            {isFocused && !mobile && (
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
                {
                    mobile
                        ?
                        <>
                            <div className='w-full bg-white h-16 p-2 flex justify-center'>
                                <div className={
                                    searchTerm?.length
                                        ?
                                        'flex items-center rounded-t-lg search-results bg-[#DFDFDF]'
                                        :
                                        'flex items-center rounded-full search-results bg-[#DFDFDF]'
                                }
                                    style={{
                                        width: '90%',
                                        border: "1px solid #ccc",
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
                                                'border-none outline-none p-[12px] rounded-full bg-[#DFDFDF]'}
                                        style={{
                                            flex: '1',
                                        }}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='ml-1'>
                                    <Button text="Search" onClick={(e) => handleSearch(e)} />
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className={
                                searchTerm?.length
                                    ?
                                    'flex items-center rounded-t-lg search-results bg-[#DFDFDF]'
                                    :
                                    'flex items-center rounded-full search-results bg-[#DFDFDF]'
                            }
                                style={{
                                    width: '90%',
                                    border: "1px solid #ccc",
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
                                            'border-none outline-none p-[12px] rounded-full bg-[#DFDFDF]'}
                                    style={{
                                        flex: '1',
                                    }}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <button className={`w-[10%] uppercase font-semibold 
                                bg-[#027148] hover:bg-[#013220] outline-none
                                text-white p-2 mr-2 text-sm 
                                ${searchTerm?.length ? 'rounded-md' : 'rounded-full'}
                                transition-all ease-in-out duration-200`} onClick={(e) => handleNoResultFound(e)}>
                                    Search
                                </button>
                            </div>
                        </>
                }
                {/* Results */}
                {isFocused && searchTerm?.length > 0 &&
                    <div
                        className="absolute top-full left-0 w-full sm:w-[90%] bg-white shadow-lg p-2 rounded-b-lg"
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
                                                                src={Requests.GET_PRODUCT_IMAGE + item?.productImages[0]}
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
                                        searchedCompany?.length > 0
                                        &&
                                        <div>
                                            <div>
                                                <span className='my-1'>COMPANYS</span>
                                                <hr />
                                            </div>
                                            <div className='mt-2'>
                                                {
                                                    searchedCompany?.map((item) => (
                                                        <div
                                                            key={item._id}
                                                            className='flex hover:bg-[#DDDBDC] p-2 cursor-pointer'
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleShowCompany(item);
                                                            }}
                                                            style={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}
                                                        >
                                                            <div className='h-[45px] w-[45px] rounded-sm flex-shrink-0' style={{ border: '1px solid #ececec' }}>
                                                                <img
                                                                    src={Requests.GET_COMPANY_IMAGES + item?.companyImage}
                                                                    alt={item?.productName}
                                                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                            <div className='flex-grow ml-2 overflow-hidden'>
                                                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                    {highlightSearchTerm(item?.companyName, searchTerm)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    }
                                </>
                        }
                    </div>
                }
            </div>
        </div >
    )
}

export default SearchInput;

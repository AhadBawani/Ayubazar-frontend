import React, { useRef, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { SearchedProductAction } from '../../Redux/Actions/ProductsActions/ProductsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useProductsState from '../../Hooks/useProductsState';

const SubHeader = () => {
    const dispatch = useDispatch();
    const { categories } = useProductsState();
    const company = useSelector((state) => state?.Company?.company);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    const clearTimeOut = () => clearTimeout(timeoutRef.current);

    const handleShowProduct = (item) => {
        dispatch(SearchedProductAction(item));
        navigate(`/categories/${item?.category}`);
        sessionStorage.setItem('category', JSON.stringify(item));
    };

    const handleShowProductOfCompany = (item) => {
        console.log(item);
        if (item?.products?.length > 0) {
            dispatch(SearchedProductAction(item));
            navigate('/search-product');
        }
    };

    return (
        <div className='flex ml-2'>
            <div className='bg-[#074900] rounded-t-lg cursor-pointer'
                style={{
                    fontSize: '84.312%',
                    padding: '17px 25px 15px 15px',
                    textTransform: 'uppercase',
                    transition: 'all 350ms ease',
                    lineHeight: '1.4',
                    textRendering: 'optimizeLegibility',
                    width: '20.1%',
                    fontWeight: '700',
                    color: 'white'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={clearTimeOut}
            >
                <div className='flex justify-center items-center'>
                    <span><IoMenu className='mt-[-3px] mr-1' size={24} /></span>
                    <span>Browse company</span>
                </div>
                {
                    isOpen
                    &&
                    <div className='bg-[#074900] absolute z-10 min-w-[20%] max-w-[20%] left-2 rounded-b-lg transition-all'>
                        <div className='mt-4 mb-1 bg-white text-black mx-1 p-2 rounded-b-lg'>
                            {
                                company?.slice(0, 5)?.map((item, index) => {
                                    return <div key={index}>
                                        <div className='hover:text-[#d0bdac] w-full flex justify-center items-center my-2'>
                                            <span
                                                className='text-base font-extrabold
                                                transition-all ease-in-out duration-300'
                                                onClick={() => handleShowProductOfCompany(item)}>
                                                {item?.companyName}
                                            </span>
                                        </div>
                                        {company?.length !== (index + 1) && <hr />}
                                    </div>
                                })
                            }
                            {
                                company?.length > 5
                                &&
                                <>
                                    <div className='flex justify-center items-center mt-2'>
                                        <button
                                            className='p-2 rounded-lg hover:bg-[#074900]
                                            bg-[#256E1D] font-semibold text-white' onClick={() => navigate('/companies')}>
                                            See More
                                        </button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                }
            </div>
            <div className='ml-4 flex'>
                {
                    categories?.length > 0
                    &&
                    categories?.map((item, index) => {
                        const widthPercent = (80 / categories.length) - 4;
                        return <div key={index} className='min-h-full flex justify-center items-center'>
                            <span className='relative group'>
                                <span className='transition-all ease-in-out duration-300 ml-4 cursor-pointer
                            border-b-2 border-transparent group-hover:border-solid group-hover:border-black'
                                    style={{
                                        fontSize: '104.312%',
                                        fontWeight: '700',
                                        width: `${widthPercent}%` // Set dynamic width
                                    }}
                                    onClick={() => handleShowProduct(item)}
                                >
                                    {item?.category}
                                </span>
                            </span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default SubHeader
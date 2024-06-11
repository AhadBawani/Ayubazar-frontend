import React, { useEffect, useRef, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { DefaultProductsAction, FilterProductAction } from '../../Redux/Actions/ProductsActions/ProductsActions';
import { useDispatch, useSelector } from 'react-redux';
import useProductsState from '../../Hooks/useProductsState';

const SubHeader = ({ products }) => {
    const dispatch = useDispatch();
    const company = useSelector((state) => state?.Company?.company);
    const [isOpen, setIsOpen] = useState(false);
    const { defaultProducts } = useProductsState() || [];
    const timeoutRef = useRef(null);

    useEffect(() => {
        let arr = [];
        if (products?.length > 0 && company?.length > 0) {
            company?.map((com) => {
                let filteredProduct = products?.filter((product) => product?.productCompany?._id === com?._id);
                if (filteredProduct?.length > 0) {
                    let obj = {
                        _id: com?._id,
                        companyName: com?.companyName,
                        products: filteredProduct
                    }
                    arr.push(obj);
                }
                return null;
            })
        }
        dispatch(DefaultProductsAction(arr));
    }, [products, company, dispatch]);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // Delay in milliseconds
    };

    const clearTimeOut = () => clearTimeout(timeoutRef.current);

    const handleShowProduct = (item) => {
        const filteredProduct = products?.filter((product) => product?.productCompany?._id === item?._id);
        dispatch(FilterProductAction({
            title: `${item?.companyName}'s Products`,
            products: filteredProduct
        }));

        // Scroll to the filterProduct component with some height offset
        const filterProductElement = document.getElementById('filterProduct');
        if (filterProductElement) {
            filterProductElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
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
                                defaultProducts?.map((item, index) => {
                                    return <div key={index}>
                                        <div className='hover:text-[#d0bdac] w-full flex justify-center items-center my-2'>
                                            <span
                                                className='text-base font-extrabold
                                                transition-all ease-in-out duration-300'
                                                onClick={() => handleShowProduct(item)}>
                                                {item?.companyName}
                                            </span>
                                        </div>
                                        {defaultProducts?.length !== (index + 1) && <hr />}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            <div className='ml-4 flex'>
                {
                    defaultProducts?.length > 0
                    &&
                    defaultProducts?.map((item, index) => {
                        const widthPercent = (80 / defaultProducts.length) - 4;
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
                                    {item?.companyName}
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
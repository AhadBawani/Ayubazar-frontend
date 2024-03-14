import React, { useEffect, useRef, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { FilterProductAction } from '../../Redux/Actions/ProductsActions/ProductsActions';
import { useDispatch } from 'react-redux';

const SubHeader = ({ products }) => {
    const dispatch = useDispatch();
    const [companys, setCompanysName] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (products?.length > 0) {
            const companyData = products.reduce((acc, product) => {
                const found = acc.find(company => company._id === product.productCompany._id);
                if (!found) {
                    acc.push({
                        _id: product.productCompany._id,
                        companyName: product.productCompany.companyName
                    });
                }
                return acc;
            }, []);
            setCompanysName(companyData);
        }
    }, [products]);

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
            title: `${item?.companyName} Products`,
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
            <div className='bg-[#D0BDAC] rounded-t-lg cursor-pointer'
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
                    <div className='bg-[#D0BDAC] absolute z-10 min-w-[20%] max-w-[20%] left-2 rounded-b-lg'>
                        <div className='mt-4 mb-1 bg-white text-black mx-1 p-2 rounded-b-lg'>
                            {
                                companys?.map((item, index) => {
                                    return <div key={index}>
                                        <div className='hover:text-[#d0bdac] w-full flex justify-center items-center my-2'>
                                            <span
                                                className='text-base font-extrabold
                                                transition-all ease-in-out duration-300'
                                                onClick={() => handleShowProduct(item)}>
                                                {item?.companyName}
                                            </span>
                                        </div>
                                        {companys?.length !== (index + 1) && <hr />}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            <div className='ml-4 flex'>
                {
                    companys?.length > 0
                    &&
                    companys?.map((item, index) => {
                        const widthPercent = (80 / companys.length) - 4;
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
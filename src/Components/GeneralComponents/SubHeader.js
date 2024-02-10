import React, { useEffect, useRef, useState } from 'react'
import { IoMenu } from "react-icons/io5";

const SubHeader = ({ products }) => {
    const [companys, setCompanysName] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (products?.length > 0) {
            const companyNames =
                Array.from(new Set
                    (products.map(product => product.productCompany.companyName)));
            setCompanysName(companyNames);
        }
    }, [products])

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
                                companys?.map((item) => {
                                    return <>
                                        <div className='hover:text-[#d0bdac] w-full flex justify-center items-center'>
                                            <span
                                                className='text-base font-extrabold
                                                transition-all ease-in-out duration-300'>
                                                {item}
                                            </span>
                                            <hr />
                                        </div>
                                    </>
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
                        const widthPercent = (80 / companys.length) - 4; // Calculate width percentage based on available space
                        return (
                            <div key={index} className='min-h-full flex justify-center items-center'>
                                <span className='relative group'>
                                    <span className='transition-all ease-in-out duration-300 ml-4 cursor-pointer
                                    border-b-2 border-transparent group-hover:border-solid group-hover:border-black'
                                        style={{
                                            fontSize: '104.312%',
                                            fontWeight: '700',
                                            width: `${widthPercent}%` // Set dynamic width
                                        }}
                                    >
                                        {item}
                                    </span>
                                </span>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default SubHeader
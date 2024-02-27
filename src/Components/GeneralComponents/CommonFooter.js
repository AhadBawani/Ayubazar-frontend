import React from 'react'
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useComponentState from '../../Hooks/useComponentState';

const CommonFooter = () => {
    const navigate = useNavigate();
    const { mobile } = useComponentState();
    const options = [
        {
            icon: <MdOutlineLocalShipping size={24} />,
            title: 'FREE SHIPPING',
            content: 'Ayubazar provides complimentary shipping for orders above a specified value'
        },
        {
            icon: <FaMoneyBillAlt size={24} />,
            title: 'Cash On Delivery',
            content: 'On orders above 499/-'
        },
        {
            icon: <IoMdTime size={24} />,
            title: 'Same-Day Dispatch',
            content: 'On all orders'
        },
        {
            icon: <FaShippingFast size={24} />,
            title: 'Fast Shipping',
            content: '1D/2D Shipping in all over Gujarat'
        }
    ]
    const handleNavigation = (navigation) => {
        navigate(navigation);
    }
    return (
        <div className={mobile ? 'max-w-sm bg-[#FAFAFA]' : 'max-w-lg bg-[#FAFAFA]'} style={{ borderTop: '1px solid #ececec' }}>
            <div className='flex flex-col sm:flex-row sm:justify-between space-x-4 mt-4 m-4 p-4'>
                {
                    options.map((item) => {
                        return <>
                            <div className='border border-[#EFEFEF] bg-[#FFFFFF] transition-all ease-in-out duration-200
                                rounded text-center p-4 w-full md:w-1/4 hover:border-[#ccc] cursor-pointer'>
                                <div className="flex items-end justify-end text-[#333]">
                                    <span>{item.icon}</span>
                                </div>
                                <div>
                                    <span
                                        style={{
                                            fontSize: '115%',
                                            color: '#333',
                                            fontWeight: '700'
                                        }}>
                                        {item.title}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        style={{
                                            lineHeight: '22px',
                                            fontSize: '100%',
                                            color: '#999',
                                            fontWeight: '500'
                                        }}>
                                        {item.content}
                                    </span>
                                </div>
                            </div>
                        </>
                    })
                }
            </div>
            <div className='my-4'>
                <hr />
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between m-4 p-4'>
                <span
                    className='hover:text-[#d0bdac] font-semibold cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/about-us')}>
                    About Us
                </span>
                <span
                    className='hover:text-[#d0bdac] font-semibold cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/contact-us')}>
                    Contact Us
                </span>
                <span
                    className='hover:text-[#d0bdac] font-semibold cursor-pointer 
                    transition-all ease-in-out duration-200'>
                    Privacy Policy
                </span>
                <span
                    className='hover:text-[#d0bdac] font-semibold cursor-pointer 
                    transition-all ease-in-out duration-200'>
                    Terms of services
                </span>
                <span
                    className='hover:text-[#d0bdac] font-semibold cursor-pointer 
                    transition-all ease-in-out duration-200'>
                    Shipping Policy
                </span>
                <span
                    className='hover:text-[#d0bdac] font-semibold cursor-pointer 
                    transition-all ease-in-out duration-200'>
                    Cancellation, Return & Refund Policy
                </span>
                <span
                    className='hover:text-[#d0bdac] font-semibold cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/blogs')}>
                    Blogs
                </span>
            </div>
        </div>
    )
}

export default CommonFooter;
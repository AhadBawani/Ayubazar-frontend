import React from 'react'
import { MdOutlineLocalShipping } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaShippingFast } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import facebooklogo from '../../Images/facebook.png';
import instagramlogo from '../../Images/instagram.jpeg';
import youtublogo from '../../Images/youtube.png';
import companyLogo from '../../Images/Narayani-images/narayani-chikitsaly.jpg';
import companyLogo1 from '../../Images/Narayani-images/narayani-company.jpg';
import companyLogo2 from '../../Images/Narayani-images/narayani-pharmacy-2.jpg';
import companyLogo3 from '../../Images/Narayani-images/narayani-traders.jpg';
import paymentImage from '../../Images/Narayani-images/payment-icos.png';

const CommonFooter = () => {
    const navigate = useNavigate();
    const IconOptions = [
        {
            id: 1,
            logo: facebooklogo,
            title: 'Facebook',
            link: 'https://www.instagram.com/narayani_pharmacy/',
            text: 'Ayubazar'
        },
        {
            id: 2,
            logo: instagramlogo,
            title: 'Instagram',
            link: 'https://www.instagram.com/narayani_pharmacy/',
            text: 'Ayubazar'
        },
        {
            id: 3,
            logo: youtublogo,
            title: 'YouTube',
            link: 'https://www.youtube.com/channel/UC-uhIGI9sbNOIpJGKKAfAQw',
            text: 'Mitra'
        },
    ];
    const options = [
        {
            id: 1,
            icon: <FaMoneyBillAlt size={24} />,
            title: 'Cash On Delivery',
            content: 'No minimum order limit'
        },
        {
            id: 2,
            icon: <MdOutlineLocalShipping size={24} />,
            title: 'Free Shipping',
            content: 'On orders above 499/-'
        },
        {
            id: 3,
            icon: <IoMdTime size={24} />,
            title: 'Same-Day Dispatch',
            content: 'On all orders'
        },
        {
            id: 4,
            icon: <FaShippingFast size={24} />,
            title: 'Fast Delivery',
            content: '1D/2D Shipping in all over Gujarat'
        }
    ]
    const handleNavigation = (navigation) => {
        navigate(navigation);
    }
    const handleOpenLink = (link) => {
        window.open(link, '_blank');
    }
    return (
        <div className='bg-[#084701] w-full' style={{ borderTop: '1px solid #ececec' }}>
            <div className='m-4 p-4 flex gap-4 sm:flex-row flex-col'>
                {
                    options.map((item, index) => {
                        return <div className='bg-[#256E1D] transition-all ease-in-out duration-200
                        rounded text-center p-4 w-full md:w-1/4 h-[150px] cursor-pointer' key={item.title + index}>
                            <div className="flex items-end justify-end text-white">
                                <span>{item.icon}</span>
                            </div>
                            <div>
                                <span
                                    style={{
                                        fontSize: '115%',
                                        color: 'white',
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
                                        color: 'white',
                                        fontWeight: '500'
                                    }}>
                                    {item.content}
                                </span>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between p-12 px-20 bg-white'>
                <div>
                    <span className='text-3xl font-semibold'>Ayubazar</span>
                    <div className='mt-6 sm:mt-8 flex flex-col'>
                        <span>01, Ground Floor,</span>
                        <span>Opera Tower,</span>
                        <span>Jawahar Road,</span>
                        <span>Rajkot - 360001</span>
                        <span>support@ayubazar.com</span>
                        <span>+91 94285 60666</span>
                    </div>
                    <div className='mt-5 flex gap-4'>
                        {
                            IconOptions.map((item, index) => {
                                return <>
                                    <div
                                        className='flex rounded-lg transition-all p-3 hover:shadow-2xl
                                            ease-in-out duration-200 shadow-xl bg-gray-50 cursor-pointer'
                                        onClick={() => handleOpenLink(item.link)} key={index + item.title}>
                                        <img src={item.logo}
                                            height="40px"
                                            width="40px"
                                            className="object-cover"
                                            alt={item.title} />
                                    </div>
                                </>
                            })
                        }
                    </div>
                </div>
                <div className='mt-6 sm:mt-0'>
                    <span className='text-3xl font-semibold'>Quick Links</span>
                    <div className='flex flex-col mt-6 sm:mt-8'>
                        <span
                            className='hover:text-[#d0bdac] cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/about-us')}>
                            About Us
                        </span>
                        <span
                            className='hover:text-[#d0bdac] cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/contact-us')}>
                            Contact Us
                        </span>
                        <span
                            className='hover:text-[#d0bdac] cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/privacy-policy')}>
                            Privacy Policy
                        </span>
                        <span
                            className='hover:text-[#d0bdac] cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/terms-of-service')}>
                            Terms of services
                        </span>
                        <span
                            className='hover:text-[#d0bdac] cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/shipping-policy')}>
                            Shipping Policy
                        </span>
                        <span
                            className='hover:text-[#d0bdac] cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/cancellation-return-refund-policy')}>
                            Cancellation, Return & Refund Policy
                        </span>
                        <span
                            className='hover:text-[#d0bdac] cursor-pointer 
                    transition-all ease-in-out duration-200' onClick={() => handleNavigation('/blogs')}>
                            Blogs
                        </span>
                    </div>
                </div>
                <div className='mt-4 sm:mt-0'>
                    <div className='flex gap-4'>
                        <div className='max-h-[110px] max-w-[110px]'>
                            <img
                                src={companyLogo}
                                height="100px"
                                width="100px"
                                className='object-cover'
                                alt={companyLogo} />
                        </div>
                        <div className='max-h-[110px] max-w-[110px]'>
                            <img
                                src={companyLogo1}
                                height="100px"
                                width="100px"
                                className='object-cover'
                                alt={companyLogo1} />
                        </div>
                        <div className='max-h-[110px] max-w-[110px]'>
                            <img
                                src={companyLogo2}
                                height="100px"
                                width="100px"
                                className='object-cover'
                                alt={companyLogo2} />
                        </div>
                        <div className='max-h-[110px] max-w-[110px]'>
                            <img
                                src={companyLogo3}
                                height="100px"
                                width="100px"
                                className='object-cover'
                                alt={companyLogo3} />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <img
                            src={paymentImage}
                            className='object-cover'
                            width='450px'
                            alt={paymentImage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommonFooter;
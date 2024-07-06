import React from 'react';
import ContactUsForm from '../Components/ContactUsComponents/ContactUsForm';
// import useComponentState from '../Hooks/useComponentState';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import facebooklogo from '../Images/facebook.png';
import instagramlogo from '../Images/instagram.jpeg';
import youtublogo from '../Images/youtube.png';

const ContactUs = () => {
    // const { mobile } = useComponentState();
    const handleOpenWhatsApp = () => {
        const link = 'https://api.whatsapp.com/send/?phone=919428560666&text=Hi!&type=phone_number&app_absent=0';
        window.open(link, '_blank');
    }
    const options = [
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
    const handleOpenLink = (link) => {
        window.open(link, '_blank');
    }
    return (
        <div>
            <div className='bg-[#F8F6F3]'>
                <div className='flex justify-center items-center min-h-[250px]'>
                    <span className='text-4xl font-bold'>Get in Touch</span>
                </div>
            </div>
            <div className='flex justify-center items-center mt-[-2rem]'>
                <div className='w-[80%] shadow-xl bg-white p-8 flex flex-col sm:flex-row gap-4 text-center text-base'>
                    <div className='border-[#DEDEDE] rounded-md flex flex-col justify-center items-center p-4 w-full sm:w-1/3'
                        style={{ border: '1px solid #DEDEDE' }}>
                        <span className='mb-2'><FaPhoneAlt size={20} /></span>
                        <span>+91 94285 60666</span>
                    </div>
                    <div className='border-[#DEDEDE] rounded-md flex flex-col justify-center items-center p-4 w-full sm:w-1/3'
                        style={{ border: '1px solid #DEDEDE' }}>
                        <span className='mb-2'><IoMdMail size={20} /></span>
                        <span>support@ayubazar.com</span>
                    </div>
                    <div className='border-[#DEDEDE] rounded-md flex flex-col justify-center items-center p-4 w-full sm:w-1/3'
                        style={{ border: '1px solid #DEDEDE' }}>
                        <span className='mb-2'><FaLocationDot size={20} /></span>
                        <span>Shop No. 101, Maruti Nandan Complex,
                            Jawahar Road, Rajkot</span>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center mb-8'>
                <div className='mt-24 w-[80%] flex flex-col sm:flex-row'>
                    <div className='w-full sm:w-1/2'>
                        <span className='text-2xl font-bold'>We're Ready, Let's Talk.</span>
                        <ContactUsForm />
                    </div>
                    <div className='w-full sm:w-1/2 sm:ml-24 mt-6 sm:mt-0'>
                        <span className='text-2xl font-bold'>Contact Info</span>
                        <div className='mt-8'>
                            <span className='text-xl font-semibold'>Address</span>
                            <div className='mt-4'>
                                <p>Shop No. 101, Maruti Nandan Complex,</p>
                                <p>Jawahar Road,</p>
                                <p>Rajkot - 360001</p>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <span className='text-xl font-semibold'>Email Us</span>
                            <p>support@ayubazar.com</p>
                        </div>
                        <div className='mt-8'>
                            <span className='text-xl font-semibold'>Call Us</span>
                            <p>+91 94285 60666</p>
                        </div>
                        <div className='mt-8'>
                            <span className='text-xl font-semibold'>WhatsApp</span>
                            <p className='cursor-pointer text-blue-500 hover:text-blue-600 font-semibold' onClick={handleOpenWhatsApp}>Click Here</p>
                        </div>
                        <div className='mt-5 flex gap-4'>
                            {
                                options.map((item, index) => {
                                    return <>
                                        <div
                                            className='flex rounded-lg transition-all p-4 hover:shadow-2xl
                                            ease-in-out duration-200 shadow-xl bg-gray-50 cursor-pointer'
                                            onClick={() => handleOpenLink(item.link)} key={index}>
                                            <img src={item.logo}
                                                height="50px"
                                                width="50px"
                                                className="object-cover"
                                                alt={item.title} />
                                        </div>
                                    </>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='flex mt-24'>
                <div className='w-[50%] flex flex-col justify-center items-center'>
                    <span className='text-2xl font-bold'>We're Ready, Let's Talk.</span>
                    <ContactUsForm />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <span>Contact Info</span>
                    <div className='mt-4'>
                        <span>Address</span>
                        <span>
                            Shop No. 101, Maruti Nandan Complex,
                            Jawahar Road,
                            Rajkot - 360001
                        </span>
                    </div>
                </div>
            </div> */}
            {/* <div className="max-w-sm sm:max-w-[90%] w-full flex flex-col items-center">
                <div className="bg-white p-8 rounded-lg shadow-md flex flex-col sm:flex-row w-full">
                    {mobile ? (
                        <>
                            <div className='flex justify-center items-center text-[#333] font-bold text-2xl'>
                                <span>Contact Us</span>
                            </div>
                            <div className='flex justify-center items-center mt-4'>
                                <img src={logo} alt='Ayubazar' width="250px" />
                            </div>
                            <div>
                                <ContactUsForm />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='w-1/3 flex justify-center items-center'>
                                <img src={logo} alt='Ayubazar' width="250px" />
                            </div>
                            <div className='w-2/3'>
                                <div className='flex justify-center items-center text-[#333] font-bold text-2xl'>
                                    <span>Contact Us</span>
                                </div>
                                <ContactUsForm />
                            </div>
                        </>
                    )}
                </div>
            </div> */}
        </div>
    );
};

export default ContactUs;
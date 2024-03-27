import React from 'react';
import logo from '../Images/logo.png';
import ContactUsForm from '../Components/ContactUsComponents/ContactUsForm';
import useComponentState from '../Hooks/useComponentState';

const ContactUs = () => {
    const { mobile } = useComponentState();
    return (
        <div className=" bg-gray-100 p-4 flex justify-center">
            <div className="max-w-sm sm:max-w-[90%] w-full flex flex-col items-center">
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
            </div>
        </div>
    );
};

export default ContactUs;
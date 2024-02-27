import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import useUserState from '../../Hooks/useUserState';
import { FaChevronDown } from "react-icons/fa";
import LoginForm from '../GeneralComponents/LoginForm';
import Input from '../../Fields/Input';
import OrderAddressForm from './Forms/OrderAddressForm';

const ContactInformation = ({ setState }) => {
    const { user } = useUserState();
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLoginToggle = () => {
        setShowLoginForm(!showLoginForm);
    };

    return (
        <>
            <div className='p-4'>
                {
                    user
                        ?
                        <>
                            <div>
                                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                    Contact Information *
                                </span>
                                <Input defaultValue={user?.email} disabled={true} />
                            </div>
                        </>
                        : (
                            <div
                                style={{
                                    padding: '10px',
                                    fontSize: '100%',
                                    lineHeight: '1.4'
                                }}
                                className='bg-[#f8f8f8] text-[#333] flex justify-center items-center'>
                                <div className='flex justify-center items-center flex-col'>
                                    <div className='flex'>
                                        <span><CgProfile size={24} /></span>
                                        <span className='ml-3'>Returning customer?</span>
                                        <span
                                            className='font-bold ml-1 flex cursor-pointer'
                                            onClick={handleLoginToggle}>
                                            <span>Click here to login</span>
                                            <span className='ml-1 mt-1'><FaChevronDown /></span>
                                        </span>
                                    </div>
                                    {showLoginForm && (
                                        <div className='transition-all ease-in-out duration-1000 
                                            mt-12 flex flex-col justify-center items-center w-2/3'
                                            style={{
                                                overflow: 'hidden',
                                            }}>
                                            <div className='flex justify-center items-center'
                                                style={{
                                                    fontSize: '100%',
                                                    lineHeight: '1.6',
                                                    textRendering: 'optimizeLegibility',
                                                    color: '#333'
                                                }}>
                                                <span>
                                                    If you have shopped with us before,
                                                    please enter your details below.
                                                    If you are a new customer,
                                                    please proceed to the Billing section.
                                                </span>
                                            </div>
                                            <LoginForm state={'checkout'} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                }
                <div className='mt-6'>
                    <OrderAddressForm
                        userShippingAddress={user?.shippingAddress}
                        userBillingAddress={user?.billingAddress}
                        setState={setState} />
                </div>
            </div>
        </>
    );
}

export default ContactInformation;

import React, { useState } from 'react';
import useUserState from '../../Hooks/useUserState';
import BillingAddressForm from './Forms/BillingAddressForm';
import ShippingAddressForm from './Forms/ShippingAddressForm';

const Addresses = () => {
    const { user } = useUserState();
    const [state, setState] = useState();
    return (
        <div>
            {
                state
                    ?
                    <>
                        {
                            state === 'Shipping' && <ShippingAddressForm setState={setState} />
                        }
                        {
                            state === 'Billing' && <BillingAddressForm setState={setState} />
                        }
                    </>
                    :
                    <>
                        <span>The following addresses will be used on the checkout page by default.</span>
                        <div className='grid grid-cols-2 w-full mt-8'>
                            <div>
                                <div className='flex flex-col'>
                                    <span className='text-2xl font-semibold'>Billing Address</span>
                                    <span className='cursor-pointer hover:text-[#d0bdac] ml-1 underline my-2'
                                        onClick={() => setState('Billing')}>
                                        Edit
                                    </span>
                                    {
                                        !user?.firstName
                                            ?
                                            <>
                                                <span>{user?.displayName}</span>
                                            </>
                                            :
                                            <>
                                                <span>{user?.firstName + " " + user?.lastName}</span>
                                            </>
                                    }
                                    {
                                        user?.billingAddress
                                        &&
                                        <>
                                            <span>{user?.billingAddress?.streetAddress}</span>
                                            <span>{user?.billingAddress?.city} {user?.billingAddress?.postcode}</span>
                                            <span>{user?.billingAddress?.state}</span>
                                        </>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className='flex flex-col'>
                                    <span className='text-2xl font-semibold'>Shipping Address</span>
                                    {
                                        user?.shippingAddress
                                            ?
                                            <>
                                                <span className='cursor-pointer hover:text-[#d0bdac] ml-1 underline my-2'
                                                    onClick={() => setState('Shipping')}>
                                                    Edit
                                                </span>
                                                <div className='flex flex-col'>
                                                    <span>{user?.shippingAddress?.firstName} {user?.shippingAddress?.lastName}</span>
                                                    <span>{user?.shippingAddress?.houseNumberAndStreetName}</span>
                                                    <span>{user?.shippingAddress?.city} {user?.shippingAddress?.postcode}</span>
                                                    <span>{user?.shippingAddress?.state}</span>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <span className='cursor-pointer hover:text-[#d0bdac] ml-1 underline my-2'
                                                    onClick={() => setState('Shipping')}>
                                                    Add
                                                </span>
                                                <span>You have not set up this type of address yet.</span>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default Addresses
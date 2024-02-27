import React, { useEffect, useState } from 'react'
import useUserState from '../../../Hooks/useUserState';
import Input from '../../../Fields/Input';
import { FaChevronLeft } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OrderDetailsAction } from '../../../Redux/Actions/UserActions/UsersAction';
import { useDispatch } from 'react-redux';

const OrderAddressForm = ({ userBillingAddress, userShippingAddress, setState }) => {
    const { user, shipping } = useUserState();
    const [indianState, setIndianState] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [billingAddress, setBillingAddress] = useState({
        firstName: userBillingAddress?.firstName || '',
        lastName: userBillingAddress?.lastName || '',
        phoneNumber: userBillingAddress?.phoneNumber || '',
        email: userBillingAddress?.email || user?.email,
        streetAddress: userBillingAddress?.houseNumberAndStreetName || userBillingAddress?.streetAddress || '',
        apartment: userBillingAddress?.apartment || '',
        city: userBillingAddress?.city || '',
        postcode: userBillingAddress?.postcode || '',
        state: userBillingAddress?.state || ''
    })
    const [shippingAddress, setShippingAddress] = useState({
        firstName: userShippingAddress?.firstName || '',
        lastName: userShippingAddress?.lastName || '',
        phoneNumber: userShippingAddress?.phoneNumber || '',
        email: userShippingAddress?.email || user?.email,
        streetAddress: userShippingAddress?.houseNumberAndStreetName || userShippingAddress?.streetAddress || '',
        apartment: userShippingAddress?.apartment || '',
        city: userShippingAddress?.city || '',
        postcode: userShippingAddress?.postcode || '',
        state: userShippingAddress?.state || ''
    })

    const [billingAddressError, setBillingAddressError] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        streetAddress: false,
        apartment: false,
        city: false,
        postcode: false,
        state: false
    })
    const [shippingAddressError, setShippingAddressError] = useState({
        ...billingAddressError
    })
    const validateAddress = (address, errors) => {
        let valid = true;
        const newErrors = { ...errors };

        Object.keys(address).forEach((key) => {
            if (!address[key]) {
                newErrors[key] = true;
                valid = false;
            } else {
                newErrors[key] = false;
            }
        });

        if (address.postcode.length < 6) {
            toast.error('Enter valid postcode');
            newErrors.postcode = true;
            valid = false;
        } else {
            newErrors.postcode = false;
        }

        return { valid, newErrors };
    };


    const onBillingInput = (e) => {
        setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
    }
    const onShippingInput = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
            .then((stateResponse) => {
                setIndianState(stateResponse.data?.states);
            })
            .catch((error) => {
                console.log("error whiling getting all the states : ", error);
            })
    }, [])

    const handleContinueShopping = () => {
        const billingValidation = validateAddress(billingAddress, billingAddressError);
        const shippingValidation = validateAddress(shippingAddress, shippingAddressError);
        if (!billingValidation.valid) {
            setBillingAddressError(billingValidation.newErrors);
            toast.error('Please fill required fields!');
        }
        if (!shippingValidation.valid) {
            setShippingAddressError(shippingValidation.newErrors);
            toast.error('Please fill required fields!');
        }
        if (billingValidation.valid && shippingValidation.valid) {
            const obj = {
                userContact : user ? user?.email : shippingAddress?.email,
                shipping:shipping                
            }
            dispatch(OrderDetailsAction(obj));
            setState('payment');
        }
    };
    return (
        <div>
            {/* billing Address */}
            <div>
                <span style={{
                    fontSize: '130%',
                    fontWeight: 'bolder'
                }}>
                    Billing details
                </span>
                <div className='mt-4'>
                    <div className='flex w-full'>
                        <div className='flex flex-col mb-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                First Name *
                            </span>
                            <Input onChange={onBillingInput} name="firstName"
                                error={billingAddressError.firstName} defaultValue={user?.billingAddress?.firstName} />
                        </div>
                        <div className='flex flex-col mb-2 ml-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Last Name *
                            </span>
                            <Input onChange={onBillingInput} name="lastName"
                                error={billingAddressError.lastName} defaultValue={billingAddress.lastName} />
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='flex flex-col mb-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Phone Number *
                            </span>
                            <Input onChange={onBillingInput} name="phoneNumber"
                                error={billingAddressError.phoneNumber} defaultValue={billingAddress.phoneNumber} />
                        </div>
                        <div className='flex flex-col mb-2 ml-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Email Address *
                            </span>
                            <Input onChange={onBillingInput} name="email"
                                error={billingAddressError.email} value={user?.email} />
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Street Address *
                        </span>
                        <Input onChange={onBillingInput} name="streetAddress"
                            error={billingAddressError.streetAddress} defaultValue={billingAddress.streetAddress} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Apartment, suite, unit etc. *
                        </span>
                        <Input
                            onChange={onBillingInput}
                            name="apartment"
                            defaultValue={billingAddress.apartment}
                            error={billingAddressError.apartment} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Town / City *
                        </span>
                        <Input onChange={onBillingInput}
                            name="city"
                            error={billingAddressError.city} defaultValue={billingAddress.city} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Postcode / ZIP *
                        </span>
                        <Input onChange={onBillingInput} name="postcode"
                            error={billingAddressError.postcode} defaultValue={billingAddress.postcode} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            State *
                        </span>
                        <select
                            className='p-2 rounded-lg w-full outline-none'
                            style={billingAddressError.state ?
                                { border: '1px solid red' }
                                :
                                { border: '1px solid #d3d3d3' }}
                            onChange={onBillingInput}
                            name='state'>
                            <option selected>select a state</option>
                            {
                                indianState.map((item, index) => {
                                    return <option key={index}
                                        selected={item?.state_name === billingAddress?.state}>
                                        {item?.state_name}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <span style={{
                    fontSize: '130%',
                    fontWeight: 'bolder'
                }}>
                    Shipping Address
                </span>
                <div className='mt-4'>
                    <div className='flex w-full'>
                        <div className='flex flex-col mb-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                First Name *
                            </span>
                            <Input onChange={onShippingInput} name="firstName"
                                error={shippingAddressError.firstName} defaultValue={shippingAddress.firstName} />
                        </div>
                        <div className='flex flex-col mb-2 ml-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Last Name *
                            </span>
                            <Input onChange={onShippingInput} name="lastName"
                                error={shippingAddressError.lastName} defaultValue={shippingAddress.lastName} />
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='flex flex-col mb-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Phone Number *
                            </span>
                            <Input onChange={onShippingInput} name="phoneNumber"
                                error={shippingAddressError.phoneNumber} defaultValue={shippingAddress.phoneNumber} />
                        </div>
                        <div className='flex flex-col mb-2 ml-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Email Address *
                            </span>
                            <Input onChange={onShippingInput} name="email"
                                error={shippingAddressError.email} value={user?.email} />
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Street Address *
                        </span>
                        <Input onChange={onShippingInput} name="streetAddress"
                            error={shippingAddressError.streetAddress} defaultValue={shippingAddress.streetAddress} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Apartment, suite, unit etc. *
                        </span>
                        <Input
                            onChange={onShippingInput}
                            name="apartment"
                            defaultValue={shippingAddress.apartment}
                            error={shippingAddressError.apartment} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Town / City *
                        </span>
                        <Input onChange={onShippingInput}
                            name="city"
                            error={shippingAddressError.city} defaultValue={shippingAddress.city} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Postcode / ZIP *
                        </span>
                        <Input onChange={onShippingInput} name="postcode"
                            error={shippingAddressError.postcode} defaultValue={shippingAddress.postcode} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            State *
                        </span>
                        <select
                            className='p-2 rounded-lg w-full outline-none'
                            style={shippingAddressError.state ?
                                { border: '1px solid red' }
                                :
                                { border: '1px solid #d3d3d3' }}
                            onChange={onShippingInput}
                            name='state'>
                            <option selected>select a state</option>
                            {
                                indianState.map((item, index) => {
                                    return <option key={index}
                                        selected={item?.state_name === shippingAddress?.state}>
                                        {item?.state_name}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div onClick={() => navigate('/shopping-cart')}
                    className='flex uppercase transition-all cursor-pointer
                                ease-in-out duration-200 font-semibold text-[#333] hover:text-[#d0bdac]'>
                    <span className='mr-1 mt-[2px]'><FaChevronLeft /></span>
                    <span
                        style={{
                            fontSize: '90%',
                        }}>
                        Return to cart
                    </span>
                </div>
                <div>
                    <button
                        className='transition-all ease-in-out duration-200
                         bg-[#d0bdac] text-white hover:bg-[#bfae9e] uppercase outline-none'
                        style={{
                            letterSpacing: '2px',
                            lineHeight: '1.4',
                            height: '42px',
                            fontSize: '12px',
                            padding: '0 30px',
                            borderRadius: '5px',
                            fontWeight: '600'
                        }} onClick={handleContinueShopping}>
                        Continue shipping
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderAddressForm
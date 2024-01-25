import React, { useEffect, useState } from 'react'
import Input from '../../../Fields/Input';
import Button from '../../../Fields/Button';
import axios from 'axios';
import useUserState from '../../../Hooks/useUserState';
import { toast } from 'react-toastify';

const AddressForm = ({ submit, state, data }) => {
    const { user } = useUserState();
    const [indianState, setIndianState] = useState([]);
    useEffect(() => {
        axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
            .then((stateResponse) => {
                setIndianState(stateResponse.data?.states);
            })
            .catch((error) => {
                console.log("error whiling getting all the states : ", error);
            })
    }, [])
    const [billingAddress, setBillingAddress] = useState({
        userId: user?._id,
        firstName: data?.firstName || '', // Empty string instead of null
        lastName: data?.lastName || '',
        phoneNumber: data?.phoneNumber || '',
        email: data?.email || user?.email,
        streetAddress: data?.houseNumberAndStreetName || data?.streetAddress || '',
        apartment: data?.apartment || '',
        city: data?.city || '',
        postcode: data?.postcode || '',
        state: data?.state || ''
    });
    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        streetAddress: false,
        apartment: false,
        city: false,
        postcode: false,
        state: false
    })

    const handleSaveChanges = () => {        
        let valid = true;
        const newErrors = { ...error };

        if (!billingAddress.firstName) {
            newErrors.firstName = true;
            valid = false;
        } else {
            newErrors.firstName = false;
        }
        if (!billingAddress.lastName) {
            newErrors.lastName = true;
            valid = false;
        } else {
            newErrors.lastName = false;
        }
        if (!billingAddress.phoneNumber) {
            newErrors.phoneNumber = true;
            valid = false;
        } else {
            newErrors.phoneNumber = false;
        }

        if (!billingAddress.streetAddress) {
            newErrors.streetAddress = true;
            valid = false;
        } else {
            newErrors.streetAddress = false;
        }

        if (!billingAddress.city) {
            newErrors.city = true;
            valid = false;
        } else {
            newErrors.city = false;
        }

        if (!billingAddress.postcode) {
            newErrors.postcode = true;
            valid = false;
        } else {
            newErrors.postcode = false;
        }

        if (!billingAddress.state) {
            newErrors.state = true;
            valid = false;
        } else {
            newErrors.state = false;
        }

        if (valid) {
            submit(billingAddress);
        }
        else {
            setError(newErrors);
            toast.error('Fill required fields!')
        }
    }
    const onInput = (e) => {
        setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-4'>
            <div className='flex w-full'>
                <div className='flex flex-col mb-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        First Name *
                    </span>
                    <Input onChange={onInput} name="firstName"
                        error={error.firstName} defaultValue={data?.firstName} />
                </div>
                <div className='flex flex-col mb-2 ml-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Last Name *
                    </span>
                    <Input onChange={onInput} name="lastName"
                        error={error.lastName} defaultValue={data?.lastName} />
                </div>
            </div>
            <div className='flex w-full'>
                <div className='flex flex-col mb-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Phone Number *
                    </span>
                    <Input onChange={onInput} name="phoneNumber"
                        error={error.phoneNumber} defaultValue={data?.phoneNumber} />
                </div>
                <div className='flex flex-col mb-2 ml-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Email Address *
                    </span>
                    <Input onChange={onInput} name="email"
                        error={error.email} value={user?.email} defaultValue={data?.email} />
                </div>
            </div>
            {
                state === 'shipping'
                    ?
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            House number and street name *
                        </span>
                        <Input onChange={onInput} name="streetAddress"
                            error={error.streetAddress} defaultValue={data?.houseNumberAndStreetName} />
                    </div>
                    :
                    <>
                        <div className='flex flex-col mb-4'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Street Address *
                            </span>
                            <Input onChange={onInput} name="streetAddress"
                                error={error.streetAddress} defaultValue={data?.streetAddress} />
                        </div>
                    </>
            }
            <div className='flex flex-col mb-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    Apartment, suite, unit etc. (optional)
                </span>
                <Input onChange={onInput} name="apartment" defaultValue={data?.apartment} />
            </div>
            <div className='flex flex-col mb-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    Town / City *
                </span>
                <Input onChange={onInput} name="city" error={error.city} defaultValue={data?.city} />
            </div>
            <div className='flex flex-col mb-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    Postcode / ZIP *
                </span>
                <Input onChange={onInput} name="postcode"
                    error={error.postcode} defaultValue={data?.postcode} />
            </div>
            <div className='flex flex-col mb-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    State *
                </span>
                <select
                    className='p-2 rounded-lg w-full outline-none'
                    style={error.state ?
                        { border: '1px solid red' }
                        :
                        { border: '1px solid #d3d3d3' }}
                    onChange={onInput}
                    name='state'>
                    {
                        indianState.map((item, index) => {
                            return <option key={index}
                                selected={item?.state_name === data?.state}>
                                {item?.state_name}
                            </option>
                        })
                    }
                </select>
            </div>
            <div className='my-6'>
                <Button text="Save Changes" color="green" onClick={handleSaveChanges} width="40%" />
            </div>
        </div>
    )
}

export default AddressForm
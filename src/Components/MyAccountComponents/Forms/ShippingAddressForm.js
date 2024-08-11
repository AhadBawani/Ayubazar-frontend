import React from 'react'
import AddressForm from './AddressForm';
import { addShippingAddressHandler } from '../../../RequestHandlers/RequestHandler/UserRequestHandler';
import useUserState from '../../../Hooks/useUserState';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ShippingAddressForm = ({ setState }) => {
    const { user } = useUserState();
    const dispatch = useDispatch();
    const handleSubmit = (data) => {        
        addShippingAddressHandler(dispatch, data, user?._id)
            .then((response) => {                
                if (response) {
                    toast.success('Shipping address added successfully!');
                    setState(null);
                }
            });
    }
    return (
        <div className='sm:m-4 sm:p-4'>
            <p className='font-semibold text-2xl'>Shipping Address</p>
            <AddressForm submit={handleSubmit} state="shipping" data={user?.shippingAddress}/>
        </div>
    )
}

export default ShippingAddressForm;
import React from 'react';
import AddressForm from './AddressForm';
import { toast } from 'react-toastify';
import { addBillingAddressHandler } from '../../../RequestHandlers/RequestHandler/UserRequestHandler';
import { useDispatch } from 'react-redux';
import useUserState from '../../../Hooks/useUserState';

const BillingAddressForm = ({ setState }) => {
    const dispatch = useDispatch();
    const { user } = useUserState();
    const handleSubmit = (data) => {        
        addBillingAddressHandler(dispatch, data, user?._id)
            .then((response) => {
                if (response) {                    
                    setState(null);
                    toast.success('Billing address updated successfully!')
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div className='sm:m-4 sm:p-4'>
            <p className='font-semibold text-2xl'>Billing Address</p>
            <AddressForm submit={handleSubmit} setState={setState} data={user?.billingAddress} />
        </div>
    )
}

export default BillingAddressForm;
import React, { useState } from 'react';
import Input from '../../Fields/Input';
import { useDispatch } from 'react-redux';
import { ShippingAction } from '../../Redux/Actions/UserActions/UsersAction';
import useUserState from '../../Hooks/useUserState';
import states from '../../Utils/States';

const CalculateShipping = ({ setIsProcessing, setCalculateShipping }) => {
    const dispatch = useDispatch();
    const { shipping, subTotal } = useUserState();
    const [formValue, setFormValue] = useState({
        state: shipping?.state || null,
        city: shipping?.city || null,
        postcode: shipping?.postcode || null
    });

    const [formError, setFormError] = useState({
        state: false,
        city: false,
        postcode: false
    })

    const onInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }
    const handleUpdateShipping = () => {
        let valid = true;
        const newErrors = { ...formError };

        if (!formValue.state) {
            newErrors.state = true;
            valid = false;
        } else {
            newErrors.state = false;
        }

        if (!formValue.city) {
            newErrors.city = true;
            valid = false;
        } else {
            newErrors.city = false;
        }

        if (!formValue.postcode) {
            newErrors.postcode = true;
            valid = false;
        } else {
            newErrors.postcode = false;
        }

        if (valid) {
            setFormError(newErrors);
            setIsProcessing(true);
            setTimeout(() => {
                if (subTotal >= 500) {
                    dispatch(ShippingAction(
                        {
                            state: formValue.state,
                            city: formValue.city,
                            postcode: formValue.postcode,
                            charges: 'free'
                        }));
                } else {
                    if (formValue.state?.toLowerCase() === 'gujarat') {
                        dispatch(ShippingAction(
                            {
                                state: formValue.state,
                                city: formValue.city,
                                postcode: formValue.postcode,
                                charges: 50
                            }));
                    } else {
                        dispatch(ShippingAction(
                            {
                                state: formValue.state,
                                city: formValue.city,
                                postcode: formValue.postcode,
                                charges: 65
                            }));
                    }
                }
                setIsProcessing(false);
                setCalculateShipping(false);
            }, 1000)
        }
        else {
            setFormError(newErrors);
        }
    }
    return (
        <div className='flex flex-col transition-all duration-200 ease-in-out mt-4 mb-2'>
            <div className='flex flex-col mb-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    State *
                </span>
                <select
                    className='p-2 rounded-lg w-full outline-none'
                    style={formError.state ?
                        { border: '1px solid red' }
                        :
                        { border: '1px solid #d3d3d3' }}
                    onChange={onInput}
                    name='state'>
                    <option selected>select a state</option>
                    {
                        states.map((item, index) => {
                            return <option key={index}
                                selected={item?.state_name === formValue?.state}>
                                {item?.state_name}
                            </option>
                        })
                    }
                </select>
            </div>
            <div className='flex flex-col mb-3'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    City *
                </span>
                <Input
                    onChange={onInput}
                    name="city"
                    error={formError.city}
                    defaultValue={shipping?.city} />
            </div>
            <div className='flex flex-col mb-3'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    Postcode *
                </span>
                <Input
                    onChange={onInput}
                    name="postcode"
                    error={formError.postcode}
                    defaultValue={shipping?.postcode} />
            </div>
            <div>
                <button
                    style={{
                        letterSpacing: '2px',
                        lineHeight: '1.4',
                        height: '42px',
                        fontSize: '12px'
                    }}
                    className='w-[100%] uppercase font-bold bg-[#027148] hover:bg-[#013220]
                    text-white p-2 rounded-md transition-all ease-in-out duration-200'
                    onClick={handleUpdateShipping}
                >
                    UPDATE
                </button>
            </div>
        </div>
    )
}

export default CalculateShipping;
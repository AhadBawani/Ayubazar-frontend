import React, { useState } from 'react'
import Input from '../../Fields/Input';
import { addContactUsHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { toast } from 'react-toastify';
import { ImSpinner8 } from "react-icons/im";
import { validateEmail } from '../../Utils/verfiyEmail';

const ContactUsForm = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        state: '',
        message: ''
    });

    const [formError, setFormError] = useState({
        name: false,
        email: false,
        phoneNumber: false,
        city: false,
        state: false,
        message: false
    })

    const validateForm = (value, errors) => {
        let valid = true;
        const newErrors = { ...errors };

        Object.keys(value).forEach((key) => {
            if (!value[key]) {
                newErrors[key] = true;
                valid = false;
            } else {
                newErrors[key] = false;
            }
        });

        if (!validateEmail(formData.email)) {
            newErrors.email = true;
            valid = false;
            toast.error('Invalid Email!');
        } else {
            newErrors.email = false;
        }

        return { valid, newErrors };
    };

    const onInput = (e) => {
        setFormError({ ...formError, [e.target.name]: false });
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        const formValidation = validateForm(formData, formError);
        if (!formValidation.valid) {
            setFormError(formValidation.newErrors);
            toast.error('Please fill required fields!');
        }
        if (formValidation.valid) {
            setIsProcessing(true);
            const obj = {
                name: formData.name,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                city: formData.city,
                state: formData.state,
                message: formData.message
            }
            addContactUsHandler(obj)
                .then((response) => {
                    if (response) {
                        setTimeout(() => {
                            toast.success(response?.message);
                            setFormData({
                                name: '',
                                email: '',
                                phoneNumber: '',
                                city: '',
                                state: '',
                                message: ''
                            });
                            document.getElementById('name').value = '';
                            document.getElementById('phoneNumber').value = '';
                            document.getElementById('email').value = '';
                            document.getElementById('city').value = '';
                            document.getElementById('state').value = '';
                            document.getElementById('message').value = '';
                            setIsProcessing(false);
                        }, 1200)
                    }
                })
                .catch((error) => {
                    console.log('error in add contact us handler : ', error);
                })
        }
    }
    return (
        <div className='mt-6 relative'>
            {isProcessing && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                    <ImSpinner8 size={36} className="animate-spin text-black" />
                </div>
            )}
            <div className='flex flex-col mb-4'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    Name *
                </span>
                <Input onChange={onInput} name="name" error={formError.name} id="name" />
            </div>
            <div className='flex w-full'>
                <div className='flex flex-col mb-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Phone Number *
                    </span>
                    <Input
                        onChange={onInput}
                        name="phoneNumber"
                        error={formError.phoneNumber}
                        id="phoneNumber" />
                </div>
                <div className='flex flex-col mb-2 ml-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Email Address *
                    </span>
                    <Input onChange={onInput} name="email" error={formError.email} id="email" />
                </div>
            </div>
            <div className='flex w-full'>
                <div className='flex flex-col mb-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        State *
                    </span>
                    <Input onChange={onInput} name="state" error={formError.state} id="state" />
                </div>
                <div className='flex flex-col mb-2 ml-2 flex-grow'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        City *
                    </span>
                    <Input onChange={onInput} name="city" error={formError.city} id="city" />
                </div>
            </div>
            <div className='flex flex-col mb-6'>
                <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                    Message *
                </span>
                <textarea
                    id="message"
                    name="message"
                    style={formError.message ? { border: '1px solid red' } : {}}
                    onChange={onInput}
                    className="border border-gray-300 rounded px-3 py-2 w-full h-32 outline-none"
                    placeholder="Your Message"
                    required
                />
            </div>
            <div className='mt-6'>
                <button
                    style={{
                        letterSpacing: '2px',
                        lineHeight: '1.4',
                        height: '42px',
                        fontSize: '12px'
                    }}
                    className='w-[100%] uppercase font-bold bg-[#027148] 
                                hover:bg-[#013220] outline-none text-white p-2 rounded-md 
                                transition-all ease-in-out duration-200' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default ContactUsForm
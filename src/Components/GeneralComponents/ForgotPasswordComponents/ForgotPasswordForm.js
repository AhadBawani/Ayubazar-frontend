import React, { useState } from 'react'
import Input from '../../../Fields/Input';
import Button from '../../../Fields/Button';
import { toast } from 'react-toastify';
import { validateEmail } from '../../../Utils/verfiyEmail';
import { forgotPasswordHandler } from '../../../RequestHandlers/RequestHandler/UserRequestHandler';
import { AuthenticateDialogAction } from '../../../Redux/Actions/ComponentActions/ComponentActions';
import { useDispatch } from 'react-redux';
import { ImSpinner8 } from "react-icons/im";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState(false);
    const [isProcessing, setIsProccessing] = useState(false);
    const dispatch = useDispatch();

    const handleVerifyEmail = () => {
        let valid = true;
        if (!email) {
            setEmailError(true);
            toast.error('Email is required!');
            valid = false;
            return;
        }
        if (!validateEmail(email)) {
            setEmailError(true);
            toast.error('Email is invalid!');
            valid = false;
            return;
        }

        if (valid) {
            setEmailError(false);
            setIsProccessing(true);
            let obj = {
                email: email
            }
            forgotPasswordHandler(obj)
                .then((response) => {
                    if (response) {
                        setTimeout(() => {
                            setIsProccessing(false);
                            toast.success('reset link sended successfully!');
                            dispatch(AuthenticateDialogAction(false))
                        }, 800)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    const errorMessage = error?.response?.data?.message || 'an error occured';
                    if (errorMessage === 'User not found') {
                        setEmailError(true);
                    }
                    setTimeout(() => {
                        toast.error(errorMessage);
                        setIsProccessing(false);
                    }, 1000)
                })
        }
    }
    return (
        <div className='m-4 relative'>
            {isProcessing && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                    <ImSpinner8 size={36} className="animate-spin text-black" />
                </div>
            )}
            <div>
                <span className='font-semibold text-[140%]'>Forgot Password</span>
            </div>
            <div className='mt-3 text-[#999]'>
                <span>
                    Verify your login email here to get the email for forgot password.
                </span>
            </div>
            <div className='mt-3'>
                <div className='flex flex-col mb-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Email Address *
                    </span>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" error={emailError} />
                </div>
            </div>
            <div>
                <Button text="Verify Email" color="#027148" hoverColor="#013220" onClick={handleVerifyEmail} />
            </div>
        </div>
    )
}

export default ForgotPasswordForm;
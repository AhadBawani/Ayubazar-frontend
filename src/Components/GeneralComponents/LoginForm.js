import React, { useState } from 'react';
import Input from '../../Fields/Input';
import Button from '../../Fields/Button';
import { userLoginRequestHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validateEmail } from '../../Utils/verfiyEmail';
import { AuthenticateDialogAction } from '../../Redux/Actions/ComponentActions/ComponentActions';
import { ImSpinner8 } from "react-icons/im";

const LoginForm = ({ setAuthenticateState, state }) => {
    const dispatch = useDispatch();
    const loginObj = {
        email: null,
        password: null
    }
    const [userState, setUserState] = useState(loginObj);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })
    const onInput = (e) => {
        setUserState({ ...userState, [e.target.name]: e.target.value })
    }
    const handleLoginSubmit = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!userState.email) {
            newErrors.email = true;
            valid = false;
        } else {
            newErrors.email = false;
        }

        if (!validateEmail(userState.email)) {
            newErrors.email = true;
            valid = false;
            toast.error('Invalid Email!');
        } else {
            newErrors.email = false;
        }

        if (!userState.password) {
            newErrors.password = true;
            valid = false;
        } else {
            newErrors.password = false;
        }

        if (valid) {
            setIsProcessing(true);
            userLoginRequestHandler(dispatch, userState)
                .then((response) => {
                    if (response) {
                        setTimeout(() => {
                            setIsProcessing(false);
                            toast.success(response);
                            dispatch(AuthenticateDialogAction(false));
                        }, 1000)
                    }
                })
                .catch((error) => {
                    if (error) {
                        let errorMessage = error?.response?.data?.message;
                        setTimeout(() => {
                            setIsProcessing(false);
                            toast.error(errorMessage);
                            if (errorMessage === 'User not found!') {
                                newErrors.email = true;
                                setErrors(newErrors);
                            }
                            if (errorMessage === 'Incorrect Password!') {
                                newErrors.password = true;
                                setErrors(newErrors);
                            }
                        }, 1000)
                    }
                })
        } else {
            setErrors(newErrors);
        }
    }
    return (
        <>
            <div className='relative'>
                {isProcessing && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                        <ImSpinner8 size={36} className="animate-spin text-black" />
                    </div>
                )}
                <div className='flex justify-center items-center w-full'>
                    {
                        state === 'checkout'
                            ?
                            <>
                                <div className={`flex flex-col m-4 w-full`}>
                                    <div className='flex flex-col mb-6'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Email Address *
                                        </span>
                                        <Input onChange={onInput} name="email" error={errors.email} />
                                    </div>
                                    <div className='flex flex-col mb-6'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Password *
                                        </span>
                                        <Input type="password" name="password" onChange={onInput} error={errors.password} />
                                        <span className='mt-1 text-[#4D4D4D] cursor-pointer'>Forgot Password?</span>
                                    </div>
                                    <div>
                                        <Button text="Sign in to your account" color="#027148" hoverColor="#013220" onClick={handleLoginSubmit} />
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className={`flex flex-col m-4 w-full`}>
                                    <div className='flex flex-col mb-6'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Email Address *
                                        </span>
                                        <Input onChange={onInput} name="email" error={errors.email} />
                                    </div>
                                    <div className='flex flex-col mb-6'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Password *
                                        </span>
                                        <Input type="password" name="password" onChange={onInput} error={errors.password} />
                                        <span
                                            className='mt-1 text-[#4D4D4D] cursor-pointer'
                                            onClick={() => setAuthenticateState('forgot-password')}>
                                            Forgot Password?
                                        </span>
                                    </div>
                                    <div>
                                        <Button text="Sign in to your account" color="#027148" hoverColor="#013220" onClick={handleLoginSubmit} />
                                    </div>
                                    <div className='mt-3 flex justify-center items-center'>
                                        <p>Not a member? <span
                                            className='text-[#4D4D4D] cursor-pointer'
                                            onClick={() => setAuthenticateState('signup')}>
                                            Create an account
                                        </span>
                                        </p>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default LoginForm;
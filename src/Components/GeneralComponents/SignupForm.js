import React, { useState } from 'react'
import Input from '../../Fields/Input';
import Button from '../../Fields/Button';
import { userSignupRequestHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../../Utils/verfiyEmail';

const SignupForm = ({ setAuthenticateState }) => {
    const dispatch = useDispatch();
    const loginObj = {
        email: null,
        password: null
    }
    const [userState, setUserState] = useState(loginObj);
    const [errors, setErrors] = useState({
        email: false,
        password: false
    })
    const onInput = (e) => {
        setUserState({ ...userState, [e.target.name]: e.target.value })
    }    

    const handleSignupSubmit = () => {
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
            const displayName = userState.email.split('@');
            const obj = {
                email: userState.email,
                password: userState.password,
                displayName: displayName[0]
            }
            userSignupRequestHandler(dispatch, obj)
                .then((userResponse) => {
                    if (userResponse) {
                        toast.success('Signup Successfully!');
                    }
                })
                .catch((error) => {
                    if (error) {
                        let errorMessage = error?.response?.data?.message;
                        toast.error(errorMessage);
                        if (errorMessage === 'User email already exists!') {
                            newErrors.email = true;
                            setErrors(newErrors);
                        }
                    }
                })
        } else {
            setErrors(newErrors);
        }
    }
    return (
        <div className='flex flex-col m-4 w-full'>
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
            </div>
            <div>
                <Button text="Setup Account" color="#027148" hoverColor="#013220" onClick={handleSignupSubmit} />
            </div>
            <div className='mt-3 flex justify-center items-center text-sm sm:text-base'>
                <p>Already got an Account? <span
                    className='text-[#4D4D4D] cursor-pointer'
                    onClick={() => setAuthenticateState('Login')}>
                    Sign in here
                </span>
                </p>
            </div>
        </div>
    )
}

export default SignupForm;
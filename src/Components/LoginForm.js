import React, { useState } from 'react';
import Input from '../Fields/Input';
import Button from '../Fields/Button';

const LoginForm = ({ setAuthenticateState }) => {
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
    const handleLoginSubmit = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!userState.email) {
            newErrors.email = true;
            valid = false;
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
            // login logic            
        } else {
            setErrors(newErrors);
        }
    }
    return (
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
                <div className='mt-3 flex justify-center items-center'>
                    <p>Not a member? <span
                        className='text-[#4D4D4D] cursor-pointer'
                        onClick={() => setAuthenticateState('Signup')}>
                        Create an account
                    </span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoginForm;
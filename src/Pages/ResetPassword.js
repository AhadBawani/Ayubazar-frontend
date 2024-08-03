import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FooterAction, HeaderAction } from '../Redux/Actions/ComponentActions/ComponentActions';
import axios from 'axios';
import Requests from '../RequestHandlers/Requests/Requests';
import Input from '../Fields/Input';
import logo from '../Images/logo.png';
import Button from '../Fields/Button';
import { toast } from 'react-toastify';
import { resetPasswordHandler } from '../RequestHandlers/RequestHandler/UserRequestHandler';
import { ImSpinner8 } from "react-icons/im";

const ResetPassword = () => {
    const { token } = useParams();
    const [formValue, setFormValue] = useState({
        password: null,
        confirmPassword: null
    });
    const [formError, setFormError] = useState({
        password: false,
        confirmPassword: false
    })
    const [isProcessing, setIsProccessing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {

            try {
                await axios.post(Requests.VERIFY_TOKEN + token);
                dispatch(HeaderAction(false));
                dispatch(FooterAction(false));
            }
            catch (error) {
                navigate('/home');
                dispatch(HeaderAction(true));
                dispatch(FooterAction(true));
            }
        }

        if (token) {
            verifyToken();
        }
    }, [token, dispatch, navigate])

    const handleResetPassword = () => {
        let valid = true;
        const newErrors = { ...formError };

        if (!formValue.password) {
            newErrors.password = true;
            valid = false;
        } else {
            newErrors.password = false;
        }

        if (!formValue.confirmPassword) {
            newErrors.confirmPassword = true;
            valid = false;
        } else {
            newErrors.confirmPassword = false;
        }

        if (formValue.password !== formValue.confirmPassword) {
            toast.error('Password does not match!');
            newErrors.confirmPassword = true;
            newErrors.password = true;
            setFormError(newErrors);
            return;
        }

        if (valid) {
            newErrors.password = false;
            newErrors.confirmPassword = false;
            setFormError(newErrors);
            setIsProccessing(true);
            const obj = {
                newPassword: formValue.confirmPassword
            }
            resetPasswordHandler(dispatch, token, obj)
                .then((response) => {
                    if (response) {
                        setTimeout(() => {
                            navigate('/home');
                            toast.success(response?.message);
                            dispatch(HeaderAction(true));
                            dispatch(FooterAction(true));
                            setIsProccessing(false);
                        }, 1500)
                    }
                })
                .catch((error) => {
                    setTimeout(() => {
                        console.log(error);
                        setIsProccessing(false);
                    }, 1000)
                })
        }
        else {
            setFormError(newErrors);
            toast.error('Please fill required fields')
        }
    }

    const onInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <div>
                <span className='font-semibold text-[140%]'>Forgot Password</span>
            </div>
            <div className='mt-4 w-[90%] md:w-[500px] border border-[#EFEFEF] rounded-lg'>
                <div className="flex items-center justify-between">
                    <div className="flex justify-center items-center flex-grow my-4">
                        <img src={logo} alt='Ayubazar' height='180px' width='180px' />
                    </div>
                </div>
                <hr />
                <div className='mt-4 p-4 relative'>
                    {isProcessing && (
                        <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                            <ImSpinner8 size={36} className="animate-spin text-black" />
                        </div>
                    )}
                    <div className='flex flex-col mb-6'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Password *
                        </span>
                        <Input type="password" name="password" onChange={onInput} error={formError.password} />
                    </div>
                    <div className='flex flex-col mb-6'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Confirm Password *
                        </span>
                        <Input type="password" name="confirmPassword" onChange={onInput} error={formError.confirmPassword} />
                    </div>
                    <div>
                        <Button
                            text="Reset Password"
                            color="#027148"
                            hoverColor="#013220"
                            onClick={handleResetPassword} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
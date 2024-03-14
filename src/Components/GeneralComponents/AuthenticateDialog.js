import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthenticateDialogAction } from '../../Redux/Actions/ComponentActions/ComponentActions';
import logo from '../../Images/logo.png';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { IoMdClose } from "react-icons/io";
import ForgotPasswordForm from './ForgotPasswordComponents/ForgotPasswordForm';

const AuthenticateDialog = () => {
  const dispatch = useDispatch();
  const [authenticateState, setAuthenticateState] = useState('Login');
  const wrapperRef = useRef();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // Click outside the component
        dispatch(AuthenticateDialogAction(false));
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dispatch]);
  return (
    <div className="lg:w-[500px]" ref={wrapperRef}>
      {/* dialog header */}
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center flex-grow ml-12 mt-3">
          <img src={logo} alt='Ayubazar' height='180px' width='180px' />
        </div>
        <span className="relative">
          <IoMdClose
            className="w-7 h-7 cursor-pointer rounded-full hover:bg-gray-200 m-2"
            onClick={() => dispatch(AuthenticateDialogAction(false))} />
        </span>
      </div>
      <div className="border-b border-gray-300 my-4"></div>
      <div>
        {
          authenticateState === 'forgot-password'
            ?
            <ForgotPasswordForm setAuthenticateState={setAuthenticateState} />
            :
            <>
              <div className='flex justify-center items-center'>
                <span className='font-semibold text-[140%]'>Great to see you here !</span>
              </div>
              {/* login form */}
              <div className='flex justify-center items-center w-full'>

                {
                  authenticateState === "Login"
                  &&
                  <LoginForm setAuthenticateState={setAuthenticateState} />
                }
                {
                  authenticateState === 'signup'
                  &&
                  <SignupForm setAuthenticateState={setAuthenticateState} />
                }
              </div>
            </>
        }

      </div>
    </div>
  )
}

export default AuthenticateDialog;
import React, { useEffect } from 'react';
import { PiWarningOctagonFill } from "react-icons/pi";
import { useLocation, useNavigate } from 'react-router-dom';

const Failure = () => {
     const navigate = useNavigate();
     const location = useLocation();

     useEffect(() => {
          const queryParams = new URLSearchParams(location.search);
          if (!queryParams.get('redirected')) {
               navigate('/home');
          }
     }, [location, navigate]);
     return (
          <div className='m-4 p-4 py-24'>
               <div className='flex flex-col justify-center items-center text-[#e53e3e]'>
                    <PiWarningOctagonFill size={96} className='mb-4' />
                    <div className='font-bold text-4xl'>
                         Payment Failed
                    </div>
                    <div className='mt-4 text-center text-lg'>
                         Unfortunately, we were unable to process your payment. Please check your payment details and try again.
                    </div>
               </div>
               <div className='mt-4 text-center text-gray-600'>
                    If you continue to experience issues, please contact our support team for assistance.
               </div>
               <div className='mt-8 flex flex-col sm:flex-row
                justify-center items-center gap-4'>
                    <div>
                         <button
                              className='px-6 py-3 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition duration-200'
                              onClick={() => navigate('/home')}
                         >
                              Home Page
                         </button>
                    </div>
                    <div>
                         <button
                              className='px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-200'
                              onClick={() => navigate('/contact-us')}
                         >
                              Contact Page
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default Failure;
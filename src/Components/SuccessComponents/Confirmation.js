import React from 'react';
import './Styles/Confirmation.css';
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Button from '../../Fields/Button';

const Confirmation = () => {     
     const navigate = useNavigate();
     const handleBackToShopping = () => {
          navigate('/');
     }
     return (
          <div className="confirmation-container">
               <div className="confirmation-box">
                    <div className='flex justify-center'>
                         <span><FaCheckCircle size={140} className='text-green-700' /></span>
                    </div>
                    <div className='md:text-2xl font-semibold mt-2'>
                         <h2>Your order has been placed!</h2>
                         <p>Thank you for shopping with us.</p>
                    </div>
                    <div className='mt-4'>
                         <Button text='Back to shopping' onClick={handleBackToShopping} />
                    </div>
               </div>
          </div>
     );
};

export default Confirmation;
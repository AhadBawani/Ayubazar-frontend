import React, { useEffect, useState } from 'react'
import ShoppingPageProductDetails from './ShoppingPageProductDetails';
import ShoppingCartTotal from './ShoppingCartTotal';
import Footer from '../GeneralComponents/Footer';
import useUserState from '../../Hooks/useUserState';
import { useNavigate } from 'react-router-dom';

const ShoppingCartBody = () => {
    const [isProcessing, setIsProcessing] = useState(false);    
    const { usercart } = useUserState();
    const navigate = useNavigate();

    useEffect(() => {
        if (usercart?.length === 0) {
            navigate('/home');
        }
    }, [usercart, navigate])
    return (
        <div>
            <div className='block md:flex justify-between mt-12 m-4 p-4'>
                <div className='w-full md:w-2/3'>
                    <ShoppingPageProductDetails
                        isProcessing={isProcessing}
                        setIsProcessing={setIsProcessing}
                        />
                </div>
                <div className='w-full mt-6 md:mt-0 md:w-1/3 md:ml-4'>
                    <ShoppingCartTotal isProcessing={isProcessing} setIsProcessing={setIsProcessing}/>
                </div>
            </div>
            <div className='mt-4'>
                <Footer />
            </div>
        </div>
    )
}

export default ShoppingCartBody;
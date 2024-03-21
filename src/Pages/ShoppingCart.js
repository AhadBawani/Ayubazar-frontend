import React, { useEffect } from 'react'
import Header from '../Components/ShoppingCartComponents/Header';
import ShoppingCartBody from '../Components/ShoppingCartComponents/ShoppingCartBody';
import useUserState from '../Hooks/useUserState';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const { usercart } = useUserState();
    const navigate = useNavigate();
    useEffect(() => {
        if (usercart?.length === 0) {
            navigate('/');
        }
    }, [usercart, navigate])
    return (
        <>
            <div className='hidden sm:block'>
                <Header />
            </div>
            <div>
                <ShoppingCartBody />
            </div>
        </>
    )
}

export default ShoppingCart;
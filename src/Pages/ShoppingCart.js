import React from 'react'
import Header from '../Components/ShoppingCartComponents/Header';
import ShoppingCartBody from '../Components/ShoppingCartComponents/ShoppingCartBody';

const ShoppingCart = () => {
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
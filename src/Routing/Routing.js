import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Checkout from '../Pages/Checkout';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Checkout' element={<Checkout />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;
import React from 'react'
import Header from '../Components/Header';
import useComponentState from '../Utils/useComponentState';
import AuthenticateDialog from '../Components/AuthenticateDialog';
import Sidebar from '../Components/Sidebar';
import { useDispatch } from 'react-redux';
import ProductCarousel from '../Components/ProductCarousel';

const Home = () => {
    const componentState = useComponentState();
    const dispatch = useDispatch();
    return (
        <>
            <div className={"fixed top-0 left-0 w-full bg-white shadow-md z-50"}>
                <Header />
            </div>
            <div className='mt-20'>
                <ProductCarousel />
            </div>
            {
                componentState?.authenticate
                &&
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white rounded-md h-auto w-auto">
                        <AuthenticateDialog />
                    </div>
                </div>
            }
            {
                componentState?.cart &&
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                    <Sidebar dispatch={dispatch} />
                </div>
            }
        </>
    )
}

export default Home;
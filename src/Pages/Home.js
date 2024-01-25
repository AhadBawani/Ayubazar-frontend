import React, { useEffect } from 'react'
import useComponentState from '../Hooks/useComponentState';
import AuthenticateDialog from '../Components/AuthenticateDialog';
import Sidebar from '../Components/Sidebar';
import { useDispatch } from 'react-redux';
import { getAllCompanyHandler } from '../RequestHandlers/RequestHandler/CompanyRequestHandler';
import { getAllProductsHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import ShowProducts from '../Components/ShowProducts';
// import ProductCarousel from '../Components/ProductCarousel';

const Home = () => {
    const componentState = useComponentState();
    const dispatch = useDispatch();
    useEffect(() => {
        getAllCompanyHandler(dispatch);
        getAllProductsHandler(dispatch);
    }, [dispatch])
    return (
        <>            
            <div className='mt-36'>
                <ShowProducts />
            </div>
            {/* <div className='mt-20'>
                <ProductCarousel />
            </div> */}
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
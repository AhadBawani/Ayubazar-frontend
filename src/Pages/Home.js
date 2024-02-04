import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllCompanyHandler } from '../RequestHandlers/RequestHandler/CompanyRequestHandler';
import { getAllProductsHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import ShowProducts from '../Components/HomePageComponents/ShowProducts';
// import ProductCarousel from '../Components/ProductCarousel';

const Home = () => {    
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
        </>
    )
}

export default Home;
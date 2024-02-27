import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllCompanyHandler } from '../RequestHandlers/RequestHandler/CompanyRequestHandler';
import { getAllProductsHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import ShowProducts from '../Components/HomePageComponents/ShowProducts';
import OfferComponent from '../Components/HomePageComponents/OfferComponents/OfferComponent';
import useProductsState from '../Hooks/useProductsState';
// import ProductCarousel from '../Components/ProductCarousel';

const Home = () => {
    const dispatch = useDispatch();
    const { discount } = useProductsState();
    useEffect(() => {
        getAllCompanyHandler(dispatch);
        getAllProductsHandler(dispatch);
    }, [dispatch])
    return (
        <>
            {
                discount
                &&
                <div>
                    <OfferComponent />
                </div>
            }
            <div>
                <ShowProducts />
            </div>
            {/* <div className='mt-20'>
                <ProductCarousel />
            </div> */}
        </>
    )
}

export default Home;
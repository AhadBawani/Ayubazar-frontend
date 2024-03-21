import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllCompanyHandler } from '../RequestHandlers/RequestHandler/CompanyRequestHandler';
import { getAllProductsHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import ShowProducts from '../Components/HomePageComponents/ShowProducts';
import OfferComponent from '../Components/HomePageComponents/OfferComponents/OfferComponent';
import useProductsState from '../Hooks/useProductsState';
import ProductCarousel from '../Components/HomePageComponents/ProductCarousel';
import FilterProduct from '../Components/HomePageComponents/FilteredProductsComponents/FilterProduct';

const Home = () => {
    const dispatch = useDispatch();
    const { discount, filterProduct } = useProductsState();
    useEffect(() => {
        getAllCompanyHandler(dispatch);
        getAllProductsHandler(dispatch);
    }, [dispatch])
    return (
        <>
            <div>
                <ProductCarousel />
            </div>
            <div id='filterProduct'></div>
            {
                discount
                &&
                <div className='mt-6'>
                    <OfferComponent />
                </div>
            }
            {
                filterProduct
                &&
                <div>
                    <FilterProduct filterProduct={filterProduct} />
                </div>
            }
            <div>
                <ShowProducts />
            </div>
        </>
    )
}

export default Home;
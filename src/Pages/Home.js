import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCompanyHandler } from '../RequestHandlers/RequestHandler/CompanyRequestHandler';
import { getAllProductsHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import ShowProducts from '../Components/HomePageComponents/ShowProducts';
import OfferComponent from '../Components/HomePageComponents/OfferComponents/OfferComponent';
import useProductsState from '../Hooks/useProductsState';
import ProductCarousel from '../Components/HomePageComponents/ProductCarousel';
import FilterProduct from '../Components/HomePageComponents/FilteredProductsComponents/FilterProduct';
import { FooterAction, HeaderAction } from '../Redux/Actions/ComponentActions/ComponentActions';
import { CodChargesAction } from '../Redux/Actions/UserActions/UsersAction';
import { IoChatbubblesOutline } from 'react-icons/io5'; // Import the chat bubble icon
import ProductEnquiry from '../Components/Forms/ProductEnquiry';
import CompanyCarousel from '../Components/GeneralComponents/CompanyCarousel';

const Home = () => {
    const dispatch = useDispatch();
    const { discount, filterProduct } = useProductsState();
    useEffect(() => {
        getAllCompanyHandler(dispatch);
        getAllProductsHandler(dispatch);
        dispatch(CodChargesAction(null));
        HeaderAction(true);
        FooterAction(true);
    }, [dispatch])
    const handleChat = () => {
        const link = 'https://api.whatsapp.com/send/?phone=919428560666&text=Hi!&type=phone_number&app_absent=0';
        window.open(link, '_blank');
    }
    return (
        <>
            <div>
                <ProductCarousel />
            </div>
            <div id='filterProduct'></div>
            {
                discount &&
                <div className='mt-6'>
                    <OfferComponent />
                </div>
            }
            {
                filterProduct &&
                <div>
                    <FilterProduct filterProduct={filterProduct} />
                </div>
            }
            <div>
                <ShowProducts />
            </div>
            <div>
                <CompanyCarousel />
            </div>
            <div className='flex justify-center items-center'>
                <ProductEnquiry />
            </div>
            {/* Icon at the bottom right corner */}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: '9999',
                backgroundColor: '#03A84E',
                borderRadius: '50%',
                padding: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
            }} onClick={handleChat}>
                <IoChatbubblesOutline size={24} color='#FFFFFF' />
            </div>
        </>
    );
}

export default Home;
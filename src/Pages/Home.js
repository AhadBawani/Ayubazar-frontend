import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCompanyHandler } from '../RequestHandlers/RequestHandler/CompanyRequestHandler';
import { getAllProductsHandler, getBestSellingProductsHandler, getLatestProductsHandler, getNarayaniProductHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import OfferComponent from '../Components/HomePageComponents/OfferComponents/OfferComponent';
import useProductsState from '../Hooks/useProductsState';
import ProductCarousel from '../Components/HomePageComponents/ProductCarousel';
import { FooterAction, HeaderAction } from '../Redux/Actions/ComponentActions/ComponentActions';
import { CodChargesAction } from '../Redux/Actions/UserActions/UsersAction';
import { IoChatbubblesOutline } from 'react-icons/io5'; // Import the chat bubble icon
import CompanyCarousel from '../Components/GeneralComponents/CompanyCarousel';
import BestSellingProduct from './BestSellingProduct';
import LatestProducts from '../Components/HomePageComponents/LatestProducts';
import NarayaniProducts from '../Components/HomePageComponents/NarayaniProducts';

const Home = () => {
    const dispatch = useDispatch();
    const { discount } = useProductsState();
    useEffect(() => {
        getAllCompanyHandler(dispatch);
        getAllProductsHandler(dispatch);
        getBestSellingProductsHandler(dispatch);
        getLatestProductsHandler(dispatch);
        getNarayaniProductHandler(dispatch);
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
            {
                discount &&
                <div className='mt-6'>
                    <OfferComponent />
                </div>
            }            
            <div>
                <BestSellingProduct />
            </div>
            <div>
                <LatestProducts />
            </div>
            <div>
                <NarayaniProducts />
            </div>
            <div>
                <CompanyCarousel />
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
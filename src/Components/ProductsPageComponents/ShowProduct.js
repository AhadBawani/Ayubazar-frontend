import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import ProductDetail from './ProductDetail';
import ProductImage from './ProductImage';
import DescriptionAndReview from './DescriptionAndReview';
import Footer from '../GeneralComponents/Footer';


const ShowProduct = ({ product }) => {
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <>
            {
                isMobile
                    ?
                    <>
                        <div className='flex flex-col w-full'>
                            <div>
                                <ProductImage product={product} />
                            </div>

                        </div>
                    </>
                    :
                    <>
                        <div className='bg-[#F8F8F8]'>
                            <div className='flex m-4 p-4 ml-24 mt-32 '>
                                <ProductImage product={product} />
                                <div className='ml-4'>
                                    <ProductDetail product={product} dispatch={dispatch} />
                                </div>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <DescriptionAndReview product={product} />
                        </div>
                        <div>
                            <Footer />
                        </div>
                    </>
            }
        </>
    )
}

export default ShowProduct;
import React from 'react'
import useProductsState from '../../Hooks/useProductsState';
import { useDispatch } from 'react-redux';
import ProductsCard from './ProductsCard';
import './Styles/ShowProducts.css';

const ShowProducts = () => {
    const { defaultProducts } = useProductsState() || [];
    const dispatch = useDispatch();
    return (
        <div className='p-2 m-2 sm:m-4 sm:p-4'>
            {
                defaultProducts?.map((item, index) => {
                    return <div key={index} className='mb-8'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='flex justify-between items-center'>
                                <span className='text-[rgb(51,51,51)] text-2xl font-bold'>
                                    {item?.companyName}'s Products
                                </span>
                            </div>
                            <img src='https://www.neelayurvedics.com/wp-content/themes/elessi-theme/assets/images/hr-type-baby.png'
                                alt='Ayubazar' className='my-4' />
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6'>
                            {
                                item?.products?.slice(0, 5).map((item) => {
                                    return <div key={item?._id}>
                                        <ProductsCard product={item} dispatch={dispatch} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default ShowProducts;
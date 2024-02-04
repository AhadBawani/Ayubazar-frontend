import React from 'react'
import useProductsState from '../../Hooks/useProductsState';
import ProductsCard from './ProductsCard';
import { useDispatch } from 'react-redux';

const ShowProducts = () => {
    const { products } = useProductsState() || [];
    const dispatch = useDispatch();
    return (
        <div className='m-4 p-4'>
            <div className='flex flex-col justify-center items-center'>
                <span className='text-[rgb(51,51,51)] text-2xl' style={{ fontWeight: 'bolder' }}>Neel's Pure Herbal Powders</span>
                <img src='https://www.neelayurvedics.com/wp-content/themes/elessi-theme/assets/images/hr-type-baby.png'
                    alt='Ayubazar' className='my-4' />
            </div>
            <div className='grid grid-cols-5 gap-4'>
                {
                    products.map((item, index) => {
                        return <>
                            <div>
                                <ProductsCard product={item} dispatch={dispatch} />
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    )
}

export default ShowProducts;
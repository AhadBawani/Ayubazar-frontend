import React from 'react'
import useProductsState from '../../Hooks/useProductsState';
import { useDispatch } from 'react-redux';
import ProductsCard from './ProductsCard';

const ShowProducts = () => {
    const { products } = useProductsState() || [];
    const dispatch = useDispatch();
    return (
        <div className='p-2 m-2 sm:m-4 sm:p-4'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-between items-center'>
                    <span className='text-[rgb(51,51,51)] text-2xl font-bold'>
                        Neel's Pure Herbal Powders
                    </span>
                </div>
                <img src='https://www.neelayurvedics.com/wp-content/themes/elessi-theme/assets/images/hr-type-baby.png'
                    alt='Ayubazar' className='my-4' />
            </div>
            <div className='flex space-x-6'>
                {
                    products.map((item) => {
                        return <div key={item?._id}>
                            <ProductsCard product={item} dispatch={dispatch} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ShowProducts;
import React from 'react'
import useProductsState from '../Hooks/useProductsState';
import ProductsCard from '../Components/HomePageComponents/ProductsCard';
import { useDispatch } from 'react-redux';

const SearchedProducts = () => {
     const { searchedProduct } = useProductsState();
     const dispatch = useDispatch();

     return (
          <div className='md:mt-52 md:m-24 p-4 flex flex-col md:flex-row'>
               <div className='bg-[#F8F6F3] w-full md:w-1/4 p-3'>
                    <span className='text-xl font-semibold'>Categories</span>
                    <div className='mt-4'>
                         {
                              searchedProduct?.categories?.map((category, index) => {
                                   return <>
                                        <div key={index} className='my-4'>
                                             <input type='checkbox' />
                                             <label className='ml-2'>{category?.category}</label>
                                        </div>
                                   </>
                              })
                         }
                    </div>
               </div>
               <div className='w-full md:w-3/4 md:ml-6 mt-4 md:mt-0'>
                    <div className='mb-8'>
                         <span className='text-[#8BC34A] font-bold text-2xl'>
                              {searchedProduct?.companyName} Products
                         </span>
                    </div>
                    <div>
                         Showing all {searchedProduct?.products?.length} results
                    </div>
                    <div className='mt-8'>
                         <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
                              {
                                   searchedProduct?.products?.map((item) => {
                                        return <div key={item?._id}>
                                             <ProductsCard product={item} dispatch={dispatch} />
                                        </div>
                                   })
                              }
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default SearchedProducts;
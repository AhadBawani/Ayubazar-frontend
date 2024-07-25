import React, { useState } from 'react';
import useProductsState from '../Hooks/useProductsState';
import ProductsCard from '../Components/HomePageComponents/ProductsCard';
import { useDispatch } from 'react-redux';
import CategoriesCheckBoxes from '../Components/SearchedProductComponents/CategoriesCheckBoxes';

const SearchedProducts = () => {
     const { searchedProduct } = useProductsState();
     const [filteredProduct, setFilteredProduct] = useState(null);
     const dispatch = useDispatch();

     // Determine which products to display
     const productsToDisplay = filteredProduct !== null ? filteredProduct : searchedProduct?.products;

     return (
          <div className='md:mt-52 md:m-24 p-4 flex flex-col md:flex-row'>
               <div className='bg-[#F8F6F3] w-full md:w-1/4 p-3'>
                    <span className='text-xl font-semibold'>Categories</span>
                    <div className='mt-4'>
                         <CategoriesCheckBoxes
                              searchedProduct={searchedProduct}
                              setFilteredProduct={setFilteredProduct}
                         />
                    </div>
               </div>
               <div className='w-full md:w-3/4 md:ml-6 mt-4 md:mt-0'>
                    <div className='mb-8'>
                         <span className='text-[#8BC34A] font-bold text-2xl'>
                              {searchedProduct?.companyName} Products
                         </span>
                    </div>
                    <div>
                         Showing all {productsToDisplay?.length} results
                    </div>
                    <div className='mt-8'>
                         <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
                              {
                                   (filteredProduct && filteredProduct.length === 0)
                                        ? <div><span>No Product Found!</span></div>
                                        : productsToDisplay?.map((item) => (
                                             <div key={item?._id}>
                                                  <ProductsCard product={item} dispatch={dispatch} />
                                             </div>
                                        ))
                              }
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default SearchedProducts;
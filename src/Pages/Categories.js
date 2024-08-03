import React, { useEffect, useState } from 'react'
import useProductsState from '../Hooks/useProductsState'
import { getAllCategoriesHandler, getCategoryDetailHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import { useDispatch } from 'react-redux';
import ProductsCard from '../Components/HomePageComponents/ProductsCard';
import { ImSpinner8 } from 'react-icons/im';
import { SearchedProductAction } from '../Redux/Actions/ProductsActions/ProductsActions';

const Categories = () => {
     const { categories, searchedProduct } = useProductsState();
     const dispatch = useDispatch();
     const [data, setData] = useState();
     const [isProcessing, setIsProcessing] = useState(false);
     const [selectedCategories, setSelectedCategories] = useState([]);
     const [subCategories, setSubCategories] = useState([]);     
     const [defaultAdded, setDefaultAdded] = useState(false);
     const [filtered, setFiltered] = useState(false);
     const [filteredProduct, setFilteredProduct] = useState([]);
     const maxVisibleItems = 7;
     const itemHeight = 40;
     const isScrollable = data?.subCategories.length > maxVisibleItems;
     const containerHeight = isScrollable ? `${maxVisibleItems * itemHeight}px` : 'auto';

     useEffect(() => {
          let category = sessionStorage.getItem('category');
          if (category) {
               dispatch(SearchedProductAction(JSON.parse(category)));
               getAllCategoriesHandler(dispatch);
          }
     }, [dispatch])

     useEffect(() => {
          getCategoryDetailHandler(searchedProduct?._id)
               .then((response) => {
                    setData(response);
                    setSubCategories(response?.subCategories);
               })
               .catch((error) => {
                    console.log('error in getting catgory handler : ', error);
               })
     }, [dispatch, searchedProduct])
     const handleCategoryChange = async (event, category) => {
          setFiltered(true);
          setIsProcessing(true);
          if (event.target.checked) {
               setSelectedCategories((prevSelected) => [...prevSelected, category._id]);
               getCategoryDetailHandler(category?._id)
                    .then((response) => {
                         console.log('request response : ', response?.subCategories);
                         setSubCategories(prevSubCategories => [...prevSubCategories, ...response?.subCategories]);
                         if (!defaultAdded) {
                              setFilteredProduct(prevProducts =>
                                   [...prevProducts, ...data?.products, ...response?.products]);
                              setIsProcessing(false);
                              setDefaultAdded(true);
                         }
                         else {
                              setFilteredProduct(prevProducts =>
                                   [...prevProducts, ...response?.products]);
                              setIsProcessing(false);
                         }
                    })
          } else {
               setSelectedCategories((prevSelected) =>
                    prevSelected.filter((id) => id !== category._id)
               );
               getCategoryDetailHandler(category?._id)
                    .then((response) => {
                         const { products } = response;
                         const deselectSubCategory = response?.subCategories;
                         console.log('deselected sub : ', deselectSubCategory);
                         const arr = filteredProduct.filter(
                              (element) => !products.some(
                                   (deselectedProduct) => deselectedProduct._id === element._id
                              )
                         );
                         console.log('sub : ', subCategories);
                         const filteredSubCategories = subCategories.filter(
                              (element) => !deselectSubCategory.some(
                                   (deselectedProduct) => deselectedProduct?.subCategory._id === element?.subCategory._id
                              )
                         );
                         console.log('filtered : ', filteredSubCategories);
                         setFilteredProduct(arr);
                         setSubCategories(filteredSubCategories);
                         setIsProcessing(false);
                    });
          }
     };
     const handleSubCategoryChange = (event, subCategoryId) => {
          if (event.target.checked) {
               setFiltered(true);
               const subCategoryProducts = data?.subCategories
                    .find(item => item.subCategory._id === subCategoryId)?.products || [];
               setFilteredProduct(prevProducts => [...prevProducts, ...subCategoryProducts]);               
          } else {
               const deselectSubCategoryProducts = data?.subCategories
                    .find(item => item.subCategory._id === subCategoryId)?.products || [];
               const updatedFilteredProducts = filteredProduct.filter(
                    product => !deselectSubCategoryProducts.some(deselectedProduct => deselectedProduct._id === product._id)
               );
               setFilteredProduct(updatedFilteredProducts);               
          }
     }
     return (
          <div className='m-4 p-12 flex'>
               <div className='w-1/4'>
                    <div className='mb-4'>
                         <span className='text-xl font-semibold'>Sub Categories</span>
                         <div
                              className={`p-2 rounded-lg shadow-2xl ${isScrollable ? 'overflow-y-scroll' : ''} bg-[#F8F6F3]`}
                              style={{ height: containerHeight }}
                         >
                              {
                                   subCategories?.length > 0 && subCategories?.map((item, index) => {
                                        const checkboxId = `sub-category-checkbox-${index}`;
                                        return (
                                             <div key={index} className='flex my-2'>
                                                  <input
                                                       type='checkbox'
                                                       id={checkboxId}
                                                       className='cursor-pointer outline-none'
                                                       onChange={(e) => handleSubCategoryChange(e, item?.subCategory?._id)}
                                                  />
                                                  <label htmlFor={checkboxId} className='ml-2 text-[#434343] hover:text-[#d0bdac] transition-all ease-in-out duration-1000 font-semibold text-base cursor-pointer'>
                                                       {item?.subCategory?.subCategory} ({item?.products?.length})
                                                  </label>
                                             </div>
                                        );
                                   })
                              }
                         </div>
                    </div>
                    <div>
                         <span className='text-xl font-semibold'>Categories</span>
                         <div className='p-2 rounded-lg h-[240px] overflow-y-scroll shadow-2xl bg-[#F8F6F3]'>
                              {
                                   categories?.map((item, index) => {
                                        const checkboxId = `category-checkbox-${index}`;
                                        const checked = selectedCategories?.filter((cat) => cat === item?._id)?.length > 0;
                                        return (
                                             <div className='flex my-2' key={checkboxId}>
                                                  <input
                                                       type='checkbox'
                                                       id={checkboxId}
                                                       className='cursor-pointer outline-none'
                                                       defaultChecked={item?._id === searchedProduct?._id || checked}
                                                       onChange={(e) => handleCategoryChange(e, item)}
                                                  />
                                                  <span
                                                       htmlFor={checkboxId}
                                                       className='ml-2 text-[#434343] hover:text-[#d0bdac] 
                                                            transition-all ease-in-out duration-1000 
                                                            font-semibold text-base cursor-pointer'
                                                       onClick={() => {
                                                            const checkbox = document.getElementById(checkboxId);
                                                            checkbox.checked = !checkbox.checked;
                                                            handleCategoryChange({ target: { checked: checkbox.checked } }, item); // Call the change handler
                                                       }}
                                                  >
                                                       {item?.category}
                                                  </span>
                                             </div>
                                        );
                                   })
                              }
                         </div>
                    </div>
               </div>
               <div className='ml-4 grid grid-cols-4 gap-6'>
                    {isProcessing && (
                         <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-40">
                              <ImSpinner8 size={36} className="animate-spin text-black" />
                         </div>
                    )}
                    {
                         filtered
                              ?
                              <>
                                   {
                                        filteredProduct?.length > 0
                                             ?
                                             <>
                                                  {
                                                       filteredProduct?.map((product, index) => {
                                                            return <>
                                                                 <ProductsCard product={product} key={index} dispatch={dispatch} />
                                                            </>
                                                       })
                                                  }
                                             </>
                                             :
                                             <>
                                                  {<div className='text-lg text-[#333333]'>
                                                       <span>No products found!</span>
                                                  </div>}
                                             </>
                                   }
                              </>
                              :
                              <>
                                   {
                                        data && data?.products?.length > 0
                                             ?
                                             <>
                                                  {
                                                       data?.products?.map((item, index) => {
                                                            return <>
                                                                 <ProductsCard product={item} key={index} dispatch={dispatch} />
                                                            </>
                                                       })
                                                  }
                                             </>
                                             :
                                             <>
                                                  {<div className='text-lg text-[#333333]'>
                                                       <span>No products found!</span>
                                                  </div>}
                                             </>
                                   }
                              </>
                    }
               </div>
          </div>
     )
}

export default Categories
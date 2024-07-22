import React, { useEffect, useState } from 'react';

const CategoriesCheckBoxes = ({ searchedProduct, setFilteredProduct }) => {
     const [selectedCategories, setSelectedCategories] = useState([]);

     const handleCategoryChange = (event, category) => {
          if (event.target.checked) {
               setSelectedCategories((prevSelected) => [...prevSelected, category._id]);
          } else {
               setSelectedCategories((prevSelected) =>
                    prevSelected.filter((id) => id !== category._id)
               );
          }
     };

     useEffect(() => {
          if (selectedCategories.length === 0) {
               setFilteredProduct(null);  // No categories selected, display all products
          } else {
               const filteredProducts = searchedProduct?.products?.filter((product) =>
                    selectedCategories.includes(product?.productCategory)
               );
               setFilteredProduct(filteredProducts);
          }
     }, [selectedCategories, searchedProduct, setFilteredProduct]);

     return (
          <div className='mt-4'>
               {searchedProduct?.categories?.map((category, index) => {
                    const checkboxId = `category-checkbox-${index}`;
                    return (
                         <div key={index} className='my-4 cursor-pointer'>
                              <input
                                   type='checkbox'
                                   id={checkboxId}
                                   onChange={(e) => handleCategoryChange(e, category)}
                              />
                              <label className='ml-2' htmlFor={checkboxId}>
                                   {category?.category}
                              </label>
                         </div>
                    );
               })}
          </div>
     );
};

export default CategoriesCheckBoxes;

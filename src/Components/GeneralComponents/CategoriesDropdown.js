import React, { useState } from 'react';

const CategoryDropdown = ({ categories, handleShowProduct }) => {
     return (
          <>
               {
                    categories?.length > 24
                         ?
                         <>
                              <div
                                   className="absolute left-0 top-44 mt-2 p-4 bg-white 
                                   shadow-lg rounded-md z-50"
                                   style={{ width: '100%', height: '300px', overflowY: 'scroll' }}
                              >
                                   <div className="grid grid-cols-6 gap-4">
                                        {categories?.map((item, index) => (
                                             <div key={index} className="p-1">
                                                  <span
                                                       className="transition-all ease-in-out duration-300 
                                                       cursor-pointer font-bold border-black hover:border-b-2"
                                                       onClick={() => handleShowProduct(item)}
                                                  >
                                                       {item?.category}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </>
                         :
                         <>
                              <div
                                   className="absolute left-0 top-44 mt-2 p-4 bg-white 
                                   shadow-lg rounded-md z-50"
                                   style={{ width: '100%' }} // Adjust height as needed
                              >
                                   <div className="grid grid-cols-6 gap-4">
                                        {categories?.map((item, index) => (
                                             <div key={index} className="p-1">
                                                  <span
                                                       className="transition-all ease-in-out duration-300 
                                                       cursor-pointer font-bold border-black hover:border-b-2"
                                                       onClick={() => handleShowProduct(item)}
                                                  >
                                                       {item?.category}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </>
               }
          </>
     );
};

export default CategoryDropdown;

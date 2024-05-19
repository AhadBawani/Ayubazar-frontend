import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CompanyCarousel = () => {
     const company = useSelector((state) => state?.Company?.company) || [];
     const [currentIndex, setCurrentIndex] = useState(0);

     const nextCompany = () => {
          setCurrentIndex((prevIndex) => (prevIndex === company.length - 1 ? 0 : prevIndex + 1));
     };

     const prevCompany = () => {
          setCurrentIndex((prevIndex) => (prevIndex === 0 ? company.length - 1 : prevIndex - 1));
     };

     return (
          <div className="max-w-screen-xl mx-auto p-4">
               <div className='flex justify-center items-center mb-4'>
                    <span className='text-4xl font-bold'>Featured Companies</span>
               </div>
               <div className="relative overflow-hidden rounded-lg">
                    <button
                         onClick={prevCompany}
                         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-25 text-white p-2 rounded-full"
                    >
                         &#8249;
                    </button>
                    <button
                         onClick={nextCompany}
                         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-25 text-white p-2 rounded-full"
                    >
                         &#8250;
                    </button>
                    <div className="flex transition-transform duration-500 ease-in-out transform" 
                    style={{ width: `${company.length * 100}%`, marginLeft: `-${currentIndex * 100}%` }}>
                         {company.map((item, index) => (
                              <div key={index} className="w-full flex-shrink-0">
                                   <div className="flex justify-center items-center">
                                        <img src={item.companyImage}
                                             alt={item.companyName}
                                             className="h-40 w-auto" />
                                   </div>
                                   <div className="text-center text-xl font-semibold mt-2">
                                        {item.companyName}
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
};

export default CompanyCarousel;
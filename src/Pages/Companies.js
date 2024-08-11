import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchedProductAction } from '../Redux/Actions/ProductsActions/ProductsActions';
import CompanyCard from '../Components/CompaniesPageComponents/CompanyCard';
import Input from '../Fields/Input';

const Companies = () => {
     const companies = useSelector((state) => state?.Company?.company) || [];
     const [searchedCompany, setSearchedCompany] = useState([]);
     const [isSearch, setIsSearch] = useState(false);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const handleShowCompanyProduct = (data) => {
          if (data?.products?.length > 0) {
               dispatch(SearchedProductAction(data));
               navigate('/search-product');
          }
     }

     const handleSearchCompany = (e) => {
          setIsSearch(false);
          let value = e.target.value.toLowerCase();
          const filteredCompany = companies.filter((item) => item.companyName.toLowerCase().includes(value));
          if (filteredCompany?.length === 0) {
               setIsSearch(true);
               return;
          } else {
               setSearchedCompany(filteredCompany);
          }
     }
     
     const displayedCompanies = searchedCompany.length > 0 ? searchedCompany : companies;     
     const enableScroll = displayedCompanies.length > 8;

     return (
          <div className='m-4 p-4'>
               <div className='flex justify-center items-center py-8'>
                    <div className={`md:w-[80%] shadow-2xl rounded-lg h-[580px] ${enableScroll ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
                         <div className='flex justify-end items-end mb-8'>
                              <div className='w-1/3 m-4'>
                                   <Input placeholder="Search Company" onChange={handleSearchCompany} />
                              </div>
                         </div>
                         {
                              isSearch
                                   ? (
                                        <div className='flex justify-center items-center mt-12'>
                                             <span className='font-semibold text-2xl text-gray-600'>
                                                  No company found!
                                             </span>
                                        </div>
                                   ) : (
                                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 m-4'>
                                             {displayedCompanies.map((company, index) => (
                                                  <div key={index} className='flex flex-col bg-white cursor-pointer' onClick={() => handleShowCompanyProduct(company)}>
                                                       <CompanyCard company={company} index={index} />
                                                  </div>
                                             ))}
                                        </div>
                                   )
                         }
                    </div>
               </div>
          </div>
     )
}

export default Companies;

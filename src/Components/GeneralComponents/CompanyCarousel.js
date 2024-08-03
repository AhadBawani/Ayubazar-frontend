import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Requests from '../../RequestHandlers/Requests/Requests';
import Slider from "react-slick";
import { SearchedProductAction } from '../../Redux/Actions/ProductsActions/ProductsActions';
import { useNavigate } from 'react-router-dom';
import useComponentState from '../../Hooks/useComponentState';
import { SampleNextArrow, SamplePrevArrow } from '../../Fields/CarouselButtons';

const CompanyCarousel = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const company = useSelector((state) => state?.Company?.company) || [];
     const { mobile } = useComponentState();
     const settings = {
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 3000,
          cssEase: "linear",
          nextArrow: <SampleNextArrow to="next" />,
          prevArrow: <SamplePrevArrow to="prev" />,
     };
     const mobileSettings = {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 3000,
          cssEase: "linear",
          nextArrow: <SampleNextArrow to="next" />,
          prevArrow: <SamplePrevArrow to="prev" />,
     };
     const handleShowCompanyProduct = (data) => {
          if (data?.products?.length > 0) {
               dispatch(SearchedProductAction(data));
               navigate('/search-product');
          }
     }
     return (
          <div className="p-8 sm:p-12 bg-[#EDEBE9]">
               {
                    mobile
                         ?
                         <>
                              <div className='flex justify-center items-center mb-4 text-center'>
                                   <span className='text-2xl font-bold'>Featured Companies</span>
                              </div>
                              <div className='flex justify-center items-center my-6'>
                                   <div className='w-full max-w-xs mx-auto'>
                                        <Slider {...mobileSettings}>
                                             {
                                                  company?.map((item, index) => (
                                                       <div
                                                            key={index}
                                                            onClick={() => handleShowCompanyProduct(item)}
                                                            className='p-6 rounded-full shadow-xl bg-white 
                                                            cursor-pointer h-[20%] max-w-[90%]'
                                                       >
                                                            <img
                                                                 src={Requests.GET_COMPANY_IMAGES +
                                                                      item?.companyImage}
                                                                 alt='Ayubazar'
                                                                 className='rounded-full object-contain' />
                                                       </div>
                                                  ))
                                             }
                                        </Slider>
                                   </div>
                              </div>
                         </>
                         :
                         <>
                              <div className='flex justify-center items-center mb-4'>
                                   <span className='text-4xl font-bold'>Featured Companies</span>
                              </div>
                              <div className='flex justify-center items-center my-12'>
                                   <div className='w-3/4 m-auto'>
                                        <Slider {...settings}>
                                             {
                                                  company?.map((item, index) => {
                                                       return <>
                                                            <div
                                                                 key={index}
                                                                 onClick={() => handleShowCompanyProduct(item)}
                                                                 className='m-4 h-44 w-44 flex justify-center 
                                                                           items-center rounded-full shadow-xl
                                                                           bg-white cursor-pointer ml-12'>
                                                                 <img
                                                                      src={Requests.GET_COMPANY_IMAGES +
                                                                           item?.companyImage}
                                                                      alt='Ayubazarar'
                                                                      height="100px"
                                                                      width="100px" />
                                                            </div>
                                                       </>
                                                  })
                                             }
                                        </Slider>
                                   </div>
                              </div>
                         </>
               }
          </div>
     );
};

export default CompanyCarousel;
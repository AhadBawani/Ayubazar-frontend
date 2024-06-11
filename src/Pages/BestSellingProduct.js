import React from 'react'
import useProductsState from '../Hooks/useProductsState';
import Slider from "react-slick";
import { useDispatch } from 'react-redux';
import ProductsCard from '../Components/HomePageComponents/ProductsCard';
import useComponentState from '../Hooks/useComponentState';
import '../Styles/BestSellingProduct.css';
import { SampleNextArrow, SamplePrevArrow } from '../Fields/CarouselButtons';

const BestSellingProduct = () => {
     const { bestSellingProducts } = useProductsState();
     const dispatch = useDispatch();
     const { mobile } = useComponentState();
     const settings = {
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 5000,
          cssEase: "linear",
          nextArrow: <SampleNextArrow to="next" />,
          prevArrow: <SamplePrevArrow to="prev" />,
     };
     const mobileSettings = {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 5000,
          cssEase: "linear",
          nextArrow: <SampleNextArrow to="next" />,
          prevArrow: <SamplePrevArrow to="prev" />,
     };
     return (
          <div className='my-8'>
               <div className='flex flex-col justify-center items-center'>
                    <div className='flex justify-between items-center'>
                         <span className='text-[rgb(51,51,51)] text-2xl font-bold'>
                              Best Selling Products
                         </span>
                    </div>
                    <img src='https://www.neelayurvedics.com/wp-content/themes/elessi-theme/assets/images/hr-type-baby.png'
                         alt='Ayubazar' className='my-4' />
               </div>
               {
                    mobile
                         ?
                         <>
                              <div className='flex justify-center items-center my-12'>
                                   <div className='w-3/4 m-auto'>
                                        <Slider {...mobileSettings}>
                                             {
                                                  bestSellingProducts?.map((product) => {
                                                       return <>
                                                            <div key={product?._id}
                                                                 className='flex justify-center 
                                                                 items-center bg-white cursor-pointer ml-10'>
                                                                 <ProductsCard
                                                                      product={product}
                                                                      dispatch={dispatch} />
                                                            </div>
                                                       </>
                                                  })
                                             }
                                        </Slider>
                                   </div>
                              </div>
                         </>
                         :
                         <>
                              <div className='flex justify-center items-center my-12'>
                                   <div className='w-4/5 m-auto'>
                                        <Slider {...settings}>
                                             {
                                                  bestSellingProducts?.map((product) => {
                                                       return <>
                                                            <div key={product?._id} className='ml-6'>
                                                                 <ProductsCard
                                                                      product={product}
                                                                      dispatch={dispatch} />
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
     )
}

export default BestSellingProduct;
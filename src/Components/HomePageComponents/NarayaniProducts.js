import React from 'react'
import { SampleNextArrow, SamplePrevArrow } from '../../Fields/CarouselButtons';
import Slider from 'react-slick';
import ProductsCard from './ProductsCard';
import { useDispatch } from 'react-redux';
import useProductsState from '../../Hooks/useProductsState';
import useComponentState from '../../Hooks/useComponentState';

const NarayaniProducts = () => {
     const dispatch = useDispatch();
     const { narayaniProducts } = useProductsState();
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
          slidesToShow: 2,
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
                              Narayani's Products
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
                                                  narayaniProducts?.map((product, index) => {
                                                       return <>
                                                            <div key={product?._id + index}
                                                                 className='flex justify-center 
                                                                 items-center bg-white cursor-pointer'>
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
                                                  narayaniProducts?.map((product, index) => {
                                                       return <>
                                                            <div key={product?._id + index} className='ml-6'>
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

export default NarayaniProducts
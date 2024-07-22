import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../Images/CarouselImages/Banner-1.jpg';
import img2 from '../../Images/CarouselImages/Banner-2.jpg';
import img3 from '../../Images/CarouselImages/Banner-3.jpg';
import { Carousel } from 'react-responsive-carousel';

const ProductCarousel = () => {
    const slides = [
        { id: 1, image: img1 },
        { id: 2, image: img2 },
        { id: 3, image: img3 },
    ];
    return (
        <div className='overflow-hidden pt-2'>
            <Carousel
                showArrows={true}
                autoPlay
                infiniteLoop
                interval={8000}
                stopOnHover
                className='max-w-full max-h-[400px]'
                showThumbs={false}
            >
                {
                    slides.map((s, index) => {
                        return <div key={s.id + index} className='w-full max-h-full'>
                            <div className='min-h-[390px] max-h-[390px] flex justify-center items-center rounded-md' style={{ border: '1px solid #ececec' }}>
                                <img className='min-h-[380px] max-h-[380px]' src={s.image} alt='Ayubazar' />
                            </div>
                        </div>
                    })
                }
            </Carousel>
        </div>
    )
}

export default ProductCarousel;
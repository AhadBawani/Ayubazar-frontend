import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../Images/CarouselImages/Ayubazar 2.jpg';
import img2 from '../Images/CarouselImages/Ayubazar 3.jpg';
import img3 from '../Images/CarouselImages/Ayubazar-banner.jpg';
import img4 from '../Images/CarouselImages/Ayubazar-poster.jpg';
import { Carousel } from 'react-responsive-carousel';

const ProductCarousel = () => {
    const slides = [
        { id: 1, image: img3 },
        { id: 2, image: img4 },
        { id: 3, image: img2 },
        { id: 4, image: img1 }
    ];
    return (
        <div className='max-w-full max-h-[1000px] overflow-hidden'>
            <Carousel
                showArrows={true}
                autoPlay
                infiniteLoop
                interval={5000}
                stopOnHover
                className='max-w-full max-h-full'
            >
                {
                    slides.map((s, index) => {
                        return <>
                            <div key={s.id + index} className='w-full max-h-full'>
                                <img
                                    src={s.image}
                                    alt='Ayubazar'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        </>
                    })
                }
            </Carousel>
        </div>
    )
}

export default ProductCarousel;
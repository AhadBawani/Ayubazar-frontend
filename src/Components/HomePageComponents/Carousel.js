import React, { useState, useEffect, useRef } from 'react';
import ProductsCard from './ProductsCard'; // Import your ProductsCard component

const Carousel = ({ products, dispatch }) => {
     const [currentIndex, setCurrentIndex] = useState(0);
     const containerRef = useRef(null);
     const itemWidth = 220; // Width of each product card
     const spacing = 16 * 1.5; // Increase spacing by 1.5 times
     const intervalDuration = 5000; // Interval duration in milliseconds

     useEffect(() => {
          const interval = setInterval(() => {
               setCurrentIndex(prevIndex => (prevIndex + 1) % products.length);
          }, intervalDuration);

          return () => clearInterval(interval);
     }, [products.length, intervalDuration]);

     useEffect(() => {
          const totalItems = products.length;
          const translateValue = -1 * (currentIndex * (itemWidth + spacing));
          const container = containerRef.current;

          container.style.transition = 'transform 0.5s ease-in-out';
          container.style.transform = `translateX(${translateValue}px)`;

          const handleTransitionEnd = () => {
               // Move the first item to the end for infinite loop effect
               if (currentIndex === totalItems) {
                    setCurrentIndex(0);
               }
          };

          container.addEventListener('transitionend', handleTransitionEnd);

          return () => {
               container.removeEventListener('transitionend', handleTransitionEnd);
          };
     }, [currentIndex, products.length, spacing]);

     return (
          <div className="carousel-container" style={{ overflow: 'hidden' }}>
               <div
                    className="carousel-items"
                    ref={containerRef}
                    style={{
                         display: 'flex',
                         transition: 'transform 0.5s ease-in-out',
                         gap: `${spacing}px`,
                         flexWrap: 'nowrap',
                         marginRight: `${-1 * spacing}px`, // Compensate for gap to avoid overflow
                    }}
               >
                    {products.map((item, index) => (
                         <div key={index} style={{ width: itemWidth }}>
                              <ProductsCard product={item} dispatch={dispatch} />
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default Carousel;
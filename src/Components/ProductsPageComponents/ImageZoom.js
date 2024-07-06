import React from 'react';
import Requests from '../../RequestHandlers/Requests/Requests';

const ImageZoom = ({ imageUrl }) => {
    // const [isZoomed, setIsZoomed] = useState(false);
    // const [zoomX, setZoomX] = useState(0);
    // const [zoomY, setZoomY] = useState(0);

    // const handleMouseMove = (event) => {
    //     const rect = event.target.getBoundingClientRect();
    //     const x = event.clientX - rect.left;
    //     const y = event.clientY - rect.top;

    //     setIsZoomed(true);
    //     setZoomX(-((x * 2) - x));
    //     setZoomY(-((y * 2) - y));
    // };

    // const handleMouseLeave = (event) => {
    //     // Prevent zoom from resetting if the mouse moves back over the image
    //     if (!event.relatedTarget || !event.relatedTarget.closest('.image-container')) {
    //         setIsZoomed(false);
    //     }
    // };    
    return (
        <div className="relative">
            <div
                className="overflow-hidden image-container"
                // onMouseMove={handleMouseMove}
                // onMouseLeave={handleMouseLeave}
            >
                <img
                    src={Requests.GET_PRODUCT_IMAGE + imageUrl}
                    alt="Product"                    
                    className={`w-full h-full transition-transform duration-300 transform origin-top-left`}
                    // style={{ transform: `scale(${isZoomed ? 2 : 1}) translate(${zoomX}px, ${zoomY}px)` }}
                />
            </div>
        </div>
    );
};

export default ImageZoom;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };

        const handleScrollToTop = () => {
            if (location.pathname !== '/') { // Check if not already at the top
                scrollToTop();
            }
        };

        handleScrollToTop();

    }, [location]);

    return null;
}

export default ScrollToTop;

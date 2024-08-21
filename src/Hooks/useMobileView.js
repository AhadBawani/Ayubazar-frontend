import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MobileViewAction } from '../Redux/Actions/ComponentActions/ComponentActions';

const useMobileView = () => {
     const dispatch = useDispatch();
     useLayoutEffect(() => {
          const handleResize = () => {
               const isMobile = window.innerWidth <= 768;
               dispatch(MobileViewAction(isMobile));
          };

          handleResize();
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
     }, [dispatch]);
};

export default useMobileView;

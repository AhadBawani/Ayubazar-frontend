import React, { useEffect, useState } from 'react'
import Confirmation from '../Components/SuccessComponents/Confirmation';

const OrderConfirmation = () => {
     const [showConfirmation, setShowConfirmation] = useState(false);
     useEffect(() => {
          const timer = setTimeout(() => {
               setShowConfirmation(true);
          }, 1000); // Change the delay time as needed

          return () => clearTimeout(timer);
     }, []);

     return (
          <div>
               {/* Your order content here */}
               {showConfirmation && <Confirmation />}
          </div>
     );
}

export default OrderConfirmation;
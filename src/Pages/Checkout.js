import React from 'react'
import ContactInformation from '../Components/CheckoutComponents/ContactInformation';
import OrderDetail from '../Components/CheckoutComponents/OrderDetail';

const Checkout = () => {
  return (
    <div className='flex'>
      <div className='w-[60%] h-full'>
        <ContactInformation />
      </div>
      <div className='flex-1 border-l-2 border-[#ECECEC] bg-[#F9F9F9]'>
        <OrderDetail />
      </div>
    </div>
  )
}

export default Checkout;
import React, { useEffect, useState } from 'react'
import ContactInformation from '../Components/CheckoutComponents/ContactInformation';
import OrderDetail from '../Components/CheckoutComponents/OrderDetail';
import useUserState from '../Hooks/useUserState';
import { useDispatch } from 'react-redux';
import { TotalAction } from '../Redux/Actions/UserActions/UsersAction';
import PaymentComponent from '../Components/CheckoutComponents/PaymentComponent';
import logo from '../Images/logo.png';

const Checkout = () => {
  const { usercart, total } = useUserState();
  const dispatch = useDispatch();
  const [state, setState] = useState('shipping');
  useEffect(() => {
    if (!total) {
      let sum = 0;
      usercart?.forEach((item) => {
        sum += parseInt(Object.values(item?.option)) * parseInt(item?.quantity);
      })
      dispatch(TotalAction(sum));
    }
  }, [usercart, total, dispatch])
  return (
    <div className='flex'>
      <div className='w-[60%] h-full'>
        <div className='mt-4 p-4'>
          <img src={logo} alt='Ayubazar' width="290px" />
        </div>
        {
          state === 'shipping' && <ContactInformation setState={setState} />
        }
        {
          state === 'payment' && <PaymentComponent />
        }
      </div>
      <div className='flex-1 border-l-2 border-[#ECECEC] bg-[#F9F9F9]'>
        <OrderDetail />
      </div>
    </div>
  )
}

export default Checkout;
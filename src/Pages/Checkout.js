import React, { useEffect, useState } from 'react'
import ContactInformation from '../Components/CheckoutComponents/ContactInformation';
import OrderDetail from '../Components/CheckoutComponents/OrderDetail';
import useUserState from '../Hooks/useUserState';
import { useDispatch } from 'react-redux';
import { TotalAction } from '../Redux/Actions/UserActions/UsersAction';
import PaymentComponent from '../Components/CheckoutComponents/PaymentComponent';
import logo from '../Images/logo.png';
import useComponentState from '../Hooks/useComponentState';

const Checkout = () => {
  const { usercart, total } = useUserState();
  const { mobile } = useComponentState();
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
  useEffect(() => {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };

    scrollToTop();
  }, [state])
  return (
    <div className='flex flex-col sm:flex-row'>
      <div className='w-full sm:w-[60%] h-full'>
        <div className='sm:mt-4 p-4'>
          <img src={logo} alt='Ayubazar' width="290px" />
        </div>
        {
          mobile
          &&
          <>
            <div className='flex-1 border-l-2 border-[#ECECEC] bg-[#F9F9F9]'>
              <OrderDetail />
            </div>
            {
              state === 'shipping' && <ContactInformation setState={setState} />
            }
            {
              state === 'payment' && <PaymentComponent />
            }
          </>
        }
        {
          !mobile
          &&
          <>
            {
              state === 'shipping' && <ContactInformation setState={setState} />
            }
            {
              state === 'payment' && <PaymentComponent />
            }
          </>
        }
      </div>
      {
        !mobile
        &&
        <>
          <div className='flex-1 border-l-2 border-[#ECECEC] bg-[#F9F9F9]'>
            <OrderDetail />
          </div>
        </>
      }
    </div>
  )
}

export default Checkout;
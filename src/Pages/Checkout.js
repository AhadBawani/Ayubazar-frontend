import React, { useEffect, useState } from 'react'
import ContactInformation from '../Components/CheckoutComponents/ContactInformation';
import OrderDetail from '../Components/CheckoutComponents/OrderDetail';
import useUserState from '../Hooks/useUserState';
import { useDispatch } from 'react-redux';
import { TotalAction } from '../Redux/Actions/UserActions/UsersAction';
import logo from '../Images/logo.png';
import useComponentState from '../Hooks/useComponentState';
import Header from '../Components/ShoppingCartComponents/Header';
import PaymentComponent from '../Components/CheckoutComponents/PaymentComponent';

const Checkout = () => {
     const { usercart, total } = useUserState();
     const { mobile } = useComponentState();
     const [isProcessing, setIsProcessing] = useState(false);
     const dispatch = useDispatch();


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
          <>
               <div>
                    <Header code='02' />
               </div>
               {
                    mobile
                         ?
                         <>
                              <div className='sm:mt-4 p-4'>
                                   <img src={logo} alt='Ayubazar' width="290px" />
                              </div>
                              <div>
                                   <ContactInformation
                                        isProcessing={isProcessing}
                                        setIsProcessing={setIsProcessing} />
                              </div>
                              <div>
                                   <OrderDetail />
                              </div>
                              <div className='p-4'>
                                   <PaymentComponent
                                        isProcessing={isProcessing}
                                        setIsProcessing={setIsProcessing} />
                              </div>
                         </>
                         :
                         <>
                              <div className='flex'>
                                   <div className='w-[60%]'>
                                        <div className='sm:mt-4 p-4'>
                                             <img src={logo} alt='Ayubazar' width="290px" />
                                        </div>
                                        <div className='flex-1'>
                                             <ContactInformation
                                                  isProcessing={isProcessing}
                                                  setIsProcessing={setIsProcessing} />
                                        </div>
                                   </div>
                                   <div className='flex flex-col w-[40%] border-l-2 border-[#ECECEC] bg-[#F9F9F9]'>
                                        <div>
                                             <OrderDetail />
                                        </div>
                                        <div className='p-4'>
                                             <PaymentComponent
                                                  isProcessing={isProcessing}
                                                  setIsProcessing={setIsProcessing} />
                                        </div>
                                   </div>
                              </div>
                         </>
               }
          </>
     )
}

export default Checkout;
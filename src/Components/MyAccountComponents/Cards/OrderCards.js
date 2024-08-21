import React, { useState } from 'react'
import { deliveryDate, formatDate } from '../../../Utils/FormatDate';
import { LuIndianRupee } from 'react-icons/lu';
import useUserState from '../../../Hooks/useUserState';
import { useDispatch } from 'react-redux';
import { ImSpinner8 } from "react-icons/im";
import { ShowOrderAction } from '../../../Redux/Actions/UserActions/UsersAction';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import OrderCancelRequestDialog from '../Dialogs/OrderCancelRequestDialog';

const OrderCards = () => {
     const { user, order } = useUserState();
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [showCancellationDialog, setShowCancellationDialog] = useState(false);
     const [isProcessing, setIsProcessing] = useState(false);
     const handleRequestForCancel = (orderId) => {
          setShowCancellationDialog({ open: true, data: { userId: user?._id, orderId: orderId } });
     }
     const handleBackNavigation = () => {
          dispatch(ShowOrderAction(null));
          navigate('/my-account/view-order')
     }
     return (
          <>
               <div className='relative'>
                    <div>
                         <IoMdArrowRoundBack onClick={() => handleBackNavigation()}
                              className="w-7 h-7 cursor-pointer rounded-full 
                         hover:bg-gray-200 mt-[-1px] text-[#333]"/>
                    </div>
                    {isProcessing && (
                         <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                              <ImSpinner8 size={36} className="animate-spin text-black" />
                         </div>
                    )}
                    <div className='flex flex-col sm:flex-row sm:justify-between mt-4'>
                         <div>
                              <span style={{
                                   fontSize: '100%',
                                   lineHeight: '1.6',
                                   textRendering: 'optimizeLegibility',
                                   WebkitFontSmoothing: 'antialiased',
                                   color: '#000'
                              }}>
                                   Order #<span className='bg-yellow-300 mr-1'>{order?.orderId}</span>
                                   was placed on
                                   <span className='bg-yellow-300 mx-1'>{formatDate(order?.createdAt)}</span>
                                   and is currently
                                   <span className='bg-yellow-300 ml-1'>{order?.status}</span>.
                              </span>
                         </div>
                         <div className='mt-3 sm:mt-0'>
                              {
                                   order?.status !== 'Cancelled' && !order?.delete
                                   &&
                                   <>
                                        {
                                             order?.status === 'Pending'
                                                  ?
                                                  <>
                                                       {
                                                            order?.cancelOrder === 'Rejected'
                                                                 ?
                                                                 <>
                                                                      <span
                                                                           className='font-semibold text-sm text-[#333]'>
                                                                           Request Rejected
                                                                      </span>
                                                                 </>
                                                                 :
                                                                 <>
                                                                      {
                                                                           order?.cancelOrder === 'request-for-cancel'
                                                                                ?
                                                                                <>
                                                                                     <button
                                                                                          style={{
                                                                                               letterSpacing: '2px',
                                                                                               lineHeight: '1.4',
                                                                                               height: '42px',
                                                                                               fontSize: '12px'
                                                                                          }}
                                                                                          className='w-[100%] uppercase font-bold bg-gray-200
                                                                 text-[#999] p-2 rounded-md transition-all ease-in-out duration-200
                                                                 outline-none' onClick={() => handleRequestForCancel(order?.orderId)}>
                                                                                          Request Sended
                                                                                     </button>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                     <button
                                                                                          style={{
                                                                                               letterSpacing: '2px',
                                                                                               lineHeight: '1.4',
                                                                                               height: '42px',
                                                                                               fontSize: '12px'
                                                                                          }}
                                                                                          className='w-[100%] uppercase font-bold bg-[#027148] hover:bg-[#013220]
                                                                                          text-white p-2 
                                                                                          rounded-md transition-all
                                                                                          ease-in-out duration-200
                                                                                          outline-none'
                                                                                          onClick={() => handleRequestForCancel(order?.orderId)}>
                                                                                          Request For Cancel
                                                                                     </button>
                                                                                </>
                                                                      }
                                                                 </>
                                                       }
                                                  </>
                                                  :
                                                  <>
                                                       <button
                                                            style={{
                                                                 letterSpacing: '2px',
                                                                 lineHeight: '1.4',
                                                                 height: '42px',
                                                                 fontSize: '12px'
                                                            }}
                                                            className='w-[100%] uppercase font-bold bg-gray-400
                                        text-gray-700 p-2 rounded-md transition-all ease-in-out duration-200
                                        outline-none' disabled>
                                                            Request For Cancel
                                                       </button>
                                                  </>
                                        }
                                   </>
                              }
                         </div>
                    </div>
                    <div className='mt-6'>
                         <span
                              style={{
                                   fontSize: '1.7931em',
                                   lineHeight: '1.4',
                                   textRendering: 'optimizeLegibility',
                                   color: '#333',
                                   fontWeight: 'bold'
                              }}>
                              Order details
                         </span>
                    </div>
                    <div className='mt-4'>
                         <span className='text-[#333] font-bold'>
                              Order estimated delivery between
                              <span className='ml-1'>{deliveryDate(order?.createdAt).firstDate} -
                                   <span className='ml-1'>{deliveryDate(order?.createdAt).secondDate}</span>
                              </span>
                         </span>
                    </div>
                    <div className='mt-3' style={{ border: '1px solid #ECECEC' }}>
                         <div className='p-4'>
                              {
                                   JSON.parse(order?.products)?.map((product, index) => {                                        
                                        return <div className='flex justify-between w-full' key={index}>
                                             <div className='flex flex-col mb-4'>
                                                  <div>
                                                       <span
                                                            className='transition-all duration-200 ease-in-out text-[#333] hover:text-[#000]' style={{ fontWeight: '500' }}>
                                                            {product?.product?.productName}
                                                       </span>
                                                       <span className='text-[#333] font-semibold ml-1'
                                                            style={{ lineHeight: 'inherit' }}>
                                                            x {product?.quantity}
                                                       </span>
                                                  </div>
                                                  <div>
                                                       {
                                                            product?.product?.isVariationAvailable
                                                                 ?
                                                                 <>
                                                                      <span className='font-bold text-[12px]
                                                                           text-[#a5a5a5]'>Weight :
                                                                           <span className='font-medium ml-1'>
                                                                                {Object.keys(product?.option)[0]}
                                                                           </span>
                                                                      </span>
                                                                 </>
                                                                 :
                                                                 <>
                                                                      <div className='flex'>
                                                                           <div>
                                                                                <span className='font-bold text-[12px]
                                                                           text-[#a5a5a5]'>Price :
                                                                                </span>
                                                                           </div>
                                                                           <div className='flex text-[#a5a5a5] font-bold text-[12px] mt-1 ml-[-4px]'>
                                                                                <span className='ml-2'>
                                                                                     <LuIndianRupee className='mt-1' />
                                                                                </span>
                                                                                <span>
                                                                                     {product?.product?.salesPrice}.00
                                                                                </span>
                                                                           </div>
                                                                      </div>
                                                                 </>
                                                       }
                                                  </div>
                                             </div>
                                             <div>
                                                  <span className='text-[#333] font-bold'>
                                                       {
                                                            product?.product?.isVariationAvailable
                                                                 ?
                                                                 <>
                                                                      <div className='flex'>
                                                                           <span className='ml-2'>
                                                                                <LuIndianRupee className='mt-1' />
                                                                           </span>
                                                                           <span>
                                                                                {Object.values(product?.option)[0]}.00
                                                                           </span>
                                                                      </div>
                                                                 </>
                                                                 :
                                                                 <>
                                                                      <div className='flex'>
                                                                           <span className='ml-2'>
                                                                                <LuIndianRupee className='mt-1' />
                                                                           </span>
                                                                           <span>
                                                                                {product?.product?.salesPrice}.00
                                                                           </span>
                                                                      </div>
                                                                 </>
                                                       }
                                                  </span>
                                             </div>
                                        </div>
                                   })
                              }
                         </div>
                         <div className='bg-[#F8F8F8]'>
                              <div className='p-4'>
                                   <div className='flex justify-between text-[#333] font-semibold mb-5'>
                                        <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>
                                             Subtotal :
                                        </span>
                                        <div className='flex'>
                                             <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                             <span>{order?.subTotal}.00</span>
                                        </div>
                                   </div>
                                   <div className='flex justify-between text-[#333] font-semibold mb-5'>
                                        <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>
                                             Shipping :
                                        </span>
                                        {
                                             order?.shipping === 'free'
                                                  ?
                                                  <>
                                                       <span className='text-[#333] font-semibold'>
                                                            Free Shipping
                                                       </span>
                                                  </>
                                                  :
                                                  <>
                                                       <div className='flex'>
                                                            <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                                            <span>{order?.shipping}.00</span>
                                                       </div>
                                                  </>
                                        }
                                   </div>
                                   {
                                        order?.handlingCharges > 0
                                        &&
                                        <div className='flex justify-between text-[#333] font-semibold mb-5'>
                                             <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>
                                                  Handling Charges :
                                             </span>
                                             <div className='flex'>
                                                  <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                                  <span>{order?.handlingCharges}.00</span>
                                             </div>
                                        </div>
                                   }
                                   {
                                        order?.codCharges > 0
                                        &&
                                        <div className='flex justify-between text-[#333] font-semibold mb-5'>
                                             <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>
                                                  COD Charges :
                                             </span>
                                             <div className='flex'>
                                                  <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                                  <span>{order?.codCharges}.00</span>
                                             </div>
                                        </div>
                                   }
                                   <div className='flex justify-between text-[#333] font-semibold mb-2'>
                                        <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>Payment method : </span>
                                        <span>{order?.paymentType}</span>
                                   </div>
                              </div>
                              <hr />
                              <div className='p-4'>
                                   <div className='flex justify-between text-[#333] font-semibold'>
                                        <span style={{ lineHeight: '1.24138em', fontSize: '1.06897em' }}>
                                             Total :
                                        </span>
                                        <div className='flex'>
                                             <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                             <span>{order?.total}.00</span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className='my-6 flex'>
                         <div className='w-1/2'>
                              <span className='text-[130%] sm:text-[150%]'
                                   style={{
                                        lineHeight: '1.4',
                                        fontWeight: 700,
                                        color: '#333',
                                        textRendering: 'optimizeLegibility'
                                   }}>
                                   Billing Address
                              </span>
                              <div className='mt-3 flex flex-col space-y-1 text-[#333]'
                                   style={{ lineHeight: '1.6', fontSize: '15px', fontWeight: 500 }}>
                                   <div className='flex'>
                                        <span>{order?.orderBillingAddress?.firstName}</span>
                                        <span className='ml-1'>{order?.orderBillingAddress?.firstName}</span>
                                   </div>
                                   <span>{order?.orderBillingAddress?.houseNumberAndStreetName}</span>

                                   <span>{order?.orderBillingAddress?.apartment}</span>
                                   <div className='flex'>
                                        <span>{order?.orderBillingAddress?.city}</span>
                                        <span className='ml-1'>{order?.orderBillingAddress?.postcode}</span>
                                   </div>
                                   <span>{order?.orderBillingAddress?.state}</span>
                                   <span>{order?.orderBillingAddress?.phoneNumber}</span>
                              </div>
                              <div className='mt-4'>
                                   <span
                                        className='text-[#333] hover:text-[#d0bdac]
                                        cursor-pointer text-sm font-semibold overflow-hidden'
                                        style={{
                                             display: '-webkit-box',
                                             WebkitLineClamp: 1, // Limit to two lines
                                             WebkitBoxOrient: 'vertical',
                                             overflow: 'hidden',
                                             textOverflow: 'ellipsis'
                                        }}
                                   >
                                        {order?.orderShippingAddress?.email}
                                   </span>
                              </div>
                         </div>
                         <div className='w-1/2'>
                              <span className='text-[130%] sm:text-[150%]'
                                   style={{
                                        lineHeight: '1.4',
                                        fontWeight: 700,
                                        color: '#333',
                                        textRendering: 'optimizeLegibility'
                                   }}>
                                   Shipping Address
                              </span>
                              <div className='mt-3 flex flex-col space-y-1 text-[#333]'
                                   style={{ lineHeight: '1.6', fontSize: '15px', fontWeight: 500 }}>
                                   <div className='flex'>
                                        <span>{order?.orderShippingAddress?.firstName}</span>
                                        <span className='ml-1'>{order?.orderShippingAddress?.firstName}</span>
                                   </div>
                                   <span>{order?.orderShippingAddress?.houseNumberAndStreetName}</span>

                                   <span>{order?.orderShippingAddress?.apartment}</span>
                                   <div className='flex'>
                                        <span>{order?.orderShippingAddress?.city}</span>
                                        <span className='ml-1'>{order?.orderShippingAddress?.postcode}</span>
                                   </div>
                                   <span>{order?.orderShippingAddress?.state}</span>
                                   <span>{order?.orderShippingAddress?.phoneNumber}</span>
                              </div>
                              <div className='mt-4'>
                                   <span
                                        className='text-[#333] hover:text-[#d0bdac]
                        cursor-pointer text-sm font-semibold overflow-hidden'
                                        style={{
                                             display: '-webkit-box',
                                             WebkitLineClamp: 1, // Limit to two lines
                                             WebkitBoxOrient: 'vertical',
                                             overflow: 'hidden',
                                             textOverflow: 'ellipsis'
                                        }}
                                   >
                                        {order?.orderShippingAddress?.email}
                                   </span>
                              </div>
                         </div>
                    </div>
               </div>
               {
                    showCancellationDialog?.open
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                         <div className="bg-white rounded-md h-auto w-[90%] sm:w-auto">
                              <OrderCancelRequestDialog
                                   setShowCancellationDialog={setShowCancellationDialog}
                                   showCancellationDialog={showCancellationDialog} setIsProcessingPage={setIsProcessing} />
                         </div>
                    </div>
               }
          </>
     )
}

export default OrderCards;
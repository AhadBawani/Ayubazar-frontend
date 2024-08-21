import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import Button from '../../../Fields/Button';
import { toast } from 'react-toastify';
import { getOrderDetailHandler, requestForCancelOrderHandler } from '../../../RequestHandlers/RequestHandler/UserRequestHandler';

const OrderCancelRequestDialog = ({ showCancellationDialog, setShowCancellationDialog, setIsProcessingPage }) => {
     const wrapperRef = useRef();
     const dispatch = useDispatch();
     const [message, setMessage] = useState();
     const [isProcessing, setIsProcessing] = useState();
     const [errors, setErrors] = useState({
          message: false
     })
     useEffect(() => {
          const handleOutsideClick = (event) => {
               if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                    // Click outside the component                    
                    setShowCancellationDialog({ open: false, data: null });
               }
          };

          // Attach the event listener when the component mounts
          document.addEventListener('mousedown', handleOutsideClick);

          // Clean up the event listener when the component unmounts
          return () => {
               document.removeEventListener('mousedown', handleOutsideClick);
          };
     }, [dispatch]);

     const handleCancellationRequestSubmit = () => {
          if (!message || message?.length < 6) {
               toast.error("Enter valid message");
               setErrors({ ...errors, message: true });
               return;
          } else {
               setIsProcessing(true);
               setErrors({ message: false });
               setIsProcessing(true);
               setIsProcessingPage(true);
               const data = {
                    userId: showCancellationDialog?.data?.userId,
                    orderId: showCancellationDialog?.data?.orderId,
                    message: message
               }
               requestForCancelOrderHandler(dispatch, data)
                    .then((orderResponse) => {
                         setTimeout(() => {
                              getOrderDetailHandler(dispatch, data?.userId, data?.orderId);
                              setShowCancellationDialog({ open: false, data: null });
                              toast.success(orderResponse?.message);
                              setIsProcessing(false);
                              setIsProcessingPage(false);
                         }, 1000)
                    })
                    .catch((error) => {
                         console.log('error in cancel order request handler : ', error);
                    })
          }
     }
     return (
          <div className="lg:w-[500px] transition-all" ref={wrapperRef}>
               <div className="flex items-center justify-between">
                    <div className="flex justify-center items-center flex-grow ml-12 mt-4 text-xl font-semibold">
                         Reason for cancellation ?
                    </div>
                    <span className="relative">
                         <IoMdClose
                              className="w-7 h-7 cursor-pointer rounded-full hover:bg-gray-200 m-2"
                              onClick={() => setShowCancellationDialog(false)}
                         />
                    </span>
               </div>
               <div className="border-b border-gray-300 my-4"></div>
               <div className='relative m-4 p-4'>
                    {isProcessing && (
                         <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                              <ImSpinner8 size={36} className="animate-spin text-black" />
                         </div>
                    )}
                    <div className='flex flex-col mt-1'>
                         <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                              Message *
                         </span>
                         <textarea
                              id="message"
                              name="message"
                              className="border border-gray-300 rounded px-3 py-2 outline-none"
                              placeholder="Message"
                              rows={6}
                              required
                              onChange={e => setMessage(e.target.value)}
                              style={errors.message ? { border: '1px solid red' } : {}}
                              defaultValue={message}
                         />
                    </div>
                    <div className='my-6'>
                         <Button text="Submit" onClick={handleCancellationRequestSubmit} />
                    </div>
                    <div className='text-[#4D4D4D] text-base font-medium'>
                         <ul style={{ listStyleType: 'disc' }}>
                              <li>Send valid request for cancellation of order.</li>
                              <li>Once request is cancelled it cannot be sended again!</li>
                         </ul>
                    </div>
               </div>
          </div>
     )
}

export default OrderCancelRequestDialog;
import React, { useState } from 'react';
import image from '../../Images/Narayani-images/product-enquiry.png';
import Input from '../../Fields/Input';
import Button from '../../Fields/Button';
import { toast } from 'react-toastify';
import { ImSpinner8 } from "react-icons/im";
import { validateEmail } from '../../Utils/verfiyEmail';
import { addProductEnquiryHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';

const ProductEnquiry = () => {
     const [isProcessing, setIsProcessing] = useState(false);
     const [formValue, setFormValue] = useState({
          name: null,
          phoneNumber: null,
          email: null,
          message: null
     });

     const [errors, setErrors] = useState({
          name: false,
          phoneNumber: false,
          email: false,
          message: false
     })
     const onInput = (e) => {
          setFormValue({ ...formValue, [e.target.name]: e.target.value });
     }

     const validate = (value, errors) => {
          let valid = true;
          const newErrors = { ...errors };

          Object.keys(value).forEach((key) => {
               if (!value[key]) {
                    newErrors[key] = true;
                    valid = false;
               } else {
                    newErrors[key] = false;
               }
          });

          return { valid, newErrors };
     };

     const handleProductEnquirySubmit = () => {
          const validateForm = validate(formValue, errors);

          if (!validateForm.valid) {
               setErrors(validateForm.newErrors);
               toast.error('Please fill required fields!');
               return;
          }
          if (formValue.phoneNumber?.length !== 10) {
               toast.error('Invalid Phone Number!');
               setErrors({ ...errors, phoneNumber: true })
               return;
          }
          if (!validateEmail(formValue.email)) {
               toast.error('Invalid Email!');
               return;
          }
          if (validateForm && formValue?.phoneNumber?.length === 10 && validateEmail(formValue.email)) {
               setErrors(validateForm.newErrors);
               setIsProcessing(true);
               addProductEnquiryHandler(formValue)
                    .then((response) => {
                         if (response) {
                              setTimeout(() => {
                                   document.getElementById('name').value = null;
                                   document.getElementById('email').value = null;
                                   document.getElementById('message').value = null;
                                   document.getElementById('phoneNumber').value = null;
                                   setIsProcessing(false);
                                   toast.success('We will get in touch with you soon :)');
                              }, 1000);
                         }
                    })
          }
     }

     return (
          <div className='flex m-4 p-4 mb-8'>
               <div className='mt-8'>
                    <img src={image} alt='Ayubazar' height="550px" width="550px" />
               </div>
               <div className='ml-12 relative'>
                    {isProcessing && (
                         <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                              <ImSpinner8 size={36} className="animate-spin text-black" />
                         </div>
                    )}
                    <div className='text-center mx-4'>
                         <span className='text-3xl font-bold'>Product Enquiry</span>
                    </div>
                    <p className='text-xl font-semibold my-4'>
                         Fill out the product enquiry form to submit your queries.
                    </p>
                    <div>
                         <div className='mb-1'>
                              <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                   Name *
                              </span>
                              <Input
                                   id="name"
                                   onChange={onInput}
                                   name="name"
                                   error={errors.name}
                                   defaultValue={formValue.name} />
                         </div>
                         <div className='mb-1'>
                              <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                   Phone Number *
                              </span>
                              <Input
                                   id="phoneNumber"
                                   onChange={onInput}
                                   name="phoneNumber"
                                   type="number"
                                   error={errors.phoneNumber}
                                   defaultValue={formValue.phoneNumber} />
                         </div>
                         <div className='mb-1'>
                              <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                   Email *
                              </span>
                              <Input
                                   id="email"
                                   onChange={onInput}
                                   name="email"
                                   error={errors.email}
                                   defaultValue={formValue.email} />
                         </div>
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
                                   onChange={onInput}
                                   style={errors.message ? { border: '1px solid red' } : {}}
                                   defaultValue={formValue.message}
                              />
                         </div>
                         <div className='mt-4'>
                              <Button text="Submit" onClick={handleProductEnquirySubmit} />
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default ProductEnquiry;
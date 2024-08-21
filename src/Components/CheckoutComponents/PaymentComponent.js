import React, { useEffect, useState } from 'react'
import useUserState from '../../Hooks/useUserState';
import { ImSpinner8 } from "react-icons/im";
import phonepe from '../../Images/phonepepng.png';
import { useDispatch } from 'react-redux';
import { CodChargesAction, TotalAction, ValidateFormAction } from '../../Redux/Actions/UserActions/UsersAction';
import { deliveryDate } from '../../Utils/FormatDate';
import { toast } from 'react-toastify';


const PaymentComponent = ({ isProcessing, setIsProcessing }) => {
    const { shipping, total, codCharges, codAvailable, handlingCharges, subTotal } = useUserState();
    const [agreeToTermsAndCondition, setAgreeToTermsAndCondition] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('PhonePe');
    const codAmount = handlingCharges > 0 ? Math.ceil(0.05 * (parseInt(total) + parseInt(handlingCharges))) : Math.ceil(0.05 * total);
    const dispatch = useDispatch();

    useEffect(() => {
        if (subTotal) {
            dispatch(TotalAction(subTotal, 'payment component 29'));
        }
        if (shipping?.charges === 'free') {
            return;
        }
        if (shipping && shipping?.charges > 0) {
            dispatch(TotalAction(subTotal + parseInt(shipping?.charges), 'payment component 35'));
        }
    }, [subTotal, shipping, dispatch])

    const handleAgreeToTermsAndCondition = () => {
        if (agreeToTermsAndCondition) {
            setAgreeToTermsAndCondition(false);
        }
        else {
            setAgreeToTermsAndCondition(true);
        }
    }

    const handlePaymentMethodChange = (event) => {
        const value = event.target.value;
        setSelectedPaymentMethod(value);
        if (value === 'COD') {
            dispatch(CodChargesAction(codAmount));
        } else {
            dispatch(TotalAction(total - codCharges));
            dispatch(CodChargesAction(null));
        }
    };

    const handlePlaceOrder = () => {
        if (!agreeToTermsAndCondition) {
            toast.error('Please agree to terms and conditions!');
            return;
        }
        else {
            dispatch(ValidateFormAction({
                validate: true,
                data: {
                    paymentMethod: selectedPaymentMethod,
                    codCharges: codCharges,
                    handlingCharges: handlingCharges,                    
                }
            }));
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }
    };
    return (
        <div className='relative'>
            {isProcessing && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                    <ImSpinner8 size={36} className="animate-spin text-black" />
                </div>
            )}
            <div className='mb-4'>
                <span className='font-bold'>
                    Order estimated delivery between
                    <span className='ml-1'>{deliveryDate(Date.now()).firstDate} -
                        <span className='ml-1'>{deliveryDate(Date.now()).secondDate}</span>
                    </span>
                </span>
            </div>
            <div className='mt-6'>
                <span
                    style={{
                        lineHeight: '1.4',
                        fontSize: '130%'
                    }}
                    className='font-semibold'>
                    Payment Methods
                </span>
                <div className='border border-[#ddd] rounded-lg p-4 mt-3'>
                    <label className='flex items-center space-x-2 cursor-pointer'>
                        <input
                            type='radio'
                            value='PhonePe'
                            className='outline-none'
                            checked={selectedPaymentMethod === 'PhonePe'}
                            onKeyDown={handleKeyDown}
                            onChange={handlePaymentMethodChange}
                        />
                        <span className='text-xl' style={{ color: '#4d4d4d', lineHeight: '1.6', fontWeight: 'bold' }}>Phone Pe</span>
                        <img src={phonepe} alt='Phone-Pe' height="80px" width="100px" />
                    </label>
                    <div className='mx-4 my-6'>
                        <span style={{ lineHeight: '1.4', fontSize: '100%' }}>
                            Pay securely by UPI/Phone Pe/ Credit or Debit cards/ Internet Banking/ Other Wallets through Paytm Secure Servers.
                        </span>
                    </div>
                    <div>
                        <label
                            className={`flex items-center space-x-2 ${!codAvailable ? 'opacity-50' : 'cursor-pointer'}`}
                        >
                            <input
                                type='radio'
                                value='COD'
                                className='outline-none'
                                checked={selectedPaymentMethod === 'COD'}
                                onChange={handlePaymentMethodChange}
                                onKeyDown={handleKeyDown}
                                disabled={!codAvailable}
                            />
                            <span
                                className='text-xl'
                                style={{
                                    color: '#4d4d4d',
                                    lineHeight: '1.6',
                                    fontWeight: 'bold'
                                }}>
                                Cash on Delivery
                            </span>
                        </label>
                        <div className='mx-4 my-6'>
                            {
                                codAvailable &&
                                <span style={{ lineHeight: '1.4', fontSize: '100%' }}>
                                    In COD 5% will be charged on total bill amount
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <hr className='mt-4' />
                <div className='p-4'>
                    <span
                        style={{
                            textRendering: 'optimizeLegibility',
                            color: '#333'
                        }}>Your personal data will be used to process your order,
                        support your experience throughout this website,
                        and for other purposes described in our
                        <span className='underline transition-all ml-1
                        ease-in-out duration-200 hover:text-[#d0bdac] cursor-pointer'>
                            privacy policy
                        </span>
                        .</span>
                </div>
                <div className='my-4'>
                    <input type='checkbox'
                        checked={agreeToTermsAndCondition}
                        onChange={handleAgreeToTermsAndCondition} className='cursor-pointer' />
                    <label onClick={handleAgreeToTermsAndCondition} className='cursor-pointer'>
                        <b> I have read and agree to the website</b>
                        <span className='underline transition-all ml-1
                        ease-in-out duration-200 hover:text-[#d0bdac] cursor-pointer'>
                            terms and conditions
                        </span>
                    </label>
                </div>
                <hr />
                <div className='mt-4'>
                    {
                        total < 0 | isNaN(total)
                            ?
                            <button
                                style={{
                                    letterSpacing: '2px',
                                    lineHeight: '1.4',
                                    height: '42px',
                                    fontSize: '12px'
                                }}
                                className='w-[100%] uppercase font-bold bg-gray-400 outline-none cursor-not-allowed
                                 text-gray-950 p-2 rounded-md transition-all ease-in-out duration-200'
                                disabled>
                                PLACE ORDER
                            </button>
                            :
                            <button
                                style={{
                                    letterSpacing: '2px',
                                    lineHeight: '1.4',
                                    height: '42px',
                                    fontSize: '12px'
                                }}
                                className='w-[100%] uppercase font-bold bg-[#027148]
                         hover:bg-[#013220] outline-none text-white p-2 rounded-md 
                         transition-all ease-in-out duration-200' onClick={handlePlaceOrder}>
                                PLACE ORDER
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default PaymentComponent;
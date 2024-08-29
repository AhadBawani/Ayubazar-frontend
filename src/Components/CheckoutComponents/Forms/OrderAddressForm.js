import React, { useEffect, useState } from 'react';
import useUserState from '../../../Hooks/useUserState';
import Input from '../../../Fields/Input';
import axios from 'axios';
import states from '../../../Utils/States';
import { toast } from 'react-toastify';
import { CouponAction, DiscountAction, ShippingAction, ValidateFormAction } from '../../../Redux/Actions/UserActions/UsersAction';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../../../Utils/verfiyEmail';
import { addBillingAddressHandler, addShippingAddressHandler, getUserByEmailHandler, getUserCartByIdHandler, getUserIfExistHandler, getUserOrdersHandler, placeOrderHandler } from '../../../RequestHandlers/RequestHandler/UserRequestHandler';
import { useNavigate } from 'react-router-dom';
import Requests from '../../../RequestHandlers/Requests/Requests';
import { getPaymentSessionStatusHandler, updatePaymentStatusHandler } from '../../../RequestHandlers/RequestHandler/PaymentRequestHandler';

const OrderAddressForm = ({ userBillingAddress, userShippingAddress, setIsProcessing }) => {
    const { user, shipping, subTotal, usercart, validateForm, total, coupon } = useUserState();
    const userId = localStorage.getItem('userId');
    const [mainEmail, setMainEmail] = useState(user ? user?.email : null);
    const [sameAsBillingAddressChecked, setSameAsBillingAddressChecked] = useState(false);
    const [mainEmailError, setMainEmailError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [billingAddress, setBillingAddress] = useState({
        firstName: userBillingAddress?.firstName || '',
        lastName: userBillingAddress?.lastName || '',
        phoneNumber: userBillingAddress?.phoneNumber || '',
        email: userBillingAddress?.email || user?.email,
        streetAddress: userBillingAddress?.houseNumberAndStreetName || userBillingAddress?.streetAddress || '',
        apartment: userBillingAddress?.apartment || '',
        city: userBillingAddress?.city || shipping?.city || '',
        postcode: userBillingAddress?.postcode || shipping?.postcode || '',
        state: userBillingAddress?.state || shipping?.state || ''
    })
    const [shippingAddress, setShippingAddress] = useState({
        firstName: userShippingAddress?.firstName || '',
        lastName: userShippingAddress?.lastName || '',
        phoneNumber: userShippingAddress?.phoneNumber || '',
        email: userShippingAddress?.email || user?.email,
        streetAddress: userShippingAddress?.houseNumberAndStreetName || userShippingAddress?.streetAddress || '',
        apartment: userShippingAddress?.apartment || '',
        city: userShippingAddress?.city || shipping?.city || '',
        postcode: userShippingAddress?.postcode || shipping?.postcode || '',
        state: userShippingAddress?.state || shipping?.state || ''
    })

    const [billingAddressError, setBillingAddressError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        streetAddress: false,
        apartment: false,
        city: false,
        postcode: false,
        state: false
    })
    const [shippingAddressError, setShippingAddressError] = useState({
        ...billingAddressError
    })

    const onBillingInput = (e) => {
        setBillingAddressError({ ...billingAddressError, [e.target.name]: false });
        setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
    }
    const onShippingInput = (e) => {
        setShippingAddressError({ ...shippingAddressError, [e.target.name]: false });
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const token = sessionStorage.getItem('paymentToken');
        const orderId = sessionStorage.getItem('orderId');
        if (token && orderId) {            
            getPaymentSessionStatusHandler(token, orderId)
                .then((sessionStatusResponse) => {
                    if (!sessionStatusResponse) {
                        navigate('/payment/failure?redirected=true');
                        sessionStorage.removeItem('paymentToken');
                        sessionStorage.removeItem('orderId');
                    }
                })
                .catch((error) => {
                    console.log('error in getting payment session status : ', error);
                })
        }
    }, [navigate])

    useEffect(() => {
        if (validateForm?.validate) {
            handleContinueShopping()
                .then((orderDetails) => {
                    if (orderDetails) {
                        const { codCharges, handlingCharges, paymentMethod } = validateForm.data;
                        getUserByEmailHandler({ email: orderDetails?.email })
                            .then(async (userResponse) => {
                                if (!userId) {
                                    localStorage.setItem('userId', userResponse?._id);
                                }
                                if (userResponse) {
                                    const billingObj = {
                                        userId: userResponse?._id,
                                        ...orderDetails?.orderBillingAddress
                                    }
                                    addBillingAddressHandler(dispatch, billingObj, userResponse?._id)
                                        .then((billingResponse) => {
                                            if (billingResponse) {
                                                const shippingObj = {
                                                    userId: userResponse?._id,
                                                    ...orderDetails?.orderShippingAddress
                                                }
                                                addShippingAddressHandler(dispatch, shippingObj, userResponse?._id)
                                                    .then((shippingResponse) => {
                                                        if (shippingResponse) {
                                                            const orderObj = {
                                                                userId: userResponse?._id,
                                                                products: JSON.stringify(orderDetails?.products),
                                                                orderBillingAddress: billingResponse?.billingAddress?._id,
                                                                orderShippingAddress: shippingResponse?.shippingAddress?._id,
                                                                subTotal: orderDetails?.subTotal,
                                                                shipping: shipping?.charges,
                                                                status: codCharges > 0 ? 'Pending' : 'cancelled',
                                                                paymentType: codCharges > 0 ? 'Cash on Delivery' : 'Phone Pe',
                                                                codCharges: codCharges,
                                                                handlingCharges: handlingCharges,
                                                                coupon: coupon?._id ? coupon?._id : null,
                                                                total: total + handlingCharges,
                                                            }
                                                            if (paymentMethod === 'PhonePe') {
                                                                createPayment(orderObj);
                                                            }
                                                            if (paymentMethod === 'COD') {
                                                                placeOrderHandler(orderObj)
                                                                    .then((orderResponse) => {
                                                                        if (orderResponse) {
                                                                            getUserCartByIdHandler(dispatch, userResponse?._id);
                                                                            getUserOrdersHandler(dispatch, userResponse?._id);
                                                                            dispatch(CouponAction(null));
                                                                            dispatch(ValidateFormAction(null));
                                                                            dispatch(DiscountAction(null));
                                                                            navigate('/success');
                                                                        }
                                                                    })
                                                                    .catch((error) => {
                                                                        const message = error?.response?.data?.message;
                                                                        toast.error(message);
                                                                        setIsProcessing(false);
                                                                        console.log('error in place order handler : ', error);
                                                                    })
                                                            }
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        console.log('error in add shipping address : ', error);
                                                    })
                                            }
                                        })
                                        .catch((error) => {
                                            console.log('error in add billing address : ', error);
                                        })
                                }
                            })
                            .catch((error) => {
                                console.log('error in getting user by email : ', error);
                            })
                    }
                });
        }
    }, [validateForm, dispatch])

    const createPayment = (orderDetails) => {
        setIsProcessing(true);
        const obj = {
            amount: orderDetails?.total,
            // orderId: orderDetails?.orderId,
            MUID: "MUID" + Date.now(),
            transactionId: 'T' + Date.now(),
            orderDetail: orderDetails
        }
        sessionStorage.removeItem('paymentToken');
        sessionStorage.removeItem('orderId');
        axios.post(Requests.CREATE_PAYMENT, { ...obj })
            .then(res => {
                const { url, orderId, token } = res.data;
                const sessionObject = {
                    orderId: orderId,
                    token: token,
                    status: 'checked'
                }
                updatePaymentStatusHandler(sessionObject);
                sessionStorage.setItem('paymentToken', token);
                sessionStorage.setItem('orderId', orderId);
                setTimeout(() => {
                    setIsProcessing(false);
                    window.location.href = url;
                }, 500);
            })
            .catch(error => {
                setIsProcessing(false)
                console.error(error);
            });
    }


    const validateAddress = (address, errors) => {
        let valid = true;
        const newErrors = { ...errors };

        Object.keys(address).forEach((key) => {
            if (!address[key]) {
                newErrors[key] = true;
                valid = false;
            } else {
                newErrors[key] = false;
            }
        });

        if (address.email === undefined || address.email === '') {
            newErrors.email = true;
            valid = false;
        } else if (!validateEmail(address.email)) {
            toast.error('Enter a valid email!');
            newErrors.email = true;
            valid = false;
        } else {
            newErrors.email = false;
        }

        if (address.phoneNumber === undefined || address.phoneNumber === '') {
            newErrors.phoneNumber = true;
            valid = false;
        } else if (address.phoneNumber.length !== 10) {
            toast.error('Enter a valid phone number!');
            newErrors.phoneNumber = true;
            valid = false;
        } else {
            newErrors.phoneNumber = false;
        }

        if (address.postcode === undefined || address.postcode === '') {
            newErrors.postcode = true;
            valid = false;
        } else if (address.postcode.length !== 6) {
            toast.error('Enter a valid postcode!');
            newErrors.postcode = true;
            valid = false;
        } else {
            newErrors.postcode = false;
        }

        return { valid, newErrors };
    };

    const handleContinueShopping = async () => {
        if (!mainEmail) {
            setMainEmailError(true);
            toast.error('Contact mail is required!');
            return;
        } else {
            setMainEmailError(false);
            if (mainEmail && !validateEmail(mainEmail)) {
                setMainEmailError(true);
                toast.error('Enter valid email!');
                return;
            }
        }
        const billingValidation = validateAddress(billingAddress, billingAddressError);
        const shippingValidation = validateAddress(shippingAddress, shippingAddressError);
        if (!billingValidation.valid) {
            setBillingAddressError(billingValidation.newErrors);
            toast.error('Please fill required fields!');
            return;
        }
        if (!shippingValidation.valid) {
            setShippingAddressError(shippingValidation.newErrors);
            toast.error('Please fill required fields!');
            return;
        }
        if (billingValidation.valid && shippingValidation.valid) {
            if (!user) {
                const displayName = mainEmail?.toString().split('@');
                const userObj = { email: mainEmail, displayName: displayName[0] };
                const userExist = await getUserIfExistHandler(userObj);
                if (userExist) {
                    toast.error('User already exist!');
                    setMainEmailError(true);
                    alert('Login with this email or change contact email to place order')
                    return;
                }
            }
            if (user) {
                const billingObj = { userId: user?._id, ...billingAddress };
                const shippingObj = { userId: user?._id, ...shippingAddress };
                await addBillingAddressHandler(dispatch, billingObj, user?._id);
                addShippingAddressHandler(dispatch, shippingObj, user?._id)
                    .then((shippingResponse) => {
                        var shippingObject = {
                            state: shippingResponse?.shippingAddress?.state,
                            city: shippingResponse?.shippingAddress?.city,
                            postcode: shippingResponse?.shippingAddress?.postcode,
                            charges: shipping?.charges
                        }
                        if (subTotal >= 500) {
                            shippingObject.charges = 'free';
                        } else {
                            if (shippingObject.state.toLowerCase() === 'gujarat') {
                                shippingObject.charges = 50;
                            } else {
                                shippingObject.charges = 65;
                            }
                        }
                        dispatch(ShippingAction(shippingObject));
                    });
            }
            var shippingObject = {
                state: shippingAddress?.state,
                city: shippingAddress?.city,
                postcode: shippingAddress?.postcode,
                charges: shipping?.charges
            }
            if (subTotal >= 500) {
                shippingObject.charges = 'free';
            } else {
                if (shippingObject.state.toLowerCase() === 'gujarat') {
                    shippingObject.charges = 50;
                } else {
                    shippingObject.charges = 65;
                }
            }
            dispatch(ShippingAction(shippingObject));
            const obj = {
                email: mainEmail,
                products: usercart,
                orderBillingAddress: billingAddress,
                orderShippingAddress: shippingAddress,
                subTotal: subTotal,
            };
            return obj;
        }
    };
    const handleShippingAddressCheck = () => {
        if (sameAsBillingAddressChecked) {
            setSameAsBillingAddressChecked(false);
            setShippingAddress({
                firstName: userShippingAddress?.firstName || '',
                lastName: userShippingAddress?.lastName || '',
                phoneNumber: userShippingAddress?.phoneNumber || '',
                email: userShippingAddress?.email || user?.email,
                streetAddress: userShippingAddress?.houseNumberAndStreetName || userShippingAddress?.streetAddress || '',
                apartment: userShippingAddress?.apartment || '',
                city: userShippingAddress?.city || shipping?.city || '',
                postcode: userShippingAddress?.postcode || shipping?.postcode || '',
                state: userShippingAddress?.state || shipping?.state || ''
            });
        } else {
            setSameAsBillingAddressChecked(true);
            setShippingAddress({ ...billingAddress });
        }
    }
    return (
        <div>
            {
                !user
                &&
                <div className='my-4'>
                    <span style={{
                        fontSize: '130%',
                        fontWeight: 'bolder',
                        color: '#333'
                    }}>
                        Contact Information
                    </span>
                    <div className='flex flex-col mt-4 mb-6'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Email Address *
                        </span>
                        <Input name="email" onChange={(e) => setMainEmail(e.target.value)} error={mainEmailError} />
                    </div>
                </div>
            }
            {/* billing Address */}
            <div>
                <span style={{
                    fontSize: '130%',
                    fontWeight: 'bolder',
                    color: '#333'
                }}>
                    Billing details
                </span>
                <div className='mt-4'>
                    <div className='flex w-full'>
                        <div className='flex flex-col mb-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                First Name *
                            </span>
                            <Input onChange={onBillingInput} name="firstName"
                                error={billingAddressError.firstName} defaultValue={user?.billingAddress?.firstName} />
                        </div>
                        <div className='flex flex-col mb-2 ml-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Last Name *
                            </span>
                            <Input onChange={onBillingInput} name="lastName"
                                error={billingAddressError.lastName} defaultValue={billingAddress.lastName} />
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='flex flex-col mb-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Phone Number *
                            </span>
                            <Input onChange={onBillingInput} name="phoneNumber"
                                error={billingAddressError.phoneNumber} defaultValue={billingAddress.phoneNumber} />
                        </div>
                        <div className='flex flex-col mb-2 ml-2 flex-grow'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Email Address *
                            </span>
                            <Input onChange={onBillingInput} name="email"
                                error={billingAddressError.email} value={user?.email} />
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Street Address *
                        </span>
                        <Input onChange={onBillingInput} name="streetAddress"
                            error={billingAddressError.streetAddress} defaultValue={billingAddress.streetAddress} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Apartment, suite, unit etc. *
                        </span>
                        <Input
                            onChange={onBillingInput}
                            name="apartment"
                            defaultValue={billingAddress.apartment}
                            error={billingAddressError.apartment} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            State *
                        </span>
                        <select
                            className='p-2 rounded-lg w-full outline-none'
                            style={billingAddressError.state ?
                                { border: '1px solid red' }
                                :
                                { border: '1px solid #d3d3d3' }}
                            onChange={onBillingInput}
                            name='state'>
                            <option selected>select a state</option>
                            {
                                states.map((item, index) => {
                                    return <option key={index}
                                        selected={item?.state_name === billingAddress?.state}>
                                        {item?.state_name}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Town / City *
                        </span>
                        <Input onChange={onBillingInput}
                            name="city"
                            error={billingAddressError.city} defaultValue={billingAddress.city} />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                            Postcode / ZIP *
                        </span>
                        <Input onChange={onBillingInput} name="postcode"
                            error={billingAddressError.postcode} defaultValue={billingAddress.postcode} />
                    </div>

                </div>
            </div>
            <div className='mt-6'>
                <div className='flex justify-between'>
                    <div>
                        <span style={{
                            fontSize: '130%',
                            fontWeight: 'bolder',
                            color: '#333'
                        }}>
                            Shipping Address
                        </span>
                    </div>
                    <div className='mt-1 sm:mt-0'>
                        <input type='checkbox' onChange={handleShippingAddressCheck}
                            className='mr-2 cursor-pointer outline-none'
                            checked={sameAsBillingAddressChecked} />
                        <label className='text-[#4D4D4D] text-base font-semibold cursor-pointer'
                            onClick={handleShippingAddressCheck}>
                            Same as Billing Address
                        </label>
                    </div>
                </div>
                {
                    sameAsBillingAddressChecked
                        ?
                        <>
                            <div className='mt-4'>
                                <div className='flex w-full'>
                                    <div className='flex flex-col mb-2 flex-grow'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            First Name *
                                        </span>
                                        <Input onChange={onShippingInput} name="firstName"
                                            error={shippingAddressError.firstName} value={shippingAddress.firstName} />
                                    </div>
                                    <div className='flex flex-col mb-2 ml-2 flex-grow'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Last Name *
                                        </span>
                                        <Input onChange={onShippingInput} name="lastName"
                                            error={shippingAddressError.lastName} value={shippingAddress.lastName} />
                                    </div>
                                </div>
                                <div className='flex w-full'>
                                    <div className='flex flex-col mb-2 flex-grow'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Phone Number *
                                        </span>
                                        <Input onChange={onShippingInput} name="phoneNumber"
                                            error={shippingAddressError.phoneNumber} value={shippingAddress.phoneNumber} />
                                    </div>
                                    <div className='flex flex-col mb-2 ml-2 flex-grow'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Email Address *
                                        </span>
                                        <Input onChange={onShippingInput} name="email"
                                            error={shippingAddressError.email} value={shippingAddress?.email} />
                                    </div>
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        Street Address *
                                    </span>
                                    <Input onChange={onShippingInput} name="streetAddress"
                                        error={shippingAddressError.streetAddress} value={shippingAddress.streetAddress} />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        Apartment, suite, unit etc. *
                                    </span>
                                    <Input
                                        onChange={onShippingInput}
                                        name="apartment"
                                        value={shippingAddress.apartment}
                                        error={shippingAddressError.apartment} />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        State *
                                    </span>
                                    <select
                                        className='p-2 rounded-lg w-full outline-none'
                                        style={shippingAddressError.state ?
                                            { border: '1px solid red' }
                                            :
                                            { border: '1px solid #d3d3d3' }}
                                        onChange={onShippingInput}
                                        name='state'>
                                        <option selected>select a state</option>
                                        {
                                            states.map((item, index) => {
                                                return <option key={index}
                                                    selected={item?.state_name === shippingAddress?.state}>
                                                    {item?.state_name}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        Town / City *
                                    </span>
                                    <Input onChange={onShippingInput}
                                        name="city"
                                        error={shippingAddressError.city} value={shippingAddress.city} />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        Postcode / ZIP *
                                    </span>
                                    <Input onChange={onShippingInput} name="postcode"
                                        error={shippingAddressError.postcode} value={shippingAddress.postcode} />
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className='mt-4'>
                                <div className='flex w-full'>
                                    <div className='flex flex-col mb-2 flex-grow'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            First Name *
                                        </span>
                                        <Input onChange={onShippingInput} name="firstName"
                                            error={shippingAddressError.firstName} defaultValue={shippingAddress.firstName} />
                                    </div>
                                    <div className='flex flex-col mb-2 ml-2 flex-grow'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Last Name *
                                        </span>
                                        <Input onChange={onShippingInput} name="lastName"
                                            error={shippingAddressError.lastName} defaultValue={shippingAddress.lastName} />
                                    </div>
                                </div>
                                <div className='flex w-full'>
                                    <div className='flex flex-col mb-2 flex-grow'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Phone Number *
                                        </span>
                                        <Input onChange={onShippingInput} name="phoneNumber"
                                            error={shippingAddressError.phoneNumber} defaultValue={shippingAddress.phoneNumber} />
                                    </div>
                                    <div className='flex flex-col mb-2 ml-2 flex-grow'>
                                        <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                            Email Address *
                                        </span>
                                        <Input onChange={onShippingInput} name="email"
                                            error={shippingAddressError.email} value={user?.email} />
                                    </div>
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        Street Address *
                                    </span>
                                    <Input onChange={onShippingInput} name="streetAddress"
                                        error={shippingAddressError.streetAddress} defaultValue={shippingAddress.streetAddress} />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        Apartment, suite, unit etc. *
                                    </span>
                                    <Input
                                        onChange={onShippingInput}
                                        name="apartment"
                                        defaultValue={shippingAddress.apartment}
                                        error={shippingAddressError.apartment} />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        State *
                                    </span>
                                    <select
                                        className='p-2 rounded-lg w-full outline-none'
                                        style={shippingAddressError.state ?
                                            { border: '1px solid red' }
                                            :
                                            { border: '1px solid #d3d3d3' }}
                                        onChange={onShippingInput}
                                        name='state'>
                                        <option selected>select a state</option>
                                        {
                                            states.map((item, index) => {
                                                return <option key={index}
                                                    selected={item?.state_name === shippingAddress?.state}>
                                                    {item?.state_name}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        Town / City *
                                    </span>
                                    <Input onChange={onShippingInput}
                                        name="city"
                                        error={shippingAddressError.city} defaultValue={shippingAddress.city} />
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                        Postcode / ZIP *
                                    </span>
                                    <Input onChange={onShippingInput} name="postcode"
                                        error={shippingAddressError.postcode} defaultValue={shippingAddress.postcode} />
                                </div>
                            </div>
                        </>
                }
            </div>
            {/* <div className='flex justify-between items-center'>
                <div onClick={() => navigate('/shopping-cart')}
                    className='flex uppercase transition-all cursor-pointer
                                ease-in-out duration-200 font-semibold text-[#333] hover:text-[#d0bdac]'>
                    <span className='mr-1 mt-[2px]'><FaChevronLeft /></span>
                    <span
                        style={{
                            fontSize: '90%',
                        }}>
                        Return to cart
                    </span>
                </div>
                <div>
                    <button
                        className='transition-all ease-in-out duration-200
                         bg-[#d0bdac] text-white hover:bg-[#bfae9e] uppercase outline-none'
                        style={{
                            letterSpacing: '2px',
                            lineHeight: '1.4',
                            height: '42px',
                            fontSize: '12px',
                            padding: '0 30px',
                            borderRadius: '5px',
                            fontWeight: '600'
                        }} onClick={handleContinueShopping}>
                        Continue shipping
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default OrderAddressForm
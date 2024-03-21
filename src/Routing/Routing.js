import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Checkout from '../Pages/Checkout';
import { ToastContainer } from 'react-toastify';
import MyAccount from '../Pages/MyAccount';
import Header from '../Components/GeneralComponents/Header';
import { addToUserCartHandler, getUserByIdRequestHandler, getUserCartByIdHandler, getUserOrdersHandler } from '../RequestHandlers/RequestHandler/UserRequestHandler';
import { useDispatch } from 'react-redux';
import useUserState from '../Hooks/useUserState';
import { getAllProductsHandler, getDiscountOfferHandler, getProductByIdRequestHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import { DiscountAction, ShippingAction, SubTotalAction, TotalAction, UserCartAction, UserLocalCartAction, UserLocalWishlistAction, UserWishlistAction } from '../Redux/Actions/UserActions/UsersAction';
import Products from '../Pages/Products';
import { showSingleProductAction } from '../Redux/Actions/ProductsActions/ProductsActions';
import AuthenticateDialog from '../Components/GeneralComponents/AuthenticateDialog';
import Sidebar from '../Components/GeneralComponents/Sidebar';
import useComponentState from '../Hooks/useComponentState';
import ShoppingCart from '../Pages/ShoppingCart';
import ContactUs from '../Pages/ContactUs';
import CommonFooter from '../Components/GeneralComponents/CommonFooter';
import ScrollToTop from '../Pages/ScrollToTop';
import AboutUs from '../Pages/AboutUs';
import Blogs from '../Pages/Blogs';
import ResetPassword from '../Pages/ResetPassword';
import OrderPay from '../Pages/OrderPay';
import { MobileViewAction } from '../Redux/Actions/ComponentActions/ComponentActions';
import UserMenuSidebar from '../Components/GeneralComponents/UserMenuComponents/UserMenuSidebar';
import PrivacyPolicy from '../Pages/PrivacyPolicy';
import TermsOfService from '../Pages/TermsOfService';
import ShippingPolicy from '../Pages/ShippingPolicy';
import CancellationRefundPolicy from '../Pages/CancellationRefundPolicy';
import { getAllCompanyHandler } from '../RequestHandlers/RequestHandler/CompanyRequestHandler';

const Routing = () => {
    const userId = localStorage.getItem('userId');
    const componentState = useComponentState();
    const { mobile } = useComponentState();
    const wishlocalWishList = JSON.parse(localStorage.getItem('wishlist'));
    const userLocalCart = JSON.parse(localStorage.getItem('cart'));
    const showProduct = sessionStorage.getItem('product');
    const { localWishlist, localUserCart, user, shipping, usercart, subTotal, discount, coupon } = useUserState();
    const dispatch = useDispatch();
    const dispatchRef = useRef(dispatch);
    const wishlocalWishListRef = useRef(wishlocalWishList);
    const userLocalCartRef = useRef(userLocalCart);

    useLayoutEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768;
            dispatch(MobileViewAction((isMobile)));
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch])

    useEffect(() => {
        if (coupon) {
            const discountAmount = Math.floor((subTotal * coupon?.percentage) / 100);
            const subAmount = subTotal - discountAmount;

            dispatch(DiscountAction(discountAmount));
            dispatch(SubTotalAction(subAmount));
        }
    }, [coupon, dispatch])

    useEffect(() => {
        if (subTotal) {
            dispatch(TotalAction(subTotal));
        }
        if (shipping?.charges === 'free') {            
            return;
        }
        if (shipping && shipping?.charges > 0) {            
            dispatch(TotalAction(subTotal + parseInt(shipping?.charges)));
        }
    }, [subTotal, shipping, dispatch])

    useLayoutEffect(() => {
        if (usercart?.length > 0) {
            let sum = 0;
            usercart?.forEach((item) => {
                sum += parseInt(Object.values(item?.option)) * parseInt(item?.quantity);
            })
            if (discount) {
                dispatch(SubTotalAction(Math.ceil(sum - discount)));
                return;
            } else {
                dispatch(SubTotalAction(sum));
            }
        }
    }, [usercart, discount, dispatch])

    useLayoutEffect(() => {
        if (usercart?.length > 0 && coupon) {
            let sum = 0;
            usercart?.forEach((item) => {
                sum += parseInt(Object.values(item?.option)) * parseInt(item?.quantity);
            })
            if (coupon) {
                const discountAmount = Math.floor((sum * coupon?.percentage) / 100);
                const subAmount = sum - discountAmount;

                dispatch(DiscountAction(discountAmount));
                dispatch(SubTotalAction(subAmount));
            }
        }
    }, [usercart, coupon, dispatch])


    useEffect(() => {
        if (subTotal >= 500) {
            dispatch(ShippingAction(
                {
                    state: user?.shippingAddress?.state,
                    city: user?.shippingAddress?.city,
                    postcode: user?.shippingAddress?.postcode,
                    charges: 'free'
                }));
        } else {
            if (user?.shippingAddress?.state?.toLowerCase() === 'gujarat') {
                dispatch(ShippingAction(
                    {
                        state: user?.shippingAddress?.state,
                        city: user?.shippingAddress?.city,
                        postcode: user?.shippingAddress?.postcode,
                        charges: 50
                    }));
            } else {
                dispatch(ShippingAction(
                    {
                        state: user?.shippingAddress?.state,
                        city: user?.shippingAddress?.city,
                        postcode: user?.shippingAddress?.postcode,
                        charges: 65
                    }));
            }
        }
    }, [user, subTotal, dispatch])

    useEffect(() => {
        if (user) {
            if (localUserCart.length > 0) {
                for (let i = 0; i < localUserCart.length; i++) {
                    let obj = {
                        userId: user?._id,
                        productId: localUserCart[i]?.id,
                        option: localUserCart[i]?.option,
                        quantity: localUserCart[i]?.quantity
                    }
                    addToUserCartHandler(obj);
                }
                dispatch(UserLocalCartAction([]));
                localStorage.setItem('cart', JSON.stringify([]));
            }
            getUserCartByIdHandler(dispatch, user?._id);
        }
    }, [user, dispatch, localUserCart])

    useEffect(() => {
        const wishlocalWishList = wishlocalWishListRef.current;

        if (wishlocalWishList?.length > 0) {
            dispatchRef.current(UserLocalWishlistAction([...wishlocalWishList]));
        }

        const userLocalCartList = userLocalCartRef.current;

        if (userLocalCartList?.length > 0) {
            dispatchRef.current(UserLocalCartAction([...userLocalCartList]));
        }
    }, []);

    useEffect(() => {
        if (showProduct) {
            getProductByIdRequestHandler(showProduct)
                .then((product) => {
                    dispatch(showSingleProductAction(product));
                })
                .catch((error) => {
                    console.log('error in getting product : ', error);
                });
        }
    }, [showProduct, dispatch])

    useEffect(() => {
        const updateCart = async () => {
            const localCart = [];
            for (let i = 0; i < localUserCart?.length; i++) {

                try {
                    const product = await getProductByIdRequestHandler(localUserCart[i]?.id);
                    const obj = {
                        product: product,
                        quantity: localUserCart[i]?.quantity,
                        option: localUserCart[i]?.option
                    }
                    localCart.push(obj);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
            dispatch(UserCartAction(localCart));
        }
        updateCart();
    }, [dispatch, localUserCart])
    useEffect(() => {
        const updateWishlist = async () => {
            const wishlistProduct = [];
            for (let i = 0; i < localWishlist.length; i++) {
                try {
                    const product = await getProductByIdRequestHandler(localWishlist[i]);
                    wishlistProduct.push(product);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            }
            dispatch(UserWishlistAction(wishlistProduct));
        };

        updateWishlist();
    }, [dispatch, localWishlist]);

    useEffect(() => {
        if (userId) {
            getUserByIdRequestHandler(dispatch, userId);
            getUserOrdersHandler(dispatch, userId);
        }
    }, [userId, dispatch])

    useEffect(() => {
        getDiscountOfferHandler(dispatch);
        getAllCompanyHandler(dispatch);
        getAllProductsHandler(dispatch);
    }, [dispatch]);

    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                {
                    componentState?.header
                    &&
                    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                        <Header />
                    </div>
                }
                <div className={mobile ? 'mt-20' : 'mt-36'}>
                    <Routes>
                        <Route path='/home' element={<Home />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/checkout/order-pay' element={<OrderPay />} />
                        <Route path='/my-account/*' element={<MyAccount />} />
                        <Route path='/product' element={<Products />} />
                        <Route path='/shopping-cart' element={<ShoppingCart />} />
                        <Route path='/contact-us' element={<ContactUs />} />
                        <Route path='/about-us' element={<AboutUs />} />
                        <Route path='/reset-password/:token' element={<ResetPassword />} />
                        <Route path='/blogs' element={<Blogs />} />
                        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                        <Route path='/terms-of-service' element={<TermsOfService />} />
                        <Route path='/shipping-policy' element={<ShippingPolicy />} />
                        <Route path='/cancellation-return-refund-policy' element={<CancellationRefundPolicy />} />
                        <Route path='*' element={<Navigate to={'/home'} />} />
                    </Routes>
                </div>
                {
                    componentState?.footer
                    &&
                    <div className='h-full'>
                        <CommonFooter />
                    </div>
                }
                {
                    componentState?.authenticate
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-white rounded-md h-auto w-[90%] sm:w-auto">
                            <AuthenticateDialog />
                        </div>
                    </div>
                }
                {
                    componentState?.cart &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                        <Sidebar dispatch={dispatch} />
                    </div>
                }
                {
                    componentState?.menu &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                        <UserMenuSidebar dispatch={dispatch} />
                    </div>
                }
            </BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Routing;
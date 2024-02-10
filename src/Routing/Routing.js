import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Checkout from '../Pages/Checkout';
import { ToastContainer } from 'react-toastify';
import MyAccount from '../Pages/MyAccount';
import Header from '../Components/GeneralComponents/Header';
import { addToUserCartHandler, getUserByIdRequestHandler, getUserCartByIdHandler } from '../RequestHandlers/RequestHandler/UserRequestHandler';
import { useDispatch } from 'react-redux';
import useUserState from '../Hooks/useUserState';
import { getProductByIdRequestHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import { UserCartAction, UserLocalCartAction, UserLocalWishlistAction, UserWishlistAction } from '../Redux/Actions/UserActions/UsersAction';
import Products from '../Pages/Products';
import { showSingleProductAction } from '../Redux/Actions/ProductsActions/ProductsActions';
import AuthenticateDialog from '../Components/GeneralComponents/AuthenticateDialog';
import Sidebar from '../Components/GeneralComponents/Sidebar';
import useComponentState from '../Hooks/useComponentState';
import ShoppingCart from '../Pages/ShoppingCart';

const Routing = () => {
    const userId = localStorage.getItem('userId');
    const componentState = useComponentState();
    const wishlocalWishList = JSON.parse(localStorage.getItem('wishlist'));
    const userLocalCart = JSON.parse(localStorage.getItem('cart'));
    const showProduct = sessionStorage.getItem('product');
    const { localWishlist, localUserCart, user } = useUserState();
    const dispatch = useDispatch();
    const dispatchRef = useRef(dispatch);
    const wishlocalWishListRef = useRef(wishlocalWishList);
    const userLocalCartRef = useRef(userLocalCart);

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
        }
    }, [userId, dispatch])
    return (
        <>
            <BrowserRouter>
                <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                    <Header />
                </div>
                <div className='mt-36'>
                    <Routes>
                        <Route path='/home' element={<Home />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/my-account' element={<MyAccount />} />
                        <Route path='/product' element={<Products />} />
                        <Route path='/shopping-cart' element={<ShoppingCart />} />
                        <Route path='*' element={<Navigate to={'/home'} />} />
                    </Routes>
                </div>
                {
                    componentState?.authenticate
                    &&
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
                        <div className="bg-white rounded-md h-auto w-auto">
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
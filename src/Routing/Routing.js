import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Checkout from '../Pages/Checkout';
import { ToastContainer } from 'react-toastify';
import MyAccount from '../Pages/MyAccount';
import Header from '../Components/GeneralComponents/Header';
import { getUserByIdRequestHandler } from '../RequestHandlers/RequestHandler/UserRequestHandler';
import { useDispatch } from 'react-redux';
import useUserState from '../Hooks/useUserState';
import { getProductByIdRequestHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import { UserCartAction, UserLocalWishlistAction, UserWishlistAction } from '../Redux/Actions/UserActions/UsersAction';
import Products from '../Pages/Products';
import { showSingleProductAction } from '../Redux/Actions/ProductsActions/ProductsActions';
import AuthenticateDialog from '../Components/GeneralComponents/AuthenticateDialog';
import Sidebar from '../Components/GeneralComponents/Sidebar';
import useComponentState from '../Hooks/useComponentState';
import { fetchCartObjects } from '../Utils/cartFunction';

const Routing = () => {
    const userId = localStorage.getItem('userId');
    const componentState = useComponentState();
    const wishlocalWishList = JSON.parse(localStorage.getItem('wishlist'));
    const userLocalCart = JSON.parse(localStorage.getItem('cart'));
    const showProduct = sessionStorage.getItem('product');
    const { localWishlist } = useUserState();
    const dispatch = useDispatch();
    const dispatchRef = useRef(dispatch);
    const wishlocalWishListRef = useRef(wishlocalWishList);
    useEffect(() => {
        const wishlocalWishList = wishlocalWishListRef.current;

        if (wishlocalWishList?.length > 0) {
            dispatchRef.current(UserLocalWishlistAction([...wishlocalWishList]));
        }
    }, []);

    useEffect(() => {
        if (userLocalCart) {
            fetchCartObjects(userLocalCart)
                .then((cartObjects) => {
                    dispatch(UserCartAction(cartObjects));
                })
                .catch((error) => {
                    console.error('Error fetching cart objects:', error);
                });
        }
    }, [dispatch, userLocalCart])

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
                <div className='mt-32'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/my-account' element={<MyAccount />} />
                        <Route path='/product/*' element={<Products />} />
                    </Routes>
                </div>
            </BrowserRouter>
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
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
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
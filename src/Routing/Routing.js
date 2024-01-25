import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Checkout from '../Pages/Checkout';
import { ToastContainer } from 'react-toastify';
import MyAccount from '../Pages/MyAccount';
import Header from '../Components/Header';
import { getUserByIdRequestHandler } from '../RequestHandlers/RequestHandler/UserRequestHandler';
import { useDispatch } from 'react-redux';
import useUserState from '../Hooks/useUserState';
import { getProductByIdRequestHandler } from '../RequestHandlers/RequestHandler/ProductRequestHandler';
import { UserLocalWishlistAction, UserWishlistAction } from '../Redux/Actions/UserActions/UsersAction';

const Routing = () => {
    const userId = localStorage.getItem('userId');
    const wishlocalWishList = JSON.parse(localStorage.getItem('wishlist'));
    const { localWishlist } = useUserState();
    const dispatch = useDispatch();
    const dispatchRef = useRef(dispatch);
    const wishlocalWishListRef = useRef(wishlocalWishList);
    useEffect(() => {
        const wishlocalWishList = wishlocalWishListRef.current;

        if (wishlocalWishList.length > 0) {
            dispatchRef.current(UserLocalWishlistAction([...wishlocalWishList]));
        }
    }, []);
    // useEffect(() => {
    //     if (wishlocalWishList.length > 0) {
    //         dispatch(UserLocalWishlistAction([...wishlocalWishList]));
    //     };
    // }, []);
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


    // useEffect(() => {
    //     const updateWishlist = async () => {
    //         const wishlistProduct = [];
    //         for (let i = 0; i < localWishlist.length; i++) {
    //             const product = await getProductByIdRequestHandler(localWishlist[i]);
    //             wishlistProduct.push(product);
    //         }
    //         dispatch(UserWishlistAction(wishlistProduct));
    //     }
    //     updateWishlist();
    // }, [localWishlist])
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
                        <Route path='/' element={<Home />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/my-account' element={<MyAccount />} />
                    </Routes>
                </div>
            </BrowserRouter>
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
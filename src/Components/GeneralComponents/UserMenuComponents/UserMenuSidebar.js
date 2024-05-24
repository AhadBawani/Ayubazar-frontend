import React, { useEffect, useRef } from 'react';
import { AuthenticateDialogAction, MyAccountOptionAction, UserMenuAction } from '../../../Redux/Actions/ComponentActions/ComponentActions';
import useComponentState from '../../../Hooks/useComponentState';
import { IoMdClose } from "react-icons/io";
import { HiOutlineIdentification } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";
import useUserState from '../../../Hooks/useUserState';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserAction } from '../../../Redux/Actions/UserActions/UsersAction';
import useProductsState from '../../../Hooks/useProductsState';
import { FilterProductAction } from '../../../Redux/Actions/ProductsActions/ProductsActions';

const UserMenuSidebar = ({ dispatch }) => {
    const wrapperRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const { menu } = useComponentState();
    const { user } = useUserState();
    const { products, defaultProducts, filterProduct } = useProductsState();
    const options = [
        { text: 'Dashboard', icon: <HiOutlineIdentification />, action: 'Dashboard' },
        { text: 'Orders', icon: <GiShoppingCart />, action: 'Orders' },
        { text: 'Account Details', icon: <CgProfile />, action: 'Account-details' },
        { text: 'Addresses', icon: <CiLocationOn />, action: 'Addresses' },
        { text: 'Log out', icon: <RiLogoutCircleLine /> }
    ]

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // Click outside the component
                dispatch(UserMenuAction(false));
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [dispatch]);

    const handleActionDispatch = (action) => {
        dispatch(MyAccountOptionAction(action));
        dispatch(UserMenuAction(false));
    }

    const handleLogout = () => {
        localStorage.removeItem('userId');
        dispatch(UserAction(null));
        navigate('/');
    }
    const handleLogin = () => {
        dispatch(UserMenuAction(null));
        dispatch(AuthenticateDialogAction(true));
    }

    const handleFilterProduct = (item) => {        
        const filteredProduct = products?.filter((product) => product?.productCompany?._id === item?._id);
        dispatch(FilterProductAction({
            title: `${item?.companyName}'s Products`,
            products: filteredProduct
        }));

        // Scroll to the filterProduct component with some height offset
        const filterProductElement = document.getElementById('filterProduct');
        if (filterProductElement) {
            filterProductElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
        dispatch(UserMenuAction(false));
    }

    return (
        <div
            ref={wrapperRef}
            className={
                menu
                    ? 'fixed top-0 left-0 w-[80%] sm:w-[410px] h-screen bg-white z-10 transition-transform duration-500 ease-in-out transform translate-x-0 p-2 overflow-y-hidden'
                    : 'fixed top-0 left-0 w-[80%] sm:w-[410px] h-screen bg-white z-10 transition-transform duration-500 ease-in-out transform translate-x-full p-2 overflow-y-hidden'
            }
        >
            <div className='flex justify-end items-end mr-1'>
                <IoMdClose
                    className="w-7 h-7 cursor-pointer rounded-full hover:bg-gray-200 m-2"
                    onClick={() => dispatch(UserMenuAction(false))} />
            </div>
            <div className="">
                <div className='p-2'>
                    {
                        location.pathname === '/my-account'
                            ?
                            <>
                                {
                                    user
                                        ?
                                        <>
                                            {
                                                user &&
                                                <>
                                                    <div className='flex flex-col'>
                                                        <span
                                                            style={{ lineHeight: '1.6' }}
                                                            className='text-[#888] font-bold'>
                                                            Welcome
                                                        </span>
                                                        <span
                                                            style={{ lineHeight: '1.6' }}
                                                            className='mt-1 font-bold'>
                                                            {user?.displayName}
                                                        </span>
                                                    </div>
                                                    <hr className='my-4' />
                                                </>
                                            }
                                            <div className='flex flex-col'>
                                                {
                                                    options.map((item, index) => {
                                                        return <div key={index} className='flex text-[#999] mb-3'
                                                            onClick={() => item.text === 'Log out' ?
                                                                handleLogout()
                                                                :
                                                                handleActionDispatch(item.action)}>
                                                            <span className='text-2xl'>{item.icon}</span>
                                                            <span className='ml-2 text-xl'>{item.text}</span>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className='flex flex-col justify-center items-center mt-6'>
                                                <span className='text-xl font-bold mb-2'>
                                                    Good to see you here!
                                                </span>
                                                <button
                                                    style={{
                                                        letterSpacing: '2px',
                                                        lineHeight: '1.4',
                                                        height: '42px',
                                                        fontSize: '12px'
                                                    }}
                                                    className='w-[100%] uppercase font-bold
                                                    bg-[#027148] hover:bg-[#013220] outline-none 
                                                    text-white p-2 rounded-md transition-all 
                                                    ease-in-out duration-200' onClick={handleLogin}>
                                                    Login
                                                </button>
                                            </div>
                                        </>
                                }
                            </>
                            :
                            <>
                                <div className='mt-4'>
                                    {
                                        defaultProducts?.map((item, index) => {
                                            const split = filterProduct?.title?.split("'");                                            
                                            return <div key={index}>
                                                <div className={item?.companyName === split[0] ?
                                                `text-xl 
                                                font-semibold p-2 cursor-pointer text-[#999]` : `text-xl 
                                                font-semibold p-2 cursor-pointer text-[#333]`}
                                                    onClick={() => handleFilterProduct(item)}>
                                                    <span>{item?.companyName} ({item?.products?.length})</span>
                                                </div>
                                                <hr />
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserMenuSidebar;

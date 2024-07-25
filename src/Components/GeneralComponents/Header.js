import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import SearchInput from './SearchInput';
import logo from '../../Images/logo.png';
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { AuthenticateDialogAction, OpenCartAction, UserMenuAction } from '../../Redux/Actions/ComponentActions/ComponentActions';
import useUserState from '../../Hooks/useUserState';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';
import useProductsState from '../../Hooks/useProductsState';
import SubHeader from './SubHeader';
import { FaSearch } from "react-icons/fa";
import useComponentState from '../../Hooks/useComponentState';
import { IoMenu } from "react-icons/io5";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useUserState();
    const { usercart, wishlist } = useUserState();
    const { products } = useProductsState();
    const { mobile } = useComponentState();
    const [userCartQuantity, setUserCartQuantity] = useState();
    const [searchProductPage, setSearchProductPage] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (usercart?.length > 0) {
            let sum = 0;
            usercart.map((item) => {
                sum += item?.quantity;
                return null;
            })
            setUserCartQuantity(sum);
        }
    }, [usercart])

    const handleShowMenu = () => {
        dispatch(UserMenuAction(true));
    }

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <>
            {
                mobile
                    ?
                    <>
                        <div className='m-2 p-2 flex items-center max-w-sm'>
                            {/* Menu icon */}
                            <div className='flex justify-start'>
                                <IoMenu className='mt-[-3px] mr-1' size={24} onClick={handleShowMenu} />
                            </div>

                            {/* Logo centered */}
                            <div className='flex justify-center flex-grow'> {/* Use flex-grow to occupy remaining space */}
                                <img
                                    src={logo}
                                    alt='Ayubazar'
                                    className='cursor-pointer max-w-[180px]'
                                    height='180px'
                                    width='180px'
                                    onClick={() => navigate('/')}
                                />
                            </div>

                            {/* Icons on the right */}
                            <div className='flex justify-end mr-[-16px]'>
                                {/* Shopping Bag icon */}
                                {/* Search icon */}
                                <div className='mr-[8px] mt-2'>
                                    <FaSearch
                                        size={22}
                                        className='text-gray-600'
                                        onClick={() => setSearchProductPage(true)} />
                                </div>
                                <div className='relative'>
                                    {/* Shopping Bag icon */}
                                    <div
                                        className='rounded-full hover:bg-gray-200 p-1 cursor-pointer mr-1'
                                        onClick={() => dispatch(OpenCartAction('usercart'))}
                                    >
                                        <FiShoppingBag
                                            className='cursor-pointer text-gray-600'
                                            style={{ fontSize: '1.7rem' }}
                                        />
                                    </div>
                                    {/* Quantity badge */}
                                    {usercart && usercart.length > 0 && (
                                        <div className='absolute top-0 right-0 bg-[#f76b6a] 
                text-white rounded-full h-[17px] w-[17px] flex items-center justify-center'
                                            style={{
                                                fontSize: '11px', color: '#fff', textAlign: 'center',
                                                boxShadow: '1px 1px 3px 0 rgba(0,0,0,.3)'
                                            }}>
                                            {userCartQuantity}
                                        </div>
                                    )}
                                </div>
                                <div className='rounded-full hover:bg-gray-200 p-1'>
                                    <CgProfile
                                        className='cursor-pointer text-gray-600'
                                        style={{ fontSize: '1.7rem' }}
                                        onClick={
                                            () => user ? navigate('/my-account')
                                                : dispatch(AuthenticateDialogAction(true))}
                                    />
                                </div>
                                {/* Profile icon */}

                            </div>
                        </div>
                        {
                            searchProductPage
                            &&
                            <>
                                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
                                    <div className="bg-white rounded-md h-auto sm:w-auto">
                                        <SearchInput setSearchProductPage={setSearchProductPage} />
                                    </div>
                                </div>
                            </>
                        }
                    </>
                    :
                    <>
                        <div
                            className='w-full p-1 h-[40px] text-white bg-[#074900] overflow-hidden relative cursor-pointer'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                className={`whitespace-nowrap animate-marquee`}
                                style={{
                                    animationPlayState: isPaused ? 'paused' : 'running',
                                }}
                            >
                                <span className="inline-block mr-6">We are proud to offer our shipping services to over 180+ countries worldwide</span>
                                <span className="inline-block mr-6">Any issues, please let us know. We are available on WhatsApp at +91 94285 60666</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-4 px-8">
                            <div className="flex items-center">
                                <img
                                    src={logo}
                                    alt='Ayubazar'
                                    className='cursor-pointer'
                                    height='180px'
                                    width='180px'
                                    onClick={() => navigate('/')} />
                            </div>

                            {/* Search input */}
                            <div className="flex-grow">
                                <SearchInput />
                            </div>

                            {/* Icons */}
                            <div className="flex gap-2">
                                <div className='rounded-full hover:bg-gray-200 p-2'>
                                    {
                                        user
                                            ?
                                            <>
                                                <Dropdown navigate={navigate} />
                                            </>
                                            :
                                            <CgProfile
                                                className=' cursor-pointer text-gray-600'
                                                style={{ fontSize: '1.7rem' }}
                                                onClick={() => dispatch(AuthenticateDialogAction(true))} />
                                    }
                                </div>

                                <div className='relative'>
                                    <div
                                        className='rounded-full hover:bg-gray-200 p-2 cursor-pointer'
                                        onClick={() => dispatch(OpenCartAction('usercart'))}
                                    >
                                        <FiShoppingBag
                                            className='cursor-pointer text-gray-600'
                                            style={{ fontSize: '1.7rem' }}
                                        />
                                    </div>
                                    {usercart && usercart.length > 0 && (
                                        <div className='absolute top-0 right-0 bg-[#f76b6a] 
                            text-white rounded-full h-[17px] w-[17px] flex items-center justify-center'
                                            style={{
                                                fontSize: '11px', color: '#fff', textAlign: 'center',
                                                boxShadow: '1px 1px 3px 0 rgba(0,0,0,.3)'
                                            }}>
                                            {userCartQuantity}
                                        </div>
                                    )}
                                </div>

                                <div className='relative'>
                                    <div
                                        className='rounded-full hover:bg-gray-200 p-2 cursor-pointer'
                                        onClick={() => dispatch(OpenCartAction('wishlist'))}
                                    >
                                        <FaRegHeart className='text-gray-600' style={{ fontSize: '1.7rem' }} />
                                    </div>
                                    {wishlist && wishlist.length > 0 && (
                                        <div className='absolute top-0 right-0 bg-[#f76b6a] 
                            text-white rounded-full h-[17px] w-[17px] flex items-center justify-center'
                                            style={{
                                                fontSize: '11px', color: '#fff', textAlign: 'center',
                                                boxShadow: '1px 1px 3px 0 rgba(0,0,0,.3)'
                                            }}>
                                            {wishlist.length}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <hr />
                            <SubHeader products={products} />
                        </div>
                    </>
            }
        </>
    )
}

export default Header;
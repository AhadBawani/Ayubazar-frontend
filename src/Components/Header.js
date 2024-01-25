import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import SearchInput from './SearchInput';
import logo from '../Images/Company logo.PNG';
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { AuthenticateDialogAction, OpenCartAction } from '../Redux/Actions/ComponentActions/ComponentActions';
import useUserState from '../Hooks/useUserState';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useUserState();
    const { wishlist } = useUserState();
    return (
        <>
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

                    <div className='rounded-full hover:bg-gray-200 p-2'>
                        <FiShoppingBag
                            className='cursor-pointer text-gray-600'
                            style={{ fontSize: '1.7rem' }}
                            onClick={() => dispatch(OpenCartAction('usercart'))} />
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
            <div className='mt-2 mb-4'>
                <hr />
                <div>
                    Company wise
                </div>
            </div>
        </>
    )
}

export default Header;
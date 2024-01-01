import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import SearchInput from './SearchInput';
import logo from '../Images/Company logo.PNG';
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { AuthenticateDialogAction, OpenCartAction } from '../Redux/Actions/ComponentActions/ComponentActions';

const Header = () => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="flex justify-between items-center py-4 px-8">
                <div className="flex items-center">
                    <img src={logo} alt='Ayubazar' className='cursor-pointer' height='180px' width='180px' />
                </div>

                {/* Search input */}
                <div className="flex-grow">
                    <SearchInput />
                </div>

                {/* Icons */}
                <div className="flex gap-2">
                    <div className='rounded-full hover:bg-gray-200 p-2'>
                        <CgProfile
                            className=' cursor-pointer text-gray-600'
                            style={{ fontSize: '1.7rem' }}
                            onClick={() => dispatch(AuthenticateDialogAction(true))} />
                    </div>

                    <div className='rounded-full hover:bg-gray-200 p-2'>
                        <FiShoppingBag
                            className='cursor-pointer text-gray-600'
                            style={{ fontSize: '1.7rem' }}
                            onClick={() => dispatch(OpenCartAction(true))} />
                    </div>

                    <div className='rounded-full hover:bg-gray-200 p-2'>
                        <FaRegHeart
                            className='cursor-pointer text-gray-600'
                            style={{ fontSize: '1.7rem' }}
                            onClick={() => dispatch(AuthenticateDialogAction(true))} />
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
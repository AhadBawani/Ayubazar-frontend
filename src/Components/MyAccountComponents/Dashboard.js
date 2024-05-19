import React from 'react'
import useUserState from '../../Hooks/useUserState';
import { HiOutlineIdentification } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { MyAccountOptionAction } from '../../Redux/Actions/ComponentActions/ComponentActions';
import { DiscountAction, TotalAction, UserAction, UserCartAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useUserState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const options = [
        { text: 'Dashboard', icon: <HiOutlineIdentification />, action: 'Dashboard' },
        { text: 'Orders', icon: <GiShoppingCart />, action: 'Orders' },
        { text: 'Account Details', icon: <CgProfile />, action: 'Account-details' },
        { text: 'Addresses', icon: <CiLocationOn />, action: 'Addresses' },
        { text: 'Log out', icon: <RiLogoutCircleLine /> }
    ]

    const handleActionDispatch = (action) => {
        dispatch(MyAccountOptionAction(action));
    }
    const handleLogout = () => {
        localStorage.removeItem('userId');
        dispatch(TotalAction(null));
        dispatch(UserCartAction(null));
        dispatch(DiscountAction(null));
        dispatch(UserAction(null));
        navigate('/');
    }
    return (
        <div>
            <div className='p-2 sm:p-0'>
                <span>
                    Hello {user?.displayName}
                    (not <b>{user?.displayName}</b>?
                    <span className='cursor-pointer hover:text-[#d0bdac] ml-1'>
                        Log out
                    </span>)
                </span>
                <div className='mt-4'>
                    <span>
                        From your account dashboard you can view your
                        <span className='cursor-pointer hover:text-[#d0bdac] mx-1 underline'
                            onClick={() => handleActionDispatch('Orders')}>
                            recent orders,
                        </span>
                        manage your
                        <span className='cursor-pointer hover:text-[#d0bdac] mx-1 underline'
                            onClick={() => handleActionDispatch('Addresses')}>
                            shipping and billing addresses,
                        </span>
                        and
                        <span className='cursor-pointer hover:text-[#d0bdac] mx-1 underline'
                            onClick={() => handleActionDispatch('Account-details')}>
                            edit your password and account details.
                        </span>
                    </span>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 my-6'>
                    {
                        options.map((item, index) => {
                            return <div
                                style={{ border: '1px solid #eee' }}
                                key={index}
                                className='w-full h-[120px] cursor-pointer
                            hover:bg-[#f6f6f6]
                            flex flex-col justify-center items-center text-2xl'
                                onClick={() => item.text === 'Log out' ? handleLogout() : handleActionDispatch(item.action)}>
                                <span className='text-5xl text-[#ccc]'>{item.icon}</span>
                                <span className='text-[#555] mt-2 text-center'>{item.text}</span>
                            </div>
                        })
                    }
                    {/* #ccc */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
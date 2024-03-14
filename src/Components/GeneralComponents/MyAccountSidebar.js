import React, { useEffect } from 'react';
import { HiOutlineIdentification } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { MyAccountOptionAction } from '../../Redux/Actions/ComponentActions/ComponentActions';
import useComponentState from '../../Hooks/useComponentState';
import { DiscountAction, TotalAction, UserAction, UserCartAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useNavigate } from 'react-router-dom';

const MyAccountSidebar = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myAccountOption } = useComponentState();
    const options = [
        { text: 'Dashboard', icon: <HiOutlineIdentification />, action: 'Dashboard' },
        { text: 'Orders', icon: <GiShoppingCart />, action: 'Orders' },
        { text: 'Account Details', icon: <CgProfile />, action: 'Account-details' },
        { text: 'Addresses', icon: <CiLocationOn />, action: 'Addresses' },
        { text: 'Log out', icon: <RiLogoutCircleLine /> }
    ]
    const handleActionDispatch = (action) => {
        dispatch(MyAccountOptionAction(action));
        navigate(`/my-account/${action}`);
    }
    useEffect(() => {
        if (!myAccountOption) {
            dispatch(MyAccountOptionAction('Dashboard'));
        }
    }, [dispatch, myAccountOption])

    const handleLogout = () => {
        dispatch(UserAction(null));
        dispatch(UserCartAction(null));
        dispatch(TotalAction(0));
        dispatch(DiscountAction(0));
        localStorage.removeItem('userId');
        navigate('/');
    }
    return (
        <div>
            <div style={{ border: '3px solid #eee' }} className='flex flex-col m-4 p-4'>
                <span className='text-[#888]'>Welcome</span>
                <span>{user?.displayName}</span>
            </div>
            <div className='uppercase'>
                {
                    options.map((item, index) => {
                        return <div className={myAccountOption === item.action ?
                            'text-black bg-[#f6f6f6] p-3 mx-4 cursor-pointer' : 'p-3 mx-4 cursor-pointer'}
                            style={{ border: 'solid 1px #eee' }}
                            key={index}
                            onClick={() => item.text === 'Log out' ? handleLogout() : handleActionDispatch(item.action)}>
                            <div
                                className={myAccountOption === item.action ? 'text-black flex font-medium text-lg' :
                                    'text-[#999999] flex font-medium text-lg'}>
                                <span className='mt-1'>
                                    {item?.icon}
                                </span>
                                <span className='ml-1'>
                                    {item?.text}
                                </span>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default MyAccountSidebar;
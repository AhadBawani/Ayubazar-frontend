import React, { useEffect, useState } from 'react'
import MyAccountSidebar from '../Components/GeneralComponents/MyAccountSidebar';
import useUserState from '../Hooks/useUserState';
import useComponentState from '../Hooks/useComponentState';
import Dashboard from '../Components/MyAccountComponents/Dashboard';
import Orders from '../Components/MyAccountComponents/Orders';
import AccountDetails from '../Components/MyAccountComponents/AccountDetails';
import Addresses from '../Components/MyAccountComponents/Addresses';
import Footer from '../Components/GeneralComponents/Footer';
import { useDispatch } from 'react-redux';
import { MyAccountOptionAction } from '../Redux/Actions/ComponentActions/ComponentActions';
import { useNavigate } from 'react-router-dom';
import { ImSpinner8 } from "react-icons/im";

const MyAccount = () => {
    const { user } = useUserState();
    const { myAccountOption } = useComponentState();
    const dispatch = useDispatch();
    const [isProcessing, setIsProccessing] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(MyAccountOptionAction('Dashboard'));
    }, [dispatch])
    useEffect(() => {
        if (!user) {
            setIsProccessing(true);
            setTimeout(() => {
                navigate('/');
                setIsProccessing(false);
            }, 1000)
        }
    }, [user, navigate])
    return (
        <>
            <div className='relative'>
                {isProcessing && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-10">
                        <ImSpinner8 size={36} className="animate-spin text-black" />
                    </div>
                )}
                <div className='flex'>
                    <div className='w-[350px] sm:block hidden'>
                        <MyAccountSidebar user={user} />
                    </div>
                    <div className='sm:mt-4 sm:ml-8 w-full'>
                        {myAccountOption === "Dashboard" && <Dashboard />}
                        {myAccountOption === "Orders" && <Orders />}
                        {myAccountOption === "Account-details" && <AccountDetails />}
                        {myAccountOption === "Addresses" && <Addresses />}
                    </div>
                </div>
                <div className='mt-6'>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default MyAccount;
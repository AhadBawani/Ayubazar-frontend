import React, { useEffect } from 'react'
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

const MyAccount = () => {
    const { user } = useUserState();
    const { myAccountOption } = useComponentState();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(MyAccountOptionAction('Dashboard'));
    }, [dispatch])
    return (
        <>
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
        </>
    )
}

export default MyAccount;
import React from 'react'
import MyAccountSidebar from '../Components/GeneralComponents/MyAccountSidebar';
import useUserState from '../Hooks/useUserState';
import useComponentState from '../Hooks/useComponentState';
import Dashboard from '../Components/MyAccountComponents/Dashboard';
import Orders from '../Components/MyAccountComponents/Orders';
import AccountDetails from '../Components/MyAccountComponents/AccountDetails';
import Addresses from '../Components/MyAccountComponents/Addresses';

const MyAccount = () => {
    const { user } = useUserState();
    const { myAccountOption } = useComponentState();
    return (
        <>
            <div className='flex'>
                <div className='w-[350px]'>
                    <MyAccountSidebar user={user} />
                </div>
                <div className='mt-4 ml-8 w-full'>
                    {myAccountOption === "Dashboard" && <Dashboard />}
                    {myAccountOption === "Orders" && <Orders />}
                    {myAccountOption === "Account-details" && <AccountDetails />}
                    {myAccountOption === "Addresses" && <Addresses />}
                </div>
            </div>
        </>
    )
}

export default MyAccount;
import { useState, useRef } from 'react';
import { CgProfile } from "react-icons/cg";
import useUserState from '../../Hooks/useUserState';
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { MyAccountOptionAction } from '../../Redux/Actions/ComponentActions/ComponentActions';
import UserLogout from '../../Hooks/UserLogout';

const Dropdown = ({ navigate }) => {
    const { user } = useUserState();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // Delay in milliseconds
    };

    const clearTimeOut = () => clearTimeout(timeoutRef.current);

    const handleNavigation = (route, action) => {
        navigate(route);
    }

    const handleComponentNavigation = (action) => {
        navigate('/my-account');
        dispatch(MyAccountOptionAction(action));
    }

    const handleUserLogout = () => {
        UserLogout();
    }
    return (
        <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={clearTimeOut}
        >
            <CgProfile style={{ fontSize: '1.7rem' }} className="cursor-pointer text-gray-600" onClick={() => navigate('/my-account')} />
            {isOpen && (
                <div className="absolute right-0 z-10 w-40 bg-white shadow-md py-2 rounded-md mt-2 transition-opacity duration-300 opacity-100">
                    <div className='py-2 px-4 font-semibold cursor-default'>{user?.displayName}</div>
                    <ul>
                        <li className="py-1 px-4
                         hover:text-[#7bdcb5] cursor-pointer"
                            onClick={() => handleNavigation('/my-account')}>
                            Dashboard
                        </li>
                        <li className="py-1 px-4
                         hover:text-[#7bdcb5] cursor-pointer"
                            onClick={() => handleComponentNavigation("Orders")}>
                            Orders
                        </li>
                        <li className="py-1 px-4
                         hover:text-[#7bdcb5] cursor-pointer"
                            onClick={() => handleComponentNavigation("Account-details")}>
                            Account Details
                        </li>
                        <li className="py-1 px-4
                         hover:text-[#7bdcb5] cursor-pointer"
                            onClick={() => handleComponentNavigation("Addresses")}>
                            Addresses
                        </li>
                    </ul>
                    <hr />
                    <div className='flex py-2 px-4
                    hover:text-[#7bdcb5] cursor-pointer' onClick={handleUserLogout}>
                        <RiLogoutCircleLine className='mt-1 mr-1' /> Log out
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

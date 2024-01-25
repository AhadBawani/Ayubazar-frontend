import React, { useEffect, useRef } from 'react'
import { OpenCartAction } from '../Redux/Actions/ComponentActions/ComponentActions';
import { FaChevronRight } from "react-icons/fa";
import useComponentState from '../Hooks/useComponentState';
import UserWishlist from './UserWishlist';
import UserCart from './UserCart';

const Sidebar = ({ dispatch }) => {
  const wrapperRef = useRef();
  const { cart } = useComponentState();
  const userCart = [];
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // Click outside the component
        dispatch(OpenCartAction(false));
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dispatch]);


  return (
    <>
      <div ref={wrapperRef} className={cart ?
        'fixed top-0 right-0 w-[410px] h-screen bg-white z-10 transition-transform duration-500 ease-in-out transform translate-x-0' :
        'fixed top-0 left-0 w-[410px] h-screen bg-white z-10 transition-transform duration-500 ease-in-out transform translate-x-full'}>
        <div className="flex items-center justify-between my-6">
          <span className="relative">
            <div className='p-2 rounded-full hover:bg-gray-200 ml-[-20px] bg-white mt-1' style={{ border: '1px solid grey' }}>
              <FaChevronRight
                className="w-7 h-7 cursor-pointer" onClick={() => dispatch(OpenCartAction(false))} />
            </div>
          </span>
          <div className="flex justify-center items-center flex-grow ml-[-40px] text-3xl font-semibold text-[#333333]">
            {cart === 'wishlist' ? 'Wishlist' : 'My cart'}
          </div>
        </div>
        <div>
          {
            cart === 'wishlist'
              ?
              <UserWishlist />
              :
              <UserCart userCart={userCart} dispatch={dispatch} />
          }
        </div>
      </div>
    </>
  )
}

export default Sidebar;
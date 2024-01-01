import React, { useEffect, useRef } from 'react'
import { OpenCartAction } from '../Redux/Actions/ComponentActions/ComponentActions';
import { FiShoppingBag } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";
import useComponentState from '../Utils/useComponentState';
import Button from '../Fields/Button';

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

  const handleReturnToShop = () => {
    dispatch(OpenCartAction(false));
  }
  return (
    <>
      <div ref={wrapperRef} className={cart ?
        'fixed top-0 right-0 w-[350px] h-screen bg-white z-10 transition-transform duration-500 ease-in-out transform translate-x-0' :
        'fixed top-0 left-0 w-[350px] h-screen bg-white z-10 transition-transform duration-500 ease-in-out transform translate-x-full'}>
        <div className="flex items-center justify-between my-6">
          <span className="relative">
            <div className='p-2 rounded-full hover:bg-gray-200 ml-[-20px] bg-white mt-1' style={{ border: '1px solid grey' }}>
              <FaChevronRight
                className="w-7 h-7 cursor-pointer" onClick={() => dispatch(OpenCartAction(false))} />
            </div>
          </span>
          <div className="flex justify-center items-center flex-grow ml-[-40px] text-3xl font-semibold text-[#333333]">
            My Cart
          </div>
        </div>
        <div>
          {
            userCart.length > 0
              ?
              <>
              </>
              :
              <>
                <div className='m-4 p-4 flex justify-center items-center flex-col h-full mt-16'>
                  <FiShoppingBag size={160} className='text-[#eee]' />
                </div>
                <div className='flex justify-center items-center text-lg text-[#333333]'>
                  <span>No products in the cart.</span>
                </div>
                <div className='flex justify-center items-center my-3'>
                  <Button text="Return to shop" color="#d0bdac" hoverColor="#bfae9e" width="80%" onClick={handleReturnToShop} />
                </div>
              </>
          }
        </div>
      </div>
    </>
  )
}

export default Sidebar;
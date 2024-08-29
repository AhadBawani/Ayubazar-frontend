import React from 'react';
import UserCartCard from './UserCartCard';
import CartFooter from './CartFooter';
import EmptyCart from './EmptyCart';
import useUserState from '../../../Hooks/useUserState';

const UserCart = () => {
    const { usercart } = useUserState();
    const filtered = usercart.filter((item) => item?.product?.outOfStock);
    return (
        <div className="relative h-full">
            <div className="overflow-auto max-h-[400px]"> {/* Adjust max height as needed */}
                {usercart?.length > 0 ? (
                    <div className='m-2 p-2'>
                        {usercart?.map((item, index) => (
                            <UserCartCard item={item} key={index} />
                        ))}
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </div>
            {
                filtered?.length > 0
                    ?
                    <>
                        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-1">
                            <div className='flex justify-center'>
                                <span className='text-base font-semibold text-red-500'>
                                    Please remove out of stock product for checkout!
                                </span>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {usercart?.length > 0 && <CartFooter />}
                    </>
            }
        </div>
    );
}

export default UserCart;

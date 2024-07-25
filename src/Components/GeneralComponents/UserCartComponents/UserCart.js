import React from 'react';
import UserCartCard from './UserCartCard';
import CartFooter from './CartFooter';
import EmptyCart from './EmptyCart';
import useUserState from '../../../Hooks/useUserState';

const UserCart = () => {
    const { usercart } = useUserState();
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
            {usercart?.length > 0 && <CartFooter />}
        </div>
    );
}

export default UserCart;

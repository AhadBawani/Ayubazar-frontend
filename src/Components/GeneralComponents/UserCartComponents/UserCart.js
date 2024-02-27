import React from 'react';
import UserCartCard from './UserCartCard';
import CartFooter from './CartFooter';
import EmptyCart from './EmptyCart';

const UserCart = ({ userCart }) => {    
    return (
        <div className="relative h-full">
            <div className="overflow-auto max-h-[400px]"> {/* Adjust max height as needed */}
                {userCart?.length > 0 ? (
                    <div className='m-2 p-2'>
                        {userCart?.map((item, index) => (
                            <UserCartCard item={item} key={index} />
                        ))}
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </div>
            {userCart?.length > 0 && <CartFooter />}
        </div>
    );
}

export default UserCart;

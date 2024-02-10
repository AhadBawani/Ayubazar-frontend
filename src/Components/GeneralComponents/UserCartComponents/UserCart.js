import React, { useEffect, useState } from 'react';
import UserCartCard from './UserCartCard';
import CartFooter from './CartFooter';
import EmptyCart from './EmptyCart';

const UserCart = ({ userCart }) => {
    const [total, setTotal] = useState();

    const calculateTotal = (usercart) => {
        let sum = 0;
        usercart?.map((item) => {
            sum += parseInt(item?.quantity) * parseInt(Object.values(item?.option));
            return null;
        })
        setTotal(sum);
    }

    useEffect(() => {
        calculateTotal(userCart);
    }, [userCart])
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
            {userCart?.length > 0 && <CartFooter total={total} />}
        </div>
    );
}

export default UserCart;

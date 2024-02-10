import React from 'react'
import useUserState from '../../Hooks/useUserState';
import ProductSidebarCard from './ProductSidebarCard';

const UserWishlist = () => {
    const { wishlist } = useUserState();
    
    return (
        <div className='m-4 p-4 h-full'>
            {
                wishlist?.map((product, index) => {                    
                    return <>
                        <ProductSidebarCard product={product} key={index} />
                    </>
                })
            }
        </div>
    )
}

export default UserWishlist;
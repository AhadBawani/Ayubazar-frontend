import React from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import useUserState from '../../Hooks/useUserState';
import { toast } from 'react-toastify';
import { UserLocalCartAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useDispatch } from 'react-redux';
import { addToUserCartHandler, getUserCartByIdHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler';


const OtherHoverOptions = ({ product, selectedOption }) => {
    const { user, localUserCart } = useUserState();
    const dispatch = useDispatch();

    const handleAddToCart = (event) => {
        event.stopPropagation();
        const updatedUserLocalCart = [...localUserCart];
        if (!selectedOption) {
            toast.error('Please an option');
        } else {
            if (!user) {
                if (localUserCart) {
                    const index = localUserCart.findIndex((usercart) => usercart.id === product?._id &&
                        Object.keys(usercart.option)[0] === Object.keys(selectedOption)[0]);

                    if (index >= 0) {
                        updatedUserLocalCart[index].quantity++;
                    } else {
                        const obj = {
                            id: product?._id,
                            quantity: 1,
                            option: selectedOption
                        }
                        updatedUserLocalCart.push(obj);
                    }
                    localStorage.setItem('cart', JSON.stringify(updatedUserLocalCart));
                    dispatch(UserLocalCartAction(updatedUserLocalCart));
                }
                else {
                    let arr = [];
                    arr.push({
                        id: product?._id,
                        quantity: 1,
                        option: selectedOption
                    });
                    localStorage.setItem('cart', JSON.stringify(arr));
                    dispatch(UserLocalCartAction(arr));
                }
            }
            else {
                const obj = {
                    userId: user?._id,
                    productId: product?._id,
                    option: selectedOption,
                    quantity: 1
                }
                addToUserCartHandler(obj)
                    .then((response) => {
                        if (response) {
                            getUserCartByIdHandler(dispatch, user?._id);
                        }
                    })
            }
            toast.success('Added to Cart');
        }
    }

    return (
        <>
            <div
                className='mt-2 p-2 ml-[-4px] bg-gray-800 rounded-full text-white absolute transition-transform'
                style={{
                    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                    opacity: '1',
                    transform: 'translateX(0)',
                }}>
                <MdOutlineRemoveRedEye size={16} className='cursor-pointer' />
            </div>
            <div>
                <div
                    className='mt-[9.5rem] p-1 ml-[-8px] rounded-full absolute transition-transform'
                    style={{
                        border: 'solid 3px #d0bdac'
                    }}
                    onClick={handleAddToCart}
                >
                    <IoBagHandleOutline size={24} className='cursor-pointer' />
                </div>
            </div>
        </>
    );
}

export default OtherHoverOptions;
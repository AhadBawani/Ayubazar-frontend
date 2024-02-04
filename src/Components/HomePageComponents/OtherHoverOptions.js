import React, { useEffect, useState } from 'react';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";
import useUserState from '../../Hooks/useUserState';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { UserCartAction } from '../../Redux/Actions/UserActions/UsersAction';
import { fetchCartObjects } from '../../Utils/cartFunction';

const OtherHoverOptions = ({ product, selectedOption }) => {
    const userLocalCart = JSON.parse(localStorage.getItem('cart'));
    const { user } = useUserState();
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();    

    useEffect(() => {
        if (update) {
            fetchCartObjects(userLocalCart)
                .then((cartObjects) => {
                    dispatch(UserCartAction(cartObjects));
                })
                .catch((error) => {
                    console.error('Error fetching cart objects:', error);
                });
            setUpdate(false)
        }
    }, [update, dispatch, userLocalCart])

    const handleAddToCart = (event) => {
        event.stopPropagation();
        if (!user) {
            if (userLocalCart) {
                
            }
            else {
                if (!selectedOption) {
                    toast.error('Please an option');
                }
                else {
                    let arr = [];
                    arr.push({
                        id: product?._id,
                        quantity: 1,
                        option: selectedOption
                    });
                    localStorage.setItem('cart', JSON.stringify(arr));
                    setUpdate(true);
                    toast.success('Added to Cart');
                }
            }
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
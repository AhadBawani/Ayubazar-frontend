import React, { useEffect } from 'react';
import Button from '../../Fields/Button';
import { useNavigate } from 'react-router-dom';
import OrderCards from './Cards/OrderCards';
import { LuIndianRupee } from 'react-icons/lu';
import useUserState from '../../Hooks/useUserState';
import { ShowOrderAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useDispatch } from 'react-redux';

const Orders = () => {
    const { orders, order } = useUserState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBrowseProductClick = () => {
        navigate('/');
    }

    const formatDate = (date) => {
        const currentDate = new Date(date);
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const monthName = monthNames[currentDate.getMonth()];

        const day = currentDate.getDate();

        const year = currentDate.getFullYear();

        return `${monthName} ${day}, ${year}`;
    }
    const handleViewOrder = (order) => {
        navigate(`/my-account/view-order/${order?.orderId}`);
        dispatch(ShowOrderAction(order));
    }
    useEffect(() => {
        dispatch(ShowOrderAction(null))
    }, [dispatch])
    return (
        <div className='m-4'>
            {
                orders?.length > 0
                    ?
                    <>
                        <div>
                            {
                                order
                                    ?
                                    <>
                                        <OrderCards />
                                    </>
                                    :
                                    <>
                                        <div className="overflow-x-auto">
                                            <table className="table-auto max-w-sm sm:min-w-full">
                                                <thead>
                                                    <tr className='uppercase text-left border-b-2 border-gray-200' style={{ lineHeight: '1.24em', color: '#222' }}>
                                                        <th className="px-4 py-2">Order</th>
                                                        <th className="px-4 py-2">Date</th>
                                                        <th className="px-4 py-2">Status</th>
                                                        <th className="px-4 py-2">Total</th>
                                                        <th className="px-4 py-2">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='pt-4'>
                                                    {
                                                        orders?.map((order, index) => {
                                                            return <tr key={index} className="mt-4"
                                                                style={{
                                                                    fontSize: '1.06897em',
                                                                    lineHeight: 'inherit', color: '#333', fontWeight: 400
                                                                }}>
                                                                <td className="px-4 py-2 transition-all cursor-pointer
                                                            ease-in-out duration-200 hover:text-[#d0bdac] whitespace-no-wrap">
                                                                    #{order?.orderId}
                                                                </td>
                                                                <td className="px-4 py-2" style={{ whiteSpace: 'nowrap' }}>{formatDate(order?.createdAt)}</td>
                                                                <td className="px-4 py-2" style={{ whiteSpace: 'nowrap' }}>{order?.status}</td>
                                                                <td className="px-4 py-2" style={{ whiteSpace: 'nowrap' }}>
                                                                    <div className='flex'>
                                                                        <span className='ml-2'><LuIndianRupee className='mt-1' /></span>
                                                                        <span>{order?.total}.00</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-2" style={{ whiteSpace: 'nowrap' }}>
                                                                    <span className='transition-all ease-in-out duration-200 hover:underline hover:text-[#000] cursor-pointer'
                                                                        onClick={() => handleViewOrder(order)}>
                                                                        View
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                            }
                        </div>
                    </>
                    :
                    <>
                        <span>No order has been made yet.</span>
                        <Button color="#ff6900" text="Browse Products" width="50%" onClick={handleBrowseProductClick} />
                    </>
            }
        </div>
    )
}

export default Orders
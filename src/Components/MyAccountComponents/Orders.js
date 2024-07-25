import React, { useEffect } from 'react';
import Button from '../../Fields/Button';
import { useNavigate } from 'react-router-dom';
import OrderCards from './Cards/OrderCards';
import { LuIndianRupee } from 'react-icons/lu';
import useUserState from '../../Hooks/useUserState';
import { ShowOrderAction } from '../../Redux/Actions/UserActions/UsersAction';
import { useDispatch } from 'react-redux';
import useComponentState from '../../Hooks/useComponentState';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Orders = () => {
    const { orders, order } = useUserState();
    const { mobile } = useComponentState();
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
        if (!mobile) navigate(`/my-account/view-order/${order?.orderId}`);
        dispatch(ShowOrderAction(order));
    }
    useEffect(() => {
        dispatch(ShowOrderAction(null))
    }, [dispatch])

    const handleInvoiceDownload = (orderData) => {
        const products = JSON.parse(orderData?.products);
        const invoiceElement = document.createElement('div');
        invoiceElement.style.padding = '20px';
        invoiceElement.style.position = 'absolute';
        invoiceElement.style.top = '-9999px'; // Hide the element off-screen
        invoiceElement.innerHTML = `
        <h2>Invoice</h2>
        <p><strong>Order ID:</strong> ${orderData.orderId}</p>
        <p><strong>Date:</strong> ${formatDate(orderData.createdAt)}</p>
        <p><strong>Status:</strong> ${orderData.status}</p>
        <h3><strong>Products</strong></h3>
        <ul style="list-style-type: disc;">
            ${products.map(product => `                
            <li style="margin: 6px;">
            ${product?.product?.productName} - ${product?.quantity} x ${Object.values(product?.option).join(', ')}
            </li>
        `).join('')}
        </ul>
        <div style="margin-top: 20px;">
            <h3><strong>Total: ${orderData?.total}</strong></h3>
        </div>
        <div style="margin-top: 20px;">
            <h3><strong>Shipping Address</strong></h3>
            <div style="padding-left: 20px;">
                <div style="margin: 6px 0;">
                    <strong>Username:</strong> ${orderData?.orderShippingAddress?.firstName} ${orderData?.orderShippingAddress?.lastName}
                </div>
                <div style="margin: 6px 0;">
                    <strong>Phone Number:</strong> ${orderData?.orderShippingAddress?.phoneNumber}
                </div>
                <div style="margin: 6px 0;">
                    <strong>Email:</strong> ${orderData?.orderShippingAddress?.email}
                </div>
                <div style="margin: 6px 0;">
                    <strong>Address:</strong>
                    <div style="padding-left: 20px;">
                        <div>${orderData?.orderShippingAddress?.apartment} ${orderData?.orderShippingAddress?.houseNumberAndStreetName}</div>
                        <div>${orderData?.orderShippingAddress?.state} ${orderData?.orderShippingAddress?.city}, ${orderData?.orderShippingAddress?.postcode}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

        // Append the element to the body
        document.body.appendChild(invoiceElement);

        // Convert the HTML to a canvas and then to a PDF
        html2canvas(invoiceElement).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save(`invoice_${orderData.orderId}.pdf`);

            // Remove the hidden element from the body
            document.body.removeChild(invoiceElement);
        });
    }


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
                                                                <td className="px-4 py-2 space-x-4" style={{ whiteSpace: 'nowrap' }}>
                                                                    <span className='transition-all ease-in-out duration-200 hover:underline hover:text-[#000] cursor-pointer'
                                                                        onClick={() => handleViewOrder(order)}>
                                                                        View
                                                                    </span>
                                                                    <span className='transition-all ease-in-out duration-200 hover:underline hover:text-[#000] cursor-pointer'
                                                                        onClick={() => handleInvoiceDownload(order)}>
                                                                        download
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
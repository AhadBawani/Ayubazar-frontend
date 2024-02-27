import React from 'react'
import Requests from '../../RequestHandlers/Requests/Requests';
import { LuIndianRupee } from 'react-icons/lu';

const UserCartCard = ({ item, index }) => {
    return (
        <div key={index} className='flex mb-12 items-center justify-between'>
            <div className='flex'>
                <div className='flex justify-center items-center' style={{
                    border: '1px solid rgba(0,0,0,.1)',
                    borderRadius: '5px',
                    height: '70px',
                    width: '80px',
                }}>
                    <div className='relative'>
                        <img
                            className='object-cover'
                            src={Requests.GET_PRODUCT_IMAGE + item?.product?.productImage}
                            alt={item?.product?.productName} />
                        <div className='absolute top-1 right-2 transform translate-x-full -translate-y-full bg-[#555] rounded-full h-[17px] w-[17px] flex items-center justify-center'
                            style={{
                                fontSize: '12px',
                                color: '#fff',
                                textAlign: 'center',
                                boxShadow: '1px 1px 3px 0 rgba(0,0,0,.3)',
                                lineHeight: '20px',
                                fontWeight: '700',
                            }}>
                            {item?.quantity}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mx-3' style={{
                    lineHeight: '1.24em',
                    fontSize: '1.06em',
                    fontWeight: '700',
                    wordBreak: 'break-word',
                }}>
                    <div>{item?.product?.productName}</div>
                    <div className='mt-3' style={{
                        fontSize: '100%',
                        lineHeight: '1.6',
                        textRendering: 'optimizeLegibility',
                        color: '#888888',
                    }}>
                        {Object.keys(item?.option)}
                    </div>
                </div>
            </div>
            <div className='flex font-black'>
                <span><LuIndianRupee className='mt-[3px]' /></span>
                <span>{parseInt(Object.values(item?.option)) * parseInt(item?.quantity)}</span>
            </div>
        </div>
    )
}

export default UserCartCard;
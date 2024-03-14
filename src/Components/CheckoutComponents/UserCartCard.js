import React from 'react'
import Requests from '../../RequestHandlers/Requests/Requests';
import { LuIndianRupee } from 'react-icons/lu';

const UserCartCard = ({ item, index }) => {
    return (
        <div key={index} className='flex mb-12 items-center justify-between'>
            <div className='flex'>
                <div className='flex justify-center items-center 
                min-w-[70px] max-w-[70px] rounded-md min-h-[70px] max-h-[70px]'
                    style={{
                        border: '1px solid rgba(0,0,0,.1)',
                    }}>
                    <div className='relative'>
                        <img
                            className='object-cover min-w-[65px] max-w-[65px] rounded-md min-h-[65px] max-h-[65px]'
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
                <div className='flex flex-col mx-3 mt-[-4px]' style={{
                    lineHeight: '1.24em',
                    fontSize: '1.06em',
                    fontWeight: '700',
                    wordBreak: 'break-word',
                }}>
                    <span
                        className='text-[#333] hover:text-[#d0bdac]
                        cursor-pointer text-sm font-semibold overflow-hidden'
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2, // Limit to two lines
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {item?.product?.productName}
                    </span>
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
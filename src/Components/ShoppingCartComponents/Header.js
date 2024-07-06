import React from 'react'
import { useNavigate } from 'react-router-dom';
import useComponentState from '../../Hooks/useComponentState';

const Header = ({ code }) => {
    const active = code;
    const navigate = useNavigate();
    const { mobile } = useComponentState();
    const option = [
        {
            code: '01',
            title: 'Shopping Cart',
            body: 'Manage Your Items List'
        },
        {
            code: '02',
            title: 'Checkout Details',
            body: 'Checkout Your Items List',
        }
    ];

    const handleItemClick = (item) => {
        if (item?.code === '02') navigate('/checkout');
        if (item?.code === '01') navigate('/shopping-cart');
    }
    return (
        <>
            <div className='bg-[#FAFAFA]'
                style={{
                    border: 'solid 1px #ECECEC'
                }}
            >
                <div className='flex justify-between m-4 p-4 md:mx-36'>
                    {
                        option.map((item, index) => {
                            return <div className={item.code === active ?
                                `flex transition-all ease-in-out text-[#3c4043]
                                 duration-300 hover:text-[#3c4043] cursor-pointer`
                                :
                                `flex text-[#D2D2D2] transition-all ease-in-out
                                 duration-300 hover:text-[#3c4043] cursor-pointer`
                            }
                                key={index}
                                onClick={() => handleItemClick(item)}>
                                <div>
                                    <span
                                        style={
                                            mobile
                                                ?
                                                {
                                                    fontSize: '100%',
                                                    lineHeight: '0.9',
                                                    fontWeight: '700',
                                                    textRendering: 'optimizeLegibility'
                                                }
                                                :
                                                {
                                                    fontSize: '400%',
                                                    lineHeight: '0.9',
                                                    fontWeight: '700',
                                                    textRendering: 'optimizeLegibility'
                                                }
                                        }
                                    >
                                        {item.code}
                                    </span>
                                </div>
                                <div className='flex md:flex-col mt-1 ml-1'>
                                    <span className='uppercase font-bold'
                                        style={{
                                            fontSize: '15px',
                                            lineHeight: '1.2',
                                            textRendering: 'optimizeLegibility'
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                    {
                                        !mobile
                                        &&
                                        <span className='mt-1'
                                            style={{
                                                fontSize: '100%',
                                                textRendering: 'optimizeLegibility'
                                            }}
                                        >
                                            {item.body}
                                        </span>
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Header;
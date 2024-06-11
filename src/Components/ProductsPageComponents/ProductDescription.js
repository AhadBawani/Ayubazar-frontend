import React from 'react'

const ProductDescription = ({ description }) => {
    return (
        <div className='mt-8'>
            {description && JSON.parse(description)?.map((desc, index) => {
                return <div className='mb-5' key={index}>
                    <p className='text-lg'
                        style={{
                            lineHeight: '1.6',
                            boxSizing: 'border-box',
                            textRendering: 'optimizeLegibility',
                            color: '#333',
                            textAlign: 'start'
                        }}
                    >{Object.values(desc)[1]}</p>
                </div>
            })}
        </div>
    )
}

export default ProductDescription;
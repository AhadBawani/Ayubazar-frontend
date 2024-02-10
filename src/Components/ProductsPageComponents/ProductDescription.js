import React from 'react'

const ProductDescription = ({ description }) => {
    return (
        <div className='mt-4'>
            <span
                style={{
                    fontSize: '14.0pt',
                    lineHeight: '115%',
                    boxSizing: 'border-box',
                    textRendering: 'optimizeLegibility',
                    color: '#333',
                    textAlign:'center'
                }}>
                {description}
            </span>
        </div>
    )
}

export default ProductDescription;
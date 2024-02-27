import React from 'react'
import Button from '../../Fields/Button'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
    const navigate = useNavigate();
    const handleBrowseProductClick = () => {
        navigate('/');
    }
    return (
        <div>
            <span>No order has been made yet.</span>
            <Button color="#ff6900" text="Browse Products" width="50%" onClick={handleBrowseProductClick} />
        </div>
    )
}

export default Orders
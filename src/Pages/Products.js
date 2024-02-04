import React from 'react'
import useProductsState from '../Hooks/useProductsState';
import ShowProduct from '../Components/ProductsPageComponents/ShowProduct';

const Products = () => {
    const { product } = useProductsState();

    return (
        <div>
            <ShowProduct product={product} />
        </div>
    )
}

export default Products;
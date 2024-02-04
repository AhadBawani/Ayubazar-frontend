import { getProductByIdRequestHandler } from "../RequestHandlers/RequestHandler/ProductRequestHandler";

export const fetchProductById = async (id) => {
    try {
        const product = await getProductByIdRequestHandler(id);
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export const fetchCartObjects = async (userLocalCart) => {
    const arr = [];
    for (let i = 0; i < userLocalCart?.length; i++) {
        try {
            const product = await fetchProductById(userLocalCart[i].id);
            if (product) {
                arr.push({
                    product: product,
                    quantity: userLocalCart[i]?.quantity,
                    option: userLocalCart[i]?.option
                });
            }
        } catch (error) {
            console.error('Error fetching cart object:', error);
        }
    }
    return arr;
}
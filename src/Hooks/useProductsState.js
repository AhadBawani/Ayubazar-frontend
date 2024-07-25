import { useSelector } from "react-redux"

const useProductsState = () => {
    return useSelector((state) => state?.Products);
}

export default useProductsState;
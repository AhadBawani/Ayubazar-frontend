import { useSelector } from "react-redux"

const useComponentState = () => {
    return useSelector((state) => state?.Component);
}

export default useComponentState;
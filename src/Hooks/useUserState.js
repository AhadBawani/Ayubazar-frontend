import { useSelector } from "react-redux";

const useUserState = () => {
    return useSelector((state) => state?.User);
}

export default useUserState;
import { useDispatch } from "react-redux";
import { DiscountAction, TotalAction, UserAction, UserCartAction } from "../Redux/Actions/UserActions/UsersAction";
import { useNavigate } from "react-router-dom";

const UserLogout = (navigation) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     dispatch(UserAction(null));
     dispatch(UserCartAction(null));
     dispatch(TotalAction(0));
     dispatch(DiscountAction(0));
     localStorage.removeItem('userId');
     if (navigation) navigate(navigation);
     return null;
}

export default UserLogout;
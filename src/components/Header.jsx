import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { logOut } from "../features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    navigate('/');
    dispatch(clearCart());
    dispatch(logOut());
    queryClient.removeQueries();
  }

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user
          ? (
            <div className="flex gap-x-2 sm:gap-x-8 items-center">
              <p className="text-xs sm:text-sm">Üdvözlet {user.username}</p>
              <button className="btn btn-xs btn-outline  btn-error" onClick={handleLogout}>
               KILÉPÉS
              </button>
            </div>
          )
          : (
            <div className="flex gap-x-6 justify-center items-center">
              <Link to='/login' className="link link-hover text-xs sm:text-sm">
                Belépés/Vendég
              </Link>
              <Link to='/register' className="link link-hover text-xs sm:text-sm">
                Regisztráció
              </Link>
            </div>
          )}

      </div>
    </header>
  )
}
export default Header;
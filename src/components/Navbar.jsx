import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';

const Navbar = () => {
  const dispatch = useDispatch(); 

  const handleTheme = () => {
    dispatch(toggleTheme());
  }

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <nav className='bg-base-200'>
      <div className="navbar align-elemnt">
        <div className="navbar-start">
          {/*TITLE*/}
          <NavLink to='/' className='hidden lg:flex btn btn-primary text-3xl pb-2' title='Comfy Store'>
            <svg fill="#cc0099" height="35px" width="35px" viewBox="1 0 14 14" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg"><path d="M2.461 7.02a1.61 1.61 0 0 1 1.61 1.611v2.456h7.857V8.63a1.61 1.61 0 1 1 1.988 1.566v4.634a.476.476 0 0 1-.475.475H2.559a.476.476 0 0 1-.475-.475v-4.634A1.61 1.61 0 0 1 2.46 7.02zm1.059-.894a2.68 2.68 0 0 0-.227-.084V4.669A1.111 1.111 0 0 1 4.4 3.56h7.198a1.111 1.111 0 0 1 1.108 1.109v1.373a2.679 2.679 0 0 0-.227.084 2.717 2.717 0 0 0-1.66 2.505v1.347H5.18V8.631a2.72 2.72 0 0 0-1.66-2.505z" /></svg>
          </NavLink>
          {/*drop down*/}
          <div className="dropdown">
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <FaBarsStaggered className='h-6 w-6' />
            </label>
            <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p2 shadow bg-base-200 rounded-box w-52'>
              <NavLinks />
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className='menu menu-horizontal'>
            <NavLinks />
          </ul>
        </div>

        <div className="navbar-end">
          {/* téma beállítás*/}
          <label className='swap swap-rotate'>
            <input type="checkbox" onChange={handleTheme} />
            <BsMoonFill className='swap-on h-4 w-4' />
            <BsSunFill className='swap-off h-4 w-4' />
          </label>
          {/* kosár*/}
          <NavLink to='/cart' className='btn btn-ghost btn-circle btn-md ml-4'>
            <div className="indicator">
              <BsCart3 className='h-6 w-6' />
              <span className='badge badge-primary badge-sm indicator-item'>
                {numItemsInCart}
              </span>
            </div>

          </NavLink>
        </div>
      </div>
    </nav>
  )
}
export default Navbar;
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const links = [
  { id: 1, url: '/', text: 'kezdőlap' },
  { id: 2, url: 'about', text: 'rólunk' },
  { id: 3, url: 'products', text: 'termékek' },
  { id: 4, url: 'cart', text: 'kosár' },
  { id: 5, url: 'checkout', text: 'pénztár' },
  { id: 6, url: 'orders', text: 'rendelések' },
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <>
      {links.map((link => {
        const { id, url, text } = link;
        if (((url === 'checkout' || url === 'orders') && !user)) {
          return null;
        }

        return <li key={id}>
          <NavLink to={url} className='capitalize'>
            {text}
          </NavLink>
        </li>
      }))}
    </>
  )
}
export default NavLinks;
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartList, CartTotal, SectionTitle } from "../components";


const Cart = () => {
  const user = useSelector((state) => state.userState.user);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <SectionTitle text='Az Ön kosara üres' />
  }

  return (
    <>
      <SectionTitle text='Kosár tartalma' />
      <div className='mt-8 grid gap-8 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotal />
          {user ?
            (
              <Link to='/checkout' className='btn btn-primary btn-block mt-8'>
                Tovább a pénztárhoz
              </Link>
            ) :
            (
              <Link to='/login' className='btn btn-primary btn-block mt-8'>
                Jelentkezzen be
              </Link>
            )
          }
        </div>
      </div>
    </>

  )
}
export default Cart;
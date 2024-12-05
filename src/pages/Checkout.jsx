import { useSelector } from 'react-redux';
import { CassaForm, SectionTitle, CartTotal } from '../components';
import { store } from '../store';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  
  if (!user) {
    toast.warning('A rendelés véglegesítéséhez be kell jelentkeznie');
    return redirect('/login');
  }
  return null;
}

const Checkout = () => {
  const debit = useSelector((state) => state.cartState.cartTotal);
  //const { cartTotal as debit} = useSelector((state) => state.cartState);

  if (debit === 0) {
    return <SectionTitle text='Az ön kosara üres'/>
  }
  
  return (
    <>
      <SectionTitle text='A rendelés leadásához töltse ki az űrlapot'/>
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
         <CassaForm />
         <CartTotal/>
      </div>     
    </>
  )
}
export default Checkout;
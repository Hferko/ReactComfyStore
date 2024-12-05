import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import Submit from './Submit';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

export const action = (store, queryClient) => async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const { name, address } = Object.fromEntries(formData);

  const user = store.getState().userState.user;
  const { cartItems, orderTotal, numItemsInCart } = store.getState().cartState;

  const info = {
    name, address, chargeTotal: orderTotal, orderTotal: formatPrice(orderTotal), cartItems, numItemsInCart
  };

  try {
    const response = await customFetch.post('/orders', { data: info }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    queryClient.removeQueries(['orders']);
    store.dispatch(clearCart());   
    toast.success(`Rendelése ${response.data.id} számon leadásra került.  Az árú kiszállítása folyamatban`);    
    //return redirect('/orders');
    return null;
  }
  catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error?.message + ' hiba történt a rendelés leadásakor';
    toast.error(errorMessage);

    if (error?.response?.status === 401 || 403) {
      return redirect('/login');
    }
    return null;   
  }
}

const CassaForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl capitalize'>szállítási információk</h4>
      <FormInput label="vezetéknév" name='name' type='text' />
      <FormInput label="lakcím" name='address' type='text' />
      <div className="mt-4">
        <Submit text='Rendelés leadása' />
      </div>
    </Form>
  )
}
export default CassaForm;
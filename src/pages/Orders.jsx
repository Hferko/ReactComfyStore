import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { OrdersList, ComplexPagination, SectionTitle } from '../components';
import { QueryClient } from '@tanstack/react-query';

const orderQuery = (params, user) => {
  return {
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () => customFetch.get('/orders', {
      params,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
  }
}

export const loader = (store, queryClient) => async ({ request }) => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn("A rendelések megtekintéséhez be kell lépnie");
    return redirect('/login');
  }
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

  try {
    const response = await queryClient.ensureQueryData(orderQuery(params, user))
    return { orders: response.data.data, meta: response.data.meta }
  }
  catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error?.message + ' hiba történt a rendelés leadásakor';
    toast.error(errorMessage);

    if (error?.response?.status === 401 || 403) {
      return redirect('/login');
    }
  }
  //return null;
}

const Orders = () => {
  const { meta } = useLoaderData();  
  if (meta.pagination.total < 1) {
    return <SectionTitle text='Még nem rendelt semmit. Kérjük rendeljen' />
  }

  return (
    <>
      <SectionTitle text='Az ön megrendelései:' />
      <OrdersList />
      <ComplexPagination />
    </>
  )
}
export default Orders;
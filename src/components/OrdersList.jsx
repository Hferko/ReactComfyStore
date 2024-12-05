import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const OrdersList = () => {
  const {orders, meta} = useLoaderData();

  return (
    <div className='mt-8'>
      <h3 className='mb-4 capitalize'>összes megrendelés: {meta.pagination.total}</h3>
      <div className="overflow-x-auto">
        <table className='table table-zebra'>
          <thead>
            <tr className='text-base'>
              <th>Név</th>
              <th>Lakcím</th>
              <th>Termékek</th>
              <th>Ár</th>
              <th className='hidden sm:block'>Dátum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order)=> {              
              const {name,address,numItemsInCart,orderTotal, createdAt} = order.attributes;
              const date = day(createdAt).format('YYYY. MMM. DD. H:m')
              return (
                <tr key={order.id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className='hidden sm:block'>{date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default OrdersList;
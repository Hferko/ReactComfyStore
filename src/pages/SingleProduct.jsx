import { useLoaderData } from 'react-router-dom';
import { formatPrice, customFetch } from '../utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/products/${id}`)
  }
}

export const loader = (queryClient) => async ({ params }) => {
  //const response = await customFetch(`/products/${params.id}`)
  const response = await queryClient.ensureQueryData(singleProductQuery(params.id));
  return { product: response.data.data };
}

const SingleProduct = () => {
  const { product } = useLoaderData(); 
  const { image, title, price, description, colors, company } = product.attributes; 
  const eruroAmount = formatPrice(price);
  
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (event) => {
    setAmount(parseInt(event.target.value));
  }

  const cartProduct = {
    cartId: '' + product.id + productColor,    
    productId: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,   
  }

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  }

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Termékek</Link>
          </li>
        </ul>
      </div>

      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        <img src={image} alt={title} className='w-96 h-96 object-cover rounded-lg lg:w-full' />
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>         
          <h4 className='text-xl text-neutral-content font-bold mt-2'>{company}</h4>
          <p className='mt-3 text-xl'>{eruroAmount}</p>
          <p className='mt-6 leading-8'>{description}</p> 

          <div className="mt-6">
            <h4 className='text-md font-medium tracking-wider capitalize'>Színek</h4>
            <div className="mt-2">
              {colors.map((color) => {
                return <button
                  type="button"
                  key={color}
                  className={`badge w-6 h-6 mr-2 ${color === productColor && 'border-2 border-secondary'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                ></button>
              })}
            </div>
            <p>{productColor}</p>
          </div>
          <div className='form-control w-full max-w-xs'>
            <label className='label' htmlFor='amount'>
              <h4 className='text-md font-medium tracking-wider capitalize'>
                Mennyiség
              </h4>
            </label>
            <select
              id="amount"
              className='select select-secondary select-bordered select-md'
              value={amount}
              onChange={handleAmount}
            >
              {
                Array.from({ length: 8 }, (v, index) => index + 1).map((num) => {
                  return <option value={num} key={num}>{num}</option>
                })}
            </select>
          </div>
          <div className="mt-10">
            <button className='btn btn-secondary btn-md' onClick={addToCart}>
              Kosárhoz ad
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SingleProduct;
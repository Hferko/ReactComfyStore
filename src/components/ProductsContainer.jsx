import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const allProducts = meta.pagination.total;

  const [layout, setLayout] = useState('grid');

  const setActiveStyle = (pattern) => {
    return `text-xl btn btn-circle btn-sm 
    ${pattern === layout
        ? 'btn-primary text-primary-content'
        : 'btn-ghost text-based-content'}`;
  }

  return (
    <>
      <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
        <h4 className='font-medium text-md'>Összesen: <b>{allProducts}</b> termék</h4>

        <div className="flex gap-x-2">
          <button type="button" onClick={() => setLayout('grid')} className={setActiveStyle('grid')}>
            <BsFillGridFill />
          </button>
          <button type="button" onClick={() => setLayout('list')} className={setActiveStyle('list')}>
            <BsList />
          </button>
        </div>
      </div>
      {/* Lista vagy Grid kinézet legyen */}
      <div>
        {
          allProducts === 0
            ? <h5 className='text-2xl mt-6'>Sajnos nincs az ön által keresett termék...</h5>
            : layout === 'grid' ? (<ProductsGrid />) : (<ProductsList />)
        }
      </div>
    </>
  )
}
export default ProductsContainer;
import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import RangeForm from './RangeForm';
import Checkbox from './Checkbox';

const Filters = () => {
  const { meta, params } = useLoaderData(); 
  const {search,company,category,shipping,order,price} = params

  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      
      {/* keresés */}
      <FormInput type='search' name='search' label='termék keresése' size='input-sm' defaultValue={search}/>
      
      {/* kategóriák */}
      <FormSelect label='kategóriák' name='category' list={meta.categories} size='select-sm' defaultValue={category}/>
      
      {/* cégek */}
      <FormSelect label='gyártók' name='company' list={meta.companies} size='select-sm' defaultValue={company}/>
       
       {/* sorba rendezés */}
      <FormSelect label='sorrend' name='order' list={['a..z', 'z..a', 'magas ár elöl', 'alacsony ár elöl']} size='select-sm' defaultValue={order}/>
      
       {/* Ár */}
      <RangeForm  name='price' label='maximum Ár' size='range-sm' price={price}/>
      <Checkbox name='shipping' label='házhozszállítást igényel' size='checkbox-sm' defaultValue={shipping}/>
      
      {/* Gombok */}
      <button type="submit" className='btn btn-primary btn-sm uppercase'>
        Keresés
      </button>
      <Link to='/products' className='btn btn-accent btn-sm uppercase'>
        reset
      </Link>
    </Form>
  )
}
export default Filters;
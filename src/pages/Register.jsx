import { Form, Link, redirect } from 'react-router-dom';
import { FormInput, Submit } from "../components";
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);  
  console.log(data);

  try {
    const response = await customFetch.post('/auth/local/register', data);
    toast.success('Sikeres regisztráció, az ön fiókja létrehozva.');
    return redirect('/login');
  }
  catch (error) {
    const errorMessage = error?.response?.data?.error?.message || 'kérjük, ellenőrizze a hitelesítő adatait';
    toast.error(errorMessage);
    return null;
  }
}

const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form method='POST'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
        <h4 className='text-center text-3xl font-bold'>Regisztráció</h4>
        <FormInput
          type='text'
          label='felhasználónév'
          name='username'          
        />
        <FormInput
          type='email'
          label='email'
          name='email'          
        />
        <FormInput
          type='password'
          label='jelszó (minimum 6 karakter)'
          name='password'         
        />
        <div className="mt-4">
          <Submit text="regisztrálok" />
        </div>
        <p className='text-center'>
          Ön már regisztrált felhasználó? <Link to='/login' className='ml.2 link link-hover link-primary capitalize'>
            Lépjen be
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Register;
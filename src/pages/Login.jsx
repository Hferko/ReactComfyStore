import { FormInput, Submit } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';


export const action = (store) => async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('/auth/local', data);
    store.dispatch(loginUser(response.data));
    
    toast.success(`Belépve, mint: ${data.identifier}`);
    return redirect('/');    
  }
  catch (error) {
    const errorMessage = error?.response?.data?.error?.message || 'kérjük, ellenőrizze a hitelesítő adatait';
    toast.error(errorMessage);
    return null;
  }
}

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/local',{
        identifier: 'test@test.com',
        password: 'secret'
      });
      dispatch(loginUser(response.data));
      toast.success('Vendég-felhasználóként belépett.')
      navigate('/');
    } 
    catch (error) {
      console.log(error);
      toast.error('Nem sikerült vendég-felhasználóként belépnie. Kérjük próbálja újra.')
    }
  }

  return (
    <section className='h-screen grid place-items-center'>
      <Form method='post'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
        <h4 className='text-center text-3xl font-bold'>Belépés</h4>
        <FormInput
          type='email'
          label='email'
          name='identifier'          
        />
        <FormInput
          type='password'
          label='password'
          name='password'          
        />
        <div className="mt-4">
          <Submit text="login" />
        </div>
        <button type="button" className='btn btn-secondary btn-block' onClick={loginAsGuestUser}>
          vendég felhasználó
        </button>
        <p className='text-center'>
          Még nem regisztrált? <Link to='/register' className='ml.2 link link-hover link-primary capitalize'>
            regisztráljon itt
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Login;
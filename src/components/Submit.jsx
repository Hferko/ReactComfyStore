import { useNavigation } from 'react-router-dom';

const Submit = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <button type="submit" className="btn btn-primary btn-block uppercase" disabled={isSubmitting}>
      {isSubmitting
        ? <>
          <span className='loading loading-spinner'></span>
          küldés...
        </>
        : text || 'submit'}
    </button>
  )
}
export default Submit;
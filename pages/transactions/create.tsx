import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/Form/TextInput';
import Button from '../components/Form/Button';
import InputContainer from '../components/Form/InputContainer';

const NewTransaction: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   const [message, setMessage] = useState<object>(null);
   let initialValues = {
      name: '',
      email: '',
      password: '',
   };
   // All Validations
   const insertingValidationSchema = Yup.object().shape({
      name: Yup.string().required().label('Name'),
      email: Yup.string().email().required().label('Email'),
      password: Yup.string().required().label('Password'),
   });
   const handleSubmit = async (values: object, onSubmitProps: object) => {
      try {
         setLoading(true);
         const body = {
            name: values.name,
            email: values.email,
            password: values.password,
         };
         result = await axios.post('api/transactions/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
         });
         console.log('Data', result.response);
         if (result.status == 200) Router.push('/transactions');
         if (result.status == 422) {
            alert('Invalid inputs');
            setMessage({ status: false, message: 'Invalid inputs' });
         }
         if (result.status == 400) {
            alert('Action failed. Try again!');
            setMessage({ status: false, message: 'Action failed. Try again!' });
         }
         setLoading(false);
      } catch (error) {
         setLoading(false);
         console.error(error);
      }
   };
   console.log('msgg', !!message);

   return (
      <>
         <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
               <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>NewTransaction to SIMBA</h1>
               {/* <p className='text-red-500'>hello {!!message ?? message.message}</p> */}
               <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize validationSchema={insertingValidationSchema}>
                  {({ values, handleChange, handleSubmit, setFieldValue, touched, handleBlur, errors }) => (
                     <form onSubmit={handleSubmit}>
                        <TextInput onChange={handleChange('name')} onBlur={handleBlur('name')} id='name' label='name' name='name' errorMessage={errors.name} value={values.name} placeholder='Enter your name' type='text' touched={touched.name} />
                        <TextInput onChange={handleChange('email')} onBlur={handleBlur('email')} id='email' label='Email' name='email' errorMessage={errors.email} value={values.email} placeholder='Enter your email' type='text' touched={touched.email} />
                        <TextInput onChange={handleChange('password')} onBlur={handleBlur('password')} id='password' label='Password' name='password' errorMessage={errors.password} value={values.password} placeholder='Enter your password' type='password' touched={touched.password} />
                        <Button isDisabled={isDisabled} isLoading={isLoading} buttonText='NewTransaction' />
                     </form>
                  )}
               </Formik>
               <p className='text-center text-sm mt-1 '>
                  Already have an account?
                  <Link href='/login'>
                     <a className='underline hover:text-green-500'>Login</a>
                  </Link>
               </p>
            </div>
         </div>
      </>
   );
};
export default NewTransaction;

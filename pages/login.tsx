import react, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/Form/TextInput';
import Button from '../components/Form/Button';

const Login: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   // All Validations
   const insertingValidationSchema = Yup.object().shape({
      email: Yup.string().email().required().label('Email'),
      password: Yup.string().required().label('Password'),
   });
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      Boolean(user) ? Router.push('/transactions') : Router.push('/login');
   }, []);
   const handleSubmit = async (values: any, onSubmitProps: any) => {
      try {
         setLoading(true);
         let result = await axios
            .post('api/auth/login', { email: values.email, password: values.password })
            .then((res) => {
               localStorage.setItem('token', res.data.token);
               localStorage.setItem('user', JSON.stringify(res.data.data));
               Router.push('/transactions');
            })
            .catch((error) => {
               alert(error.response.data.error);
               setLoading(false);
            });
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };
   return (
      <>
         <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
               <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>Log in to SIMBA</h1>
               <Formik
                  initialValues={{
                     email: '',
                     password: '',
                  }}
                  onSubmit={handleSubmit}
                  enableReinitialize
                  validationSchema={insertingValidationSchema}>
                  {({ values, handleChange, handleSubmit, setFieldValue, touched, handleBlur, errors }) => (
                     <form onSubmit={handleSubmit}>
                        <TextInput onChange={handleChange('email')} onBlur={handleBlur('email')} id='email' label='Email' name='email' errorMessage={errors.email} preValue={values.email} placeholder='Enter your email' type='email' touched={touched.email} />
                        <TextInput onChange={handleChange('password')} onBlur={handleBlur('password')} id='password' label='Password' name='password' errorMessage={errors.password} preValue={values.password} placeholder='Enter your password' type='password' touched={touched.password} />
                        <Button isDisabled={isDisabled} isLoading={isLoading} buttonText='Login' />
                     </form>
                  )}
               </Formik>
               <p className='text-center text-sm mt-1 '>
                  Doesnt have an account?
                  <Link href='/register'>
                     <a className='underline hover:text-green-500'>Register</a>
                  </Link>
               </p>
            </div>
         </div>
      </>
   );
};
export default Login;

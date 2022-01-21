import react, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextInput from '../components/Form/TextInput';
import Button from '../components/Form/Button';
import InputContainer from '../components/Form/InputContainer';

const Register: React.FC = () => {
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
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      Boolean(user) ? Router.push('/transactions') : null;
   }, []);
   const handleSubmit = async (values: object, onSubmitProps: object) => {
      try {
         setLoading(true);
         const body = {
            name: values.name,
            email: values.email,
            password: values.password,
         };
         let result = await axios
            .post('api/auth/register', {
               name: values.name,
               email: values.email,
               password: values.password,
            })
            .then((res) => {
               Router.push('/login');
            })
            .catch((error) => {
               alert(error.response.data.error);
               setLoading(false);
            });
      } catch (error) {
         setLoading(false);
         console.error(error);
      }
   };

   return (
      <>
         <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
               <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>Register to SIMBA</h1>
               {/* <p className='text-red-500'>hello {!!message ?? message.message}</p> */}
               <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize validationSchema={insertingValidationSchema}>
                  {({ values, handleChange, handleSubmit, setFieldValue, touched, handleBlur, errors }) => (
                     <form onSubmit={handleSubmit}>
                        <TextInput onChange={handleChange('name')} onBlur={handleBlur('name')} id='name' label='name' name='name' errorMessage={errors.name} value={values.name} placeholder='Enter your name' type='text' touched={touched.name} />
                        <TextInput onChange={handleChange('email')} onBlur={handleBlur('email')} id='email' label='Email' name='email' errorMessage={errors.email} value={values.email} placeholder='Enter your email' type='text' touched={touched.email} />
                        <TextInput onChange={handleChange('password')} onBlur={handleBlur('password')} id='password' label='Password' name='password' errorMessage={errors.password} value={values.password} placeholder='Enter your password' type='password' touched={touched.password} />
                        <Button isDisabled={isDisabled} isLoading={isLoading} buttonText='Register' />
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
export default Register;

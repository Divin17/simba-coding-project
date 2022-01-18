import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../components/Form/TextInput';
import Button from '../components/Form/Button';
import InputContainer from '../components/Form/InputContainer';

const Login: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   let initialValues = {
      email: '',
      password: '',
   };
   // All Validations
   const insertingValidationSchema = Yup.object().shape({
      email: Yup.string().email().required().label('Email'),
      password: Yup.string().required().label('Password'),
   });
   const handleSubmit = async (values: object, onSubmitProps: object) => {
      console.log('values', values);
      console.log('onSubmitProps', onSubmitProps);

      try {
         setLoading(true);
         const body = {};
      } catch (error) {}
   };
   return (
      <>
         <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
               <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>Log in to SIMBA</h1>
               {/* <InputContainer> */}
               <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize validationSchema={insertingValidationSchema}>
                  {({ values, handleChange, handleSubmit, setFieldValue, touched, handleBlur, errors }) => (
                     <form onSubmit={handleSubmit}>
                        <TextInput onChange={handleChange('email')} onBlur={handleBlur('email')} id='email' label='Email' name='email' errorMessage={errors.email} value={values.email} placeholder='Enter your email' type='text' touched={touched.email} />
                        <TextInput onChange={handleChange('password')} onBlur={handleBlur('password')} id='password' label='Password' name='password' errorMessage={errors.password} value={values.password} placeholder='Enter your password' type='password' touched={touched.password} />
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
               {/* </InputContainer> */}
            </div>
         </div>
      </>
   );
};
export default Login;

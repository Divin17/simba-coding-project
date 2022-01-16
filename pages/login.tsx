import { useEffect, useState } from 'react';
import TextInput from '../components/Form/TextInput';
import Button from '../components/Form/Button';
import InputContainer from '../components/Form/InputContainer';

const Login: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [errors, setErrors] = useState<Object>({ email: '', password: '' });
   const handleSubmit = () => {
      setLoading(true);
   };
   return (
      <>
         <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
               <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>Log in to SIMBA</h1>
               {/* <InputContainer> */}
               <TextInput onChange={(e) => setEmail(e.target.value)} id='email' label='Email' name='email' errorMessage={errors.email} placeholder='Enter your email' required />
               <TextInput onChange={(e) => setPassword(e.target.value)} id='password' label='Password' name='password' errorMessage={errors.password} placeholder='Enter your password' required />
               <Button isDisabled={isDisabled} onClick={handleSubmit} isLoading={isLoading} buttonText='Login' />
               <p className='text-center text-sm mt-1 '>
                  Doesn't have an account?{' '}
                  <a href='' className='underline hover:text-green-500'>
                     Register
                  </a>
               </p>
               {/* </InputContainer> */}
            </div>
         </div>
      </>
   );
};
export default Login;

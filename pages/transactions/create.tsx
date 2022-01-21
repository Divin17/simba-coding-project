import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NavBar from '../../components/Layout/NavBar';
import Footer from '../../components/Layout/Footer';
import TextInput from '../../components/Form/TextInput';
import Button from '../../components/Form/Button';
import InputContainer from '../../components/Form/InputContainer';

const NewTransaction: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   const [message, setMessage] = useState<object>(null);
   const [users, setUsers] = useState<object>([]);
   const [currencies, setCurrencies] = useState<object>([
      {
         id: 'USD',
         name: 'USD',
      },
      {
         id: 'EUR',
         name: 'EUR',
      },
      {
         id: 'NGN',
         name: 'NGN',
      },
   ]);
   let initialValues = {
      receiver: '',
      sourceCurrency: '',
      targetCurrency: '',
      amount: '',
   };
   // All Validations
   const insertingValidationSchema = Yup.object().shape({
      receiver: Yup.string().required().label('Receiver'),
      sourceCurrency: Yup.string().required().label('Source Currency'),
      targetCurrency: Yup.string().required().label('Target Currency'),
      amount: Yup.string().required().label('Amount'),
   });
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!Boolean(user)) {
         Router.push('/login');
         return;
      }
      const token = localStorage.getItem('token');
      const getUsers = async (id: number) => {
         const res = await axios.get(`/api/user/${id}`);
         setUsers(res.data.data);
      };
      getUsers(user.id);
   }, []);
   const handleSubmit = async (values: object, onSubmitProps: object) => {
      setLoading(true);
      try {
         const id = JSON.parse(localStorage.getItem('user')).id;
         const result = await axios
            .post('/api/transaction/create', {
               receiverId: Number(values.receiver),
               senderId: id,
               source_currency: values.sourceCurrency,
               target_currency: values.targetCurrency,
               amount: Number(values.amount),
            })
            .then((result) => {
               Router.push('/transactions');
            })
            .catch((error) => {
               setLoading(false);
               alert(error.response.data.error);
               setMessage({ status: false, message: error.response.error });
            });
      } catch (error) {
         setLoading(false);
         console.error(error);
      }
   };

   return (
      <>
         <section className='pb-1 bg-blueGray-50'>
            <NavBar />
            <div className='flex bg-gray-bg1'>
               <div className='w-full max-w-xl mt-24 mx-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-8'>
                  <h1 className='text-2xl font-medium text-primary mt-4 mb-8 text-center'>New Transaction</h1>
                  {/* <p className='text-red-500'>hello {!!message ?? message.message}</p> */}
                  <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize validationSchema={insertingValidationSchema}>
                     {({ values, handleChange, handleSubmit, setFieldValue, touched, handleBlur, errors }) => (
                        <form onSubmit={handleSubmit}>
                           <TextInput onChange={handleChange('receiver')} onBlur={handleBlur('receiver')} name='receiver' label='Receiver' receiver='receiver' errorMessage={errors.receiver} value={values.receiver} placeholder='Receiver' type='select' options={users} touched={touched.receiver} />
                           <div className='flex sm:flex-row flex-col sm:gap-6 gap-0'>
                              <TextInput onChange={handleChange('sourceCurrency')} onBlur={handleBlur('sourceCurrency')} name='sourceCurrency' label='Source Currency' sourceCurrency='sourceCurrency' errorMessage={errors.sourceCurrency} value={values.sourceCurrency} placeholder='Source Currency' type='select' touched={touched.sourceCurrency} options={currencies} />
                              <TextInput onChange={handleChange('targetCurrency')} onBlur={handleBlur('targetCurrency')} name='targetCurrency' label='Target Currency' targetCurrency='targetCurrency' errorMessage={errors.targetCurrency} value={values.targetCurrency} placeholder='Target Currency' type='select' touched={touched.targetCurrency} options={currencies} />
                           </div>
                           <TextInput onChange={handleChange('amount')} onBlur={handleBlur('amount')} name='amount' label='Amount' errorMessage={errors.amount} value={values.amount} placeholder='Amount' type='text' touched={touched.amount} />
                           <Button isDisabled={isDisabled} isLoading={isLoading} buttonText='Send' />
                        </form>
                     )}
                  </Formik>
               </div>
            </div>
            <Footer />
         </section>
      </>
   );
};
export default NewTransaction;

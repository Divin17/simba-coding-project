import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../components/Form/TextInput';
import Button from '../../components/Form/Button';
import InputContainer from '../../components/Form/InputContainer';

const NewTransaction: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   const [message, setMessage] = useState<object>(null);
   let initialValues = {
      receiver: '',
      sourceCurrency: '',
      targetCurrency: '',
      amount: '',
   };
   // All Validations
   const insertingValidationSchema = Yup.object().shape({
      receiver: Yup.string().required().label('Receiver'),
      sourceCurrency: Yup.string().email().required().label('Source Currency'),
      targetCurrency: Yup.string().email().required().label('Target Currency'),
      amount: Yup.string().required().label('Amount'),
   });
   const handleSubmit = async (values: object, onSubmitProps: object) => {
      try {
         setLoading(true);
         const body = {
            receiver: values.receiver,
            sourceCurrency: values.sourceCurrency,
            targetCurrency: values.targetCurrency,
            amount: values.amount,
         };
         result = await axios.post('api/transactions/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
         });
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

   return (
      <>
         <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-xl m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-8'>
               <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>New Transaction</h1>
               {/* <p className='text-red-500'>hello {!!message ?? message.message}</p> */}
               <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize validationSchema={insertingValidationSchema}>
                  {({ values, handleChange, handleSubmit, setFieldValue, touched, handleBlur, errors }) => (
                     <form onSubmit={handleSubmit}>
                        <TextInput onChange={handleChange('receiver')} onBlur={handleBlur('receiver')} name='receiver' label='Receiver' receiver='receiver' errorMessage={errors.receiver} value={values.receiver} placeholder='Receiver' type='select' config='' touched={touched.receiver} />
                        <div className='flex sm:flex-row flex-col sm:gap-6 gap-0'>
                           <TextInput onChange={handleChange('sourceCurrency')} onBlur={handleBlur('sourceCurrency')} name='sourceCurrency' label='Source Currency' sourceCurrency='sourceCurrency' errorMessage={errors.sourceCurrency} value={values.sourceCurrency} placeholder='Source Currency' type='select' touched={touched.sourceCurrency} config='' />
                           <TextInput onChange={handleChange('targetCurrency')} onBlur={handleBlur('targetCurrency')} name='targetCurrency' label='Target Currency' targetCurrency='targetCurrency' errorMessage={errors.targetCurrency} value={values.targetCurrency} placeholder='Target Currency' type='select' touched={touched.targetCurrency} config='' />
                        </div>
                        <TextInput onChange={handleChange('amount')} onBlur={handleBlur('amount')} name='amount' label='Amount' errorMessage={errors.amount} value={values.amount} placeholder='Amount' type='text' touched={touched.amount} />
                        <Button isDisabled={isDisabled} isLoading={isLoading} buttonText='Send' />
                     </form>
                  )}
               </Formik>
            </div>
         </div>
      </>
   );
};
export default NewTransaction;

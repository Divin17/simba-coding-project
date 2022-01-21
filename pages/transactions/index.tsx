import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Footer from '../../components/Layout/Footer';
import NavBar from '../../components/Layout/NavBar';
import Card from '../../components/Layout/Card';
import Heading from '../../components/Table/Heading';
import Table from '../../components/Table';
import Spinner from '/components/Form/Spinner';

const Transactions: React.FC = () => {
   const [transactions, setTransactions] = useState<object>(null);
   const [user, setUser] = useState<object>(null);
   useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      const getTransactions = async (id: number) => {
         const res = await axios.get(`/api/transaction/${id}`);
         setTransactions(res.data.data);
      };
      const getCurrentUser = async (id: number) => {
         const res_ = await axios.get(`/api/auth/${id}`);
         setUser(res_.data.data[0]);
      };
      getTransactions(currentUser.id);
      getCurrentUser(currentUser.id);
   }, []);
   console.log(user);

   return (
      <section className='pb-1 bg-blueGray-50'>
         <NavBar />
         <div className='w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24'>
            {Boolean(user) ? (
               <div className='flex flex-row gap-4 space-around mb-3'>
                  <Card name='NGN' balance={user.balanceNGN} path='/images/nigeria.png' />
                  <Card name='EUR' balance={user.balanceEUR} path='/images/eur.png' />
                  <Card name='USD' balance={user.balanceUSD} path='/images/usa.png' />
               </div>
            ) : null}
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6  m-auto rounded-lg border border-primaryBorder shadow-default py-10 px-4'>
               <Heading />
               <div className='block w-full overflow-x-auto'>{Boolean(transactions) ? <Table data={transactions} /> : <Spinner class='w-10 h-10 border-[2px] border-green-500 border-dotted rounded-full' />}</div>
            </div>
         </div>
         <Footer />
      </section>
   );
};
export default Transactions;

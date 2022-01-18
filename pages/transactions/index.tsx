import React from 'react';
import Footer from '../../components/Layout/Footer';
import NavBar from '../../components/Layout/NavBar';
import Heading from '../../components/Table/Heading';
import Table from '../../components/Table';

const Transactions: React.FC = () => {
   let transactions = [
      {
         'PAGE-NAME': '/argon',
         VISITORS: 4573,
         'UNIQUE-USERS': 340,
         'BOUNCE-RATE': '46%',
      },
      {
         'PAGE-NAME': '/argon/role',
         VISITORS: 2896,
         'UNIQUE-USERS': 60,
         'BOUNCE-RATE': '86%',
      },
   ];
   return (
      <section className='py-1 bg-blueGray-50'>
         <NavBar />
         <div className='w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24'>
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6  m-auto rounded-lg border border-primaryBorder shadow-default py-10 px-4'>
               <Heading />
               <div className='block w-full overflow-x-auto'>
                  <Table data={transactions} />
               </div>
            </div>
         </div>
         <Footer />
      </section>
   );
};
export default Transactions;

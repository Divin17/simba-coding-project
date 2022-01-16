import React from 'react';
import Footer from '../components/Layout/Footer';
import Heading from '../components/Table/Heading';
import Table from '../components/Table';

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
      <section class='py-1 bg-blueGray-50'>
         <div class='w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24'>
            <div class='relative flex flex-col min-w-0 break-words bg-white w-full mb-6  m-auto rounded-lg border border-primaryBorder shadow-default py-10 px-4'>
               <Heading />
               <div class='block w-full overflow-x-auto'>
                  <Table data={transactions} />
               </div>
            </div>
         </div>
         <Footer />
      </section>
   );
};
export default Transactions;

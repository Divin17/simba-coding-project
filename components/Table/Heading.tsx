import React from 'react';
import Link from 'next/link';

const Heading: React.FC = () => {
   return (
      <div className='rounded-t mb-0 px-4 py-3 border-0'>
         <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
               <h3 className='font-semibold text-base text-blueGray-700'>TRANSACTIONS</h3>
            </div>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
               <Link href='/transactions/create'>
                  <a>
                     <button className='bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' type='button'>
                        New Transaction
                     </button>
                  </a>
               </Link>
            </div>
         </div>
      </div>
   );
};
export default Heading;

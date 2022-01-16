import React from 'react';

const Heading: React.FC = () => {
   return (
      <div className='rounded-t mb-0 px-4 py-3 border-0'>
         <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
               <h3 className='font-semibold text-base text-blueGray-700'>Page Visits</h3>
            </div>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
               <button className='bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' type='button'>
                  See all
               </button>
            </div>
         </div>
      </div>
   );
};
export default Heading;
import React from 'react';

const NavBar: React.FC = () => {
   return (
      <div className='top-0 flex flex-row justify-between px-10'>
         <h1 className='font-bold text-black left-3 text-4xl'>SIMBA</h1>
         <a href='' className=''>
            Sign Out
         </a>
      </div>
   );
};
export default NavBar;

import React from 'react';

const NavBar: React.FC = () => {
   return (
      <div className='top-0 flex flex-row justify-between px-10 py-3 bg-black'>
         <h1 className='font-bold text-white left-3 text-4xl'>SIMBA</h1>
         <a href='' className='text-white'>
            Sign Out
         </a>
      </div>
   );
};
export default NavBar;

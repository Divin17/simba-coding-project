import React from 'react';

const Spinner = (React.FC = () => {
   return (
      <div className='px-32'>
         <div style={{ 'border-top-color': 'transparent' }} className='content-center w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin'></div>
      </div>
   );
});
export default Spinner;

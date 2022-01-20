import React from 'react';

const Spinner: React.FC = (props) => {
   return (
      <div className='px-32'>
         <div style={{ borderTopColor: 'transparent' }} className={`content-center ${props.class} animate-spin`}></div>
      </div>
   );
};
export default Spinner;

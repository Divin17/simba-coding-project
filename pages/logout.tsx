import react, { useEffect } from 'react';
import Router from 'next/router';

const Logout: React.FC = () => {
   useEffect(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      Router.push('/login');
   }, []);
   return <div></div>;
};
export default Logout;

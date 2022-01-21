import React from 'react';
import Router from 'next/router';

const logout: React.FC = () => {
   localStorage.removeItem('user');
   localStorage.removeItem('token');
   Router.push('/login');
   return <div></div>;
};
export default logout;

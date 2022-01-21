import React, { useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      Boolean(user) ? Router.push('/transactions') : Router.push('/login');
   }, []);
   return <div></div>;
}

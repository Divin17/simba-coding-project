import React from 'react';
import Image from 'next/image';

export type Props = {
   balance: Number;
   name: string;
   path: string;
};

const Card: React.FC<Props> = (props) => {
   return (
      <div className='flex gap-4 bg-white p-4 border rounded-lg'>
         <Image src={props.path} width={60} height={60} alt={props.balance} />
         <div className='flex flex-col justify-around'>
            <p className='font-bold text-green-400'>{props.name}</p>
            <p className='text-black font-semibold'>{props.balance}</p>
         </div>
      </div>
   );
};

export default Card;

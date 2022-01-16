import React from 'react';
import Spinner from './Spinner';

export type Props = {
   buttonText: string;
   isDisabled: boolean;
   onClick: (event: React.FormEvent<HTMLButtonElement>) => void;
   isLoading: boolean;
};

const Button: React.FC<Props> = (props) => {
   return (
      <button className={`${props.isDisabled ? 'ring-1 text-red-300 ring-red-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400'} w-full text-white font-bold py-2 px-4 rounded mt-4 content-center`} type='button' onClick={props.onClick} disabled={props.isDisabled}>
         {props.isLoading ? <Spinner /> : props.buttonText}
      </button>
   );
};
export default Button;

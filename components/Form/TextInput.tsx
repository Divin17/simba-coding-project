import React from 'react';

export type Props = {
   id: string;
   name: string;
   onChange: (event: any) => void;
   label: string;
   message: string;
   errorMessage?: string;
   placeholder: string;
   max?: number;
   required?: boolean;
   preValue?: string | number;
   type?: 'text' | 'email' | 'number' | 'password';
};

const TextInput: React.FC<Props> = (props) => {
   return (
      <div className='mb-2'>
         <label className='block text-black text-sm font-bold mb-2'>{props.label}</label>
         <input className={`appearance-none border ${props.errorMessage && props.touched && 'border-red-500'} rounded w-full py-2 px-3 mb-2 text-gray-700`} name={props.name} type={props.type} onChange={props.onChange} onBlur={props.onBlur} defaultValue={props.preValuealue} maxLength={props.max} id={props.id} placeholder={props.placeholder ?? ''} />
         <p className={`${props.errorMessage && props.touched && 'text-red-500'} text-xs`}>{props.touched && !!props.errorMessage && props.errorMessage}</p>
      </div>
   );
};
export default TextInput;

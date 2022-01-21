import React from 'react';
import Th from './Th';
import Td from './Td';

type Props = {
   data: [];
};

const Table: React.FC<Props> = (props) => {
   let headingArr = [];
   const id = JSON.parse(localStorage.getItem('user')).id;
   for (let key in props.data[0]) {
      if (key != 'id' && key != 'enabled') headingArr.push(key);
   }
   let heading = headingArr.map((item) => <Th key={item}>{item}</Th>);
   let content = props.data.map((row) => {
      const receiver = row.receiver.id == id ? 'You' : row.receiver.name;
      const sender = Boolean(row.sender) ? (row.sender.id == id ? 'You' : row.sender.name) : null;
      const key = Math.floor(Math.random() * 1000 + 1);
      delete row.id;
      delete row.senderId;
      delete row.receiverId;
      const tds = Object.keys(row).map((item) => {
         const code = Math.floor(Math.random() * 1000 + 1);
         if (item === 'receiver') return <Td key={item + code}>{Boolean(receiver) ? receiver : 'N/A'}</Td>;
         if (item === 'sender') return <Td key={item + code}>{Boolean(sender) ? sender : 'N/A'}</Td>;
         if (item === 'completed')
            return (
               <Td key={item + code}>
                  <span className={`${row[item] ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded-xl px-2 py-1 font-bold`}>{row[item] ? 'Completed' : 'Pending'}</span>
               </Td>
            );
         if (item === 'amount')
            return (
               <Td key={item + code} class={row.receiver.id == id ? 'text-green-500' : 'text-red-500'}>
                  {row.receiver.id == id ? '+' : '-'}&nbsp;
                  {Boolean(row[item]) ? row[item] : 'N/A'}&nbsp;
                  {row.sourceCurrency}
               </Td>
            );
         return <Td key={item + code}>{Boolean(row[item]) ? row[item] : 'N/A'}</Td>;
      });
      return <tr key={key}>{tds}</tr>;
   });

   return (
      <table className='items-center bg-transparent w-full border-collapse '>
         <thead>
            <tr>{heading}</tr>
         </thead>

         <tbody>
            {content}
            {/* <i class='fas fa-arrow-up text-emerald-500 mr-4'></i> */}
         </tbody>
      </table>
   );
};
export default Table;

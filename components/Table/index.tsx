import React from 'react';
import Th from './Th';
import Td from './Td';

type Props = {
   data: [];
};

const Table: React.FC<Props> = (props) => {
   let headingArr = [];
   for (let key in props.data[0]) {
      if (key != 'id' && key != 'enabled') headingArr.push(key);
   }
   let heading = headingArr.map((item) => <Th key={item}>{item}</Th>);
   let content = props.data.map((row) => {
      const receiver = row.receiver.name;
      const key = Math.floor(Math.random() * 1000 + 1);
      delete row.id;
      delete row.senderId;
      delete row.receiverId;
      delete row.completed;
      const tds = Object.keys(row).map((item) => {
         const code = Math.floor(Math.random() * 1000 + 1);
         if (item === 'receiver') return <Td key={item + code}>{Boolean(receiver) ? receiver : 'N/A'}</Td>;
         if (item === 'amount')
            return (
               <Td key={item + code} class={parseFloat(row[item]) > 0 ? 'text-green-500' : 'text-red-500'}>
                  {Boolean(row[item]) ? row[item] : 'N/A'}&nbsp;
                  {parseFloat(row[item]) > 0 ? row.targetCurrency : row.sourceCurrency}
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

import React from 'react';
import Th from './Th';
import Td from './Td';

type Props = {
   data: object;
};

const Table: React.FC<Props> = (props) => {
   let headingArr = [];
   for (let key in props.data[0]) {
      if (key != 'id' && key != 'enabled') headingArr.push(key);
   }
   let heading = headingArr.map((item) => <Th key={item}>{item}</Th>);
   let content = props.data.map((row) => {
      const key = Math.floor(Math.random() * 1000 + 1);
      const tds = Object.values(row).map((item) => {
         const key_2 = Math.floor(Math.random() * 1000 + 1);
         return <Td key={item + key_2}>{item}</Td>;
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

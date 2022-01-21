import React, { ReactNode } from 'react';

type Props = {
   class?: Object;
   children: ReactNode;
};
const Td: React.FC<Props> = (props) => {
   return <td className={`${props.class} border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4`}>{props.children}</td>;
};
export default Td;

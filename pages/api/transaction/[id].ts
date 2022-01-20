import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === 'GET') {
      try {
         const { id } = req.query.id;
         const transactions = await prisma.transaction.findMany({
            where: {
               receiverId: { equals: id },
            },
            include: {
               sender: {
                  select: { name: true },
               },
               receiver: {
                  select: { name: true },
               },
            },
         });
         return res.status(200).json({
            status: 'success',
            message: '',
            data: transactions,
         });
      } catch (error) {
         return res.status(400).json({
            status: 'failed',
            error: 'Action Failed',
            data: error,
         });
      }
   }
};

export default getTransactions;

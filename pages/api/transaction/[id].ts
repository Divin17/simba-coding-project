import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
const getTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === 'GET') {
      try {
         const { id } = req.query;

         const received_transactions = await prisma.transaction.findMany({
            where: {
               receiverId: Number(id),
            },
            orderBy: [
               {
                  createdAt: 'desc',
               },
            ],
            include: {
               sender: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
               receiver: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
            },
         });

         const sent_transactions = await prisma.transaction.findMany({
            where: {
               senderId: Number(id),
            },
            include: {
               sender: true,
               receiver: true,
            },
         });

         const transactions = [...received_transactions, ...sent_transactions];
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

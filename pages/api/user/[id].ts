import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === 'GET') {
      try {
         const { id } = req.query;
         const results = await prisma.user.findMany({
            select: {
               id: true,
               name: true,
            },
         });
         const users = results.filter((user: any) => user.id !== Number(id));
         return res.status(200).json({
            status: 'success',
            message: '' + id,
            data: users,
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

export default getUsers;

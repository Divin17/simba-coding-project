import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
const currentUser = async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === 'GET') {
      try {
         const { id } = req.query;
         console.log('user id+++++++++++++++', id);
         const user: any = await prisma.user.findMany({
            where: {
               id: Number(id),
            },
         });
         console.log('User++++++++', user);
         return res.status(200).json({
            status: 'success',
            message: '' + id,
            data: user,
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

export default currentUser;

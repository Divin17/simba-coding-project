import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';
import { encode_token } from '../../../helpers/auth';

export default async function signUp(req, res) {
   if (req.method === 'POST') {
      try {
         const { name, email, password } = req.body;
         const userExists = await prisma.user.findUnique({
            where: {
               email,
            },
         });
         if (userExists) {
            return res.status(422).json({
               status: false,
               error: 'User account already exists!',
               data: {},
            });
         }
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(password, salt);
         const user: any = await prisma.user.create({
            data: {
               name,
               email,
               password: hash,
            },
         });
         await prisma.transaction.create({
            data: { receiverId: user.id, amount: 1000, exchangeRate: 1 },
         });
         const token = encode_token(user);
         delete user.password;
         res.status(200).json({
            status: true,
            message: 'User registration succeeded',
            token,
            data: {},
         });
      } catch (error) {
         return res.status(400).json({
            status: false,
            error: 'Action failed ',
            data: error,
         });
      }
   }
}

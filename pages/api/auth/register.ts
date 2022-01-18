import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';
import { encode_token } from '../../../helpers/auth';

export default async function signUp(req, res) {
   if (req.method === 'POST') {
      try {
         const { name, email, password } = req.body;
         console.log(name, email, password);
         const userExists = await prisma.user.findUnique({
            where: {
               email,
            },
         });
         console.log('user', userExists);
         if (userExists) {
            return res.status(400).json({
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
         console.log(user);
         await prisma.transaction.create({
            data: { receiverId: user.id, amount: 1000 },
         });
         const token = encode_token(user);
         console.log('token', token);
         delete user.password;
         res.status(200).json({
            status: true,
            message: 'User registration succeeded',
            token,
            data: user,
         });
      } catch (error) {
         console.log('Error', error);
         return res.status(400).json({
            status: false,
            error: 'Action failed ',
            data: error,
         });
      }
   }
}

import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';
import { encode_token } from '../../../helpers/auth';

export default async function signUp(req, res) {
   if (req.method === 'POST') {
      try {
         const { receiverId, amount, source_currency, target_currency, senderId } = req.body;

         if (!receiverId || amount < 1 || !senderId) {
            return res.status(400).json({
               status: false,
               error: `Transaction failed`,
               data: {},
            });
         }
         if (receiverId === senderId) {
            return res.status(400).json({
               status: false,
               error: 'Sender Is the same as the receiver',
               data: {},
            });
         }
         const receiver: any = await prisma.user.findUnique({
            where: {
               id: receiverId,
            },
         });
         const sender: any = await prisma.user.findUnique({
            where: {
               id: senderId,
            },
         });
         const sender_money_acc = `balance${source_currency}`;
         let rate = 1;
         if (source_currency === target_currency) rate = 1;
         if (source_currency === 'USD' && target_currency === 'NGN') rate = 421.95;
         if (source_currency === 'USD' && target_currency === 'EUR') rate = 0.68;
         if (source_currency === 'NGN' && target_currency === 'USD') rate = 0.0021;
         if (source_currency === 'NGN' && target_currency === 'EUR') rate = 0.0047;
         if (source_currency === 'EUR' && target_currency === 'USD') rate = 1.78;
         if (source_currency === 'EUR' && target_currency === 'NGN') rate = 628.85;
         const receiver_money_acc = `balance${target_currency}`;
         const transaction_amount = amount * rate;
         if (sender[sender_money_acc] < amount) {
            return res.status(400).json({
               status: 'failed',
               error: 'Insufficient Balance to make this transaction',
               data: {},
            });
         }
         const new_sender_balance = sender[sender_money_acc] - amount;
         const new_receiver_balance = Number.parseInt(receiver[receiver_money_acc]) + transaction_amount;
         const transaction = await prisma.transaction.create({
            data: {
               senderId: senderId,
               receiverId: receiverId,
               sourceCurrency: source_currency,
               targetCurrency: target_currency,
               amount: amount,
               exchangeRate: rate,
            },
         });
         await prisma.user.update({
            where: {
               id: receiver.id,
            },
            data: {
               [receiver_money_acc]: new_receiver_balance,
            },
         });
         await prisma.user.update({
            where: {
               id: sender.id,
            },
            data: {
               [sender_money_acc]: new_sender_balance,
            },
         });
         await prisma.transaction.update({
            where: { id: transaction.id },
            data: {
               completed: true,
            },
         });
         return res.status(200).json({
            status: true,
            message: 'Transaction Succeeded',
            data: transaction,
         });
      } catch (error) {
         return res.status(400).json({
            status: false,
            error: 'Transaction failed',
            data: error,
         });
      }
   }
}

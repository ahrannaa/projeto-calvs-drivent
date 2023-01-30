import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPaymentByTicketId(ticketId: number) {
  const payment = await prisma.payment.findFirst({
    where: {
      ticketId: ticketId
    }, 
  });
  
  return payment;
}

async function createPayment(payment: NewPayment, ticketId: number) {
  const newPayment = await prisma.payment.create({
    data: {
      ticketId,
      ...payment, 
    }
  });
  return newPayment;
}

export type NewPayment = Omit<Payment,  "id" | "createdAt" | "updatedAt"> 

const paymentsRepository = {
  findPaymentByTicketId,
  createPayment
};
export default paymentsRepository;
  

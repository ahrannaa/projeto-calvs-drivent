import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

export type cardData = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

async function checkTicketAndEnrollment(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.findTicket(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
  if (enrollment.userId !== userId) {
    throw unauthorizedError();
  }
}
async function getPaymentsTicketId(ticketId: number, userId: number) {
  await checkTicketAndEnrollment(userId, ticketId);
  const paymentsWithTicketId = await paymentsRepository.findPaymentByTicketId(ticketId);

  if (!paymentsWithTicketId) {
    throw notFoundError();
  }

  return paymentsWithTicketId;
}

async function createPayment(userId: number, ticketId: number, cardData: cardData) {
  await checkTicketAndEnrollment(userId, ticketId);
  const ticket = await ticketsRepository.findTicketWithTicketType(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  const payment = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const newPayment = await paymentsRepository.createPayment(payment, ticketId);
  await ticketsRepository.updateTicketPayment(ticketId);

  return newPayment;
}
const paymentsService = {
  checkTicketAndEnrollment,
  getPaymentsTicketId,
  createPayment,
};
export default paymentsService;

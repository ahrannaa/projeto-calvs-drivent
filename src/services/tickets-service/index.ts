import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";
import { TicketStatus } from "@prisma/client";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getTicketsTypes() {
  const tickets = await ticketsRepository.findTicketTypes();
  return tickets;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.findTicketWithTicketTypeByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function createTicket(ticketTypeId: number, userId: number) {
  const ticketType = await ticketsRepository.findTicketType(ticketTypeId);

  if (!ticketType) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  const createNewTicket = await ticketsRepository.createTicket(ticket);
  return {
    ...createNewTicket,
    TicketType: ticketType,
  };
}

const ticketsService = {
  getTicketsTypes,
  getTicketByUserId,
  createTicket,
};

export default ticketsService;

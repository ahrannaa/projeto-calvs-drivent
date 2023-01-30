import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

async function findTicketTypes() {
  const ticketsTypes = await prisma.ticketType.findMany();
  return ticketsTypes;
}

async function findTicketType(ticketTypeId: number) {
  const ticketsType = await prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
  return ticketsType;
}

async function findTicketWithTicketTypeByEnrollmentId(enrollmentId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: { TicketType: true },
  });
  return ticket;
}

async function findTicket(id: number) {
  const ticket = await prisma.ticket.findFirst({
    where: { id }
  });
  return ticket;
}

async function findTicketWithTicketType(ticketId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId
    }, include: {
      TicketType: true
    }
  });

  return ticket;
}

async function createTicket(ticket: CreateTicket) {
  return await prisma.ticket.create({
    data: { 
      ...ticket
    }
  });
}

async function updateTicketPayment(ticketId: number) {
  const updateTicket = await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID
    }
  });
  return updateTicket;
}

const ticketsRepository = {
  findTicketTypes,
  findTicket,
  createTicket,
  findTicketWithTicketType,
  updateTicketPayment,
  findTicketWithTicketTypeByEnrollmentId,
  findTicketType 

};

export type CreateTicket = Omit<Ticket, "id" |"createdAt" | "updatedAt" >;
  
export default ticketsRepository;


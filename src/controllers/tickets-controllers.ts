import { getStatusByError } from "@/errors/status-handler";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketsService.getTicketsTypes();
    res.status(httpStatus.OK).send(ticketsTypes);
    return;
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}     

export async function getTicketByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketsService.getTicketByUserId(userId);
    res.status(httpStatus.OK).send(ticket);
    return;
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}     

export async function createNewTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;
  try {
    const newTicketType = await ticketsService.createTicket(ticketTypeId, userId);
    return res.status(httpStatus.CREATED).send(newTicketType);
  } catch (error) {
    const status = getStatusByError(error);
    return res.sendStatus(status);
  }
}     


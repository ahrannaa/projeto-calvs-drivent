import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentsByTicketId(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;

  if(!ticketId) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
  
  try {
    const paymentsByTicketId = await paymentsService.getPaymentsTicketId(Number(ticketId), userId);
    if(!paymentsByTicketId) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    return res.status(httpStatus.OK).send(paymentsByTicketId);
  } catch (error) {
    if(error.name === "UnauthorizedError" ) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else{
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}
export async function createPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData }  = req.body;
  const { userId } = req;

  if(!ticketId) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }

  if(!cardData) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
  
  try{
    const formOfPayment = await paymentsService.createPayment(userId, ticketId, cardData);
    if(!formOfPayment) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }
    res.status(httpStatus.OK).send(formOfPayment);
  } catch(error) {
    if(error.name === "UnauthorizedError" ) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else{
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

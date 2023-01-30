import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { createNewTicket, getTicketsTypes, getTicketByUser } from "@/controllers/tickets-controllers";
import { ticketsSchema } from "@/schemas/tickets-schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTicketByUser)
  .post("/", validateBody(ticketsSchema), createNewTicket);

export { ticketsRouter };


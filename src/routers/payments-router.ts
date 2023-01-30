import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createPayments, getPaymentsByTicketId } from "@/controllers/payments-controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentsByTicketId)
  .post("/process", createPayments);
  
export { paymentsRouter };

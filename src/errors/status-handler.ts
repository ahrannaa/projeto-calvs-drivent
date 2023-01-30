import { ApplicationError } from "@/protocols";
import httpStatus from "http-status";

export function getStatusByError(error: ApplicationError) {
  let status = httpStatus.SERVICE_UNAVAILABLE;
  if (error.name == "NotFoundError") {
    status = httpStatus.NOT_FOUND;
  } else if (error.name == "UnauthorizedError") {
    status = httpStatus.UNAUTHORIZED;
  }
  return status;
}

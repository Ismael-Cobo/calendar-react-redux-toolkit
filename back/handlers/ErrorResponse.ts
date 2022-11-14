import { IErrorResponse } from '../interfaces/ErrorResponse'

export class ErrorResponse implements IErrorResponse {
  constructor(readonly message: string, readonly statusCode: number) {}
}

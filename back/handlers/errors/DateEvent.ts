import { ErrorResponse } from './ErrorResponse'

export class DateEvent implements ErrorResponse {
  constructor(readonly message: string, readonly statusCode: number) {}
}

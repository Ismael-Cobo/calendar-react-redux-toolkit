import { ErrorResponse } from './ErrorResponse'

export class EventNotFound implements ErrorResponse {
  constructor(readonly message: string, readonly statusCode: number) {}
}

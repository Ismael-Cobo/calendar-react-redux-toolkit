import { ErrorResponse } from './ErrorResponse'

export class UserAlreadyExists implements ErrorResponse {
  constructor(readonly message: string, readonly statusCode: number) {}
}

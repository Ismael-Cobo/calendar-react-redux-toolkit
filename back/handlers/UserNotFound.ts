import { ErrorResponse } from './ErrorResponse'

export class UserNotFound implements ErrorResponse {
  constructor(readonly message: string, readonly statusCode: number) {}
}

import { ErrorResponse } from './ErrorResponse'

export class IllegalArguments implements ErrorResponse {
  constructor(readonly message: string, readonly statusCode: number) {}
}

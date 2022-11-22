import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface RequestExtended extends Request {
  user?: { id: string | JwtPayload; email: string | JwtPayload; name: string | JwtPayload }
  // uid?: string | JwtPayload
}

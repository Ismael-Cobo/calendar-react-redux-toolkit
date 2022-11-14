import { Request, Response } from 'express'
import { registerNewUser } from '../services/AuthService'
import { IErrorResponse } from '../interfaces/ErrorResponse'

export const loginController = async (req: Request, res: Response) => {}

export const registerController = async ({ body }: Request, res: Response) => {
  try {
    await registerNewUser(body)
  } catch (e) {
    res.status(e.statusCode).json({
      ok: false,
      msg: e.message,
      data: null,
    })
  }
}

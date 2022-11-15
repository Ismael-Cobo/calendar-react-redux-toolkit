import { Request, Response } from 'express'
import { login, registerNewUser } from '../services/AuthService'

export const loginController = async ({ body }: Request, res: Response) => {
  try {
    const user = await login(body)

    return res.status(200).json({
      ok: true,
      msg: 'usuario logeado correctamente',
      data: user,
    })
  } catch (e) {
    res.status(e.statusCode).json({
      ok: false,
      msg: e.message,
      data: null,
    })
  }
}

export const registerController = async ({ body }: Request, res: Response) => {
  try {
    const user = await registerNewUser(body)

    return res.json({
      ok: true,
      msg: 'usuario registrado correctamente',
      data: user,
    })
  } catch (e) {
    res.status(e.statusCode || 500).json({
      ok: false,
      msg: e.message,
      data: null,
    })
  }
}

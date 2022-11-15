import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../handlers/jwt/jwt'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization

    const jwt = jwtByUser?.split(' ').pop()

    if (!verifyToken(`${jwt}`)) {
      return res.status(400).json({
        ok: false,
        msg: 'No se ha podido verificar el token',
        data: null,
      })
    }

    next()
  } catch (e) {
    res.status(400).json({
      ok: false,
      msg: 'No se ha podido establecer una sesión',
      data: null,
    })
  }
}

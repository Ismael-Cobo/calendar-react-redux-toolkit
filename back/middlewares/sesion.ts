import { NextFunction, Response } from 'express'
import { verifyToken } from '../handlers/jwt/jwt'
import { RequestExtended } from '../interfaces/RequestExtended'

export const checkJwt = (req: RequestExtended, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization
    const jwt = jwtByUser?.split(' ').pop()

    const isOk = verifyToken(`${jwt}`)

    req.user = {
      email: isOk.email,
      id: isOk.id,
      name: isOk.name,
    }

    if (!isOk) {
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

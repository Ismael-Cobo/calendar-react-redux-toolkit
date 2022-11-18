import { NextFunction, Response } from 'express'
import { RequestExtended } from '../interfaces/RequestExtended'

export const isSameUser = ({ params, user }: RequestExtended, res: Response, next: NextFunction) => {
  const { id } = params

  if (user?.id && String(user.id) !== id) {
    return res.status(403).json({
      ok: false,
      msg: 'No estás autorizado a modificar las propiedades',
      data: null,
    })
  }

  next()
}

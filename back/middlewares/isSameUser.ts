import { NextFunction, Response } from 'express'
import { RequestExtended } from '../interfaces/RequestExtended'

export const isSameUser = ({ params, user, body }: RequestExtended, res: Response, next: NextFunction) => {
  const { user_id } = body
  console.log(user_id, user?.id)
  if (user?.id && Number(user.id) !== Number(user_id)) {
    return res.status(403).json({
      ok: false,
      msg: 'No estás autorizado a modificar las propiedades',
      data: null,
    })
  }

  next()
}

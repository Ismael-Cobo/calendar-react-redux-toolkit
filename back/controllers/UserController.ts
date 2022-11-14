import { Request, Response } from 'express'
import { findOneById, saveOneUser, updateOneUser, deleteOneUser, findAllNotDeletedUsers } from '../services/UserService'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await findAllNotDeletedUsers()

    res.status(200).json({
      ok: true,
      msg: 'Datos recibidos correctamente',
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

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await findOneById(id)

    res.status(200).json({
      ok: true,
      msg: 'Usuario enviado correctamente',
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

export const saveUser = async ({ body }: Request, res: Response) => {
  try {
    const user = await saveOneUser({ ...body, state: false })

    res.status(200).json({
      ok: true,
      msg: 'Usuario guardado correctamente',
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

export const updateUser = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params

    const user = await updateOneUser({ ...body, id })

    res.status(200).json({
      ok: true,
      msg: 'Usuario actualizado correctamente',
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await deleteOneUser(id)

    res.status(200).json({
      ok: true,
      msg: 'Usuario borrado correctamente',
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

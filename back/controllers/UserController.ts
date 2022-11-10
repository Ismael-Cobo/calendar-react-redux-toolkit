import { Request, Response } from 'express'
import { User } from '../models/User'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.findAll()

    res.status(200).json({
      ok: true,
      msg: 'Datos recibidos correctamente',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error getUsers',
      data: null,
    })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no se ha podido encontrar',
        data: null,
      })
    }

    res.status(200).json({
      ok: true,
      msg: 'Usuario enviado correctamente',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error getUser',
      data: null,
    })
  }
}

export const saveUser = async (req: Request, res: Response) => {
  try {
    const { body } = req

    const { email } = body

    const userExistByEmail = await User.findOne({ where: { email } })

    if (userExistByEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese correo electrónico',
        data: null,
      })
    }

    const user = await User.create({ ...body, state: 1 })

    await user.save()

    res.status(200).json({
      ok: true,
      msg: 'Usuario guardado correctamente',
      data: user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error saveUser',
      data: null,
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { body } = req

    const userExist = await User.findOne({
      where: { id },
    })

    if (!userExist) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
        data: null,
      })
    }

    res.status(200).json({
      ok: true,
      msg: 'Usuario actualizado correctamente',
      data: userExist,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error updateUser',
      data: null,
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe',
        data: null,
      })
    }

    await user.update({ state: 0 })

    res.status(200).json({
      ok: true,
      msg: 'Usuario borrado correctamente',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error deleteUser',
      data: null,
    })
  }
}

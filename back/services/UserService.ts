import { UserInterface } from '../interfaces/User'

import { User } from '../models/User'

import { IllegalArguments, UserAlreadyExists, UserNotFound } from '../handlers'
import { encryptPassword } from '../handlers/bcrypt/bcrypt'

export const findAllUsers = async () => {
  return await User.findAll()
}

export const findAllNotDeletedUsers = async () => {
  return await User.findAll({ where: { state: false } })
}

export const findOneById = async (id: string) => {
  if (!id) throw new IllegalArguments('Error, hable con el administrador', 500)

  const userToFind = await User.findByPk(id)

  if (!userToFind) throw new UserNotFound('El usuario no se ha podido encontrar', 404)

  return userToFind
}

export const findOneByEmail = async (email: string) => {
  if (!email) throw new IllegalArguments('Error, el email es obligatorio', 400)

  const userToFind = await User.findOne({ where: { email } })
  if (!userToFind) throw new UserNotFound('El usuario no se ha podido encontrar', 404)

  return userToFind
}

export const saveOneUser = async (user: UserInterface) => {
  if (!user) throw new IllegalArguments('Error, el usuario es obligatorio', 400)

  const userToFind = await User.findOne({ where: { email: user.email } })

  if (userToFind) throw new UserAlreadyExists('El usuario ya existe con ese email', 400)

  const passwordHashed = await encryptPassword(user.password)

  return await User.create({ ...user, password: passwordHashed })
}

export const updateOneUser = async (user: UserInterface) => {
  if (!user) throw new IllegalArguments('Error, el usuario es obligatorio', 400)

  const userToFind = await User.findOne({ where: { id: user.id } })

  if (!userToFind) throw new UserNotFound('El usuario no se ha podido encontrar', 404)

  return await userToFind.update(user)
}

export const deleteOneUser = async (id: string) => {
  if (!id) throw new IllegalArguments('Error, hable con el administrador', 500)

  const userToFind = await User.findOne({ where: { id } })

  if (!userToFind) throw new UserNotFound('El usuario no se ha podido encontrar', 404)

  await userToFind.update({ state: true })

  return true
}

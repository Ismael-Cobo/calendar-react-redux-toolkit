import { encryptPassword, UserAlreadyExists } from '../handlers'
import { UserInterface } from '../interfaces/User'
import { User } from '../models/User'
import { UserNotFound } from '../handlers/errors/UserNotFound'
import { verifyPassword } from '../handlers/bcrypt/bcrypt'
import { generateToken } from '../handlers/jwt/jwt'

export const registerNewUser = async ({ email, name, password }: UserInterface) => {
  const checkUserExist = await User.findOne({ where: { email } })

  if (checkUserExist) throw new UserAlreadyExists('User already exist', 404)

  const passwordHashed = await encryptPassword(password)

  return await User.create({ email, name, password: passwordHashed, state: false })
}

export const login = async ({ email, password }: UserInterface) => {
  const userToFind = await User.findOne({ where: { email } })

  if (!userToFind) throw new UserNotFound('Credenciales incorrectas', 400)

  const passwordHashed = await verifyPassword(password, userToFind.password)

  if (!passwordHashed) throw new UserNotFound('Credenciales incorrectas', 400)

  const token = generateToken(email)

  const data = {
    ...userToFind.dataValues,
    token,
  }

  return data
}

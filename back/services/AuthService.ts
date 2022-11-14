import { UserAlreadyExists } from '../handlers/UserAlreadyExist'
import { UserInterface } from '../interfaces/User'
import { User } from '../models/User'
import { saveOneUser } from './UserService'

export const registerNewUser = async ({ email }: UserInterface) => {
  const checkUserExist = await User.findOne({ where: { email } })

  if (checkUserExist) throw new UserAlreadyExists('User already exist', 404)

  //   await saveOneUser(user)
}

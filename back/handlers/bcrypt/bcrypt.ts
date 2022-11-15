import { compare, hash } from 'bcryptjs'

export const encryptPassword = async (plaiPass: string) => {
  return await hash(plaiPass, 8)
}

export const verifyPassword = async (plainPass: string, hashedPass: string) => {
  return await compare(plainPass, hashedPass)
}

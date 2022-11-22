import { sign, verify, JwtPayload } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || '1234'

export const generateToken = ({ id, email, name }: { id: string; email: string; name: string }) => {
  const jwt = sign({ id, email, name }, JWT_SECRET, {
    expiresIn: '2h',
  })

  return jwt
}

export const verifyToken = (jwt: string): any => {
  const isOk = verify(jwt, JWT_SECRET)
  return isOk
}

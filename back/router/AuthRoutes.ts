import { Router } from 'express'
import { loginController, registerController, renewToken } from '../controllers/AuthController'
import { checkJwt } from '../middlewares/sesion'

export const authRouter = Router()

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/renew', checkJwt, renewToken)

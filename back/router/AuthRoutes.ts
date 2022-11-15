import { Router } from 'express'
import { loginController, registerController } from '../controllers/AuthController'

export const authRouter = Router()

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)

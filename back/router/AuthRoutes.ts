import { Router } from 'express'
import { registerController } from '../controllers/AuthController'

export const authRouter = Router()

authRouter.post('/register', registerController)

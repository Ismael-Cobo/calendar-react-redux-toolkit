import { Router } from 'express'
import { getUser, getUsers, saveUser, updateUser, deleteUser } from '../controllers/UserController'
import { checkJwt, isSameUser } from '../middlewares'

export const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.post('/', checkJwt, saveUser)
userRouter.put('/:id', [checkJwt, isSameUser], updateUser)
userRouter.delete('/:id', checkJwt, deleteUser)

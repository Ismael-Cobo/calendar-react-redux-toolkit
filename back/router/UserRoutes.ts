import { Router } from 'express'
import { getUser, getUsers, saveUser, updateUser, deleteUser } from '../controllers/UserController'

export const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.post('/', saveUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

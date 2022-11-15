import { Optional, Model, InferAttributes, InferCreationAttributes } from 'sequelize'

export interface UserInterface extends Model<InferAttributes<UserInterface>, InferCreationAttributes<UserInterface>> {
  id?: string
  name: string
  email: string
  password: string
  state: boolean
}

export type UserCreationAttributes = Optional<UserInterface, 'id'>

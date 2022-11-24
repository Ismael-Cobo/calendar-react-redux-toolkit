import { InferCreationAttributes, InferAttributes, Model } from 'sequelize'
import { UserInterface } from './User'

export interface EventInterface
  extends Model<InferAttributes<EventInterface>, InferCreationAttributes<EventInterface>> {
  id?: string
  title: string
  description: string
  start: Date
  end: Date
  user_id: number
  user?: UserInterface
}

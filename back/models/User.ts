import { DataTypes } from 'sequelize'
import db from '../db/connection'
import { UserInterface } from '../interfaces/User'

export const User = db.define(
  'Users',
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.BOOLEAN,
    },
  },
  { timestamps: false, tableName: 'Users' }
)

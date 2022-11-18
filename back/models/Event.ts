import { DataTypes } from 'sequelize'

import db from '../db/connection'
import { User } from './User'
import { EventInterface } from '../interfaces/Event'

export const Events = db.define<EventInterface>(
  'Events',
  {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    start: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    end: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.BIGINT,
      field: 'userId',
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    tableName: 'Events',
  }
)

User.hasMany(Events)
Events.belongsTo(User)

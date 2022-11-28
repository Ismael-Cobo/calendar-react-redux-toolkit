import express, { Application } from 'express'
import cors from 'cors'

import { authRouter, userRouter, eventRouter } from '../router'

import db from '../db/connection'

import { PORT } from '../config/dbConfig'

export class Server {
  private app: Application
  private port: string
  private apiPath = {
    users: '/api/users',
    auth: '/api/auth',
    event: '/api/event',
  }

  constructor() {
    this.app = express()
    this.port = PORT

    // Llamar a la base de datos
    this.dbConnection()

    // Definir middlewares
    this.middlewares()

    // Definir las rutas
    this.routes()
  }

  listen() {
    this.app.listen(this.port, () => console.log(`Listenig on port ${this.port}`))
  }

  middlewares() {
    this.app.use(cors())

    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.apiPath.users, userRouter)
    this.app.use(this.apiPath.auth, authRouter)
    this.app.use(this.apiPath.event, eventRouter)
  }

  async dbConnection() {
    try {
      await db.sync()
      console.log('database online')
    } catch (error) {
      console.log(error)
    }
  }
}

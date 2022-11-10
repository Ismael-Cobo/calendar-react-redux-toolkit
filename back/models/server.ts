import express, { Application } from 'express'
import cors from 'cors'

import { userRouter } from '../router/UserRoutes'
import db from '../db/connection'

export class Server {
  private app: Application
  private port: string
  private apiPath = {
    users: '/api/users',
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '3000'

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
  }

  async dbConnection() {
    try {
      await db.authenticate()
      console.log('database online')
    } catch (error) {
      console.log(error)
    }
  }
}

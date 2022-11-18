import { Router } from 'express'
import {
  getEvents,
  getEventsByUserId,
  getEventById,
  saveEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/CalendarController'
import { checkJwt, isSameUser } from '../middlewares'

export const eventRouter = Router()

eventRouter.get('/', checkJwt, getEvents)
eventRouter.get('/user/:id', [checkJwt, isSameUser], getEventsByUserId)
eventRouter.get('/:id', checkJwt, getEventById)
eventRouter.post('/', checkJwt, saveEvent)
eventRouter.put('/', [checkJwt, isSameUser], updateEvent)
eventRouter.delete('/:id', [checkJwt, isSameUser], deleteEvent)

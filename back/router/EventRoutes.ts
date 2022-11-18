import { Router } from 'express'
import {
  getEvents,
  getEventsByUserId,
  getEventById,
  saveEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/CalendarController'

export const eventRouter = Router()

eventRouter.get('/', getEvents)
eventRouter.get('/user/:id', getEventsByUserId)
eventRouter.get('/:id', getEventById)
eventRouter.post('/', saveEvent)
eventRouter.put('/', updateEvent)
eventRouter.delete('/:id', deleteEvent)

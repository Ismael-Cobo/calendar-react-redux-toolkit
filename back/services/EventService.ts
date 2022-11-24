import { IllegalArguments, EventNotFound, UserNotFound, DateEvent } from '../handlers'
import { EventInterface, EventPlain } from '../interfaces'
import { EventMapper } from '../mapper'
import { Events } from '../models/Event'
import { User } from '../models/User'
import { findOneById } from './UserService'

export const findAll = async (includeUser: boolean): Promise<EventMapper[]> => {
  const eventsToMap = await Events.findAll(includeUser ? { include: [{ model: User }] } : {})

  const events: EventMapper[] = []
  eventsToMap.forEach((event) => {
    const e = new EventMapper(event)
    events.push(e)
  })

  return events
}

export const findAllByUserId = async (userId: number): Promise<EventMapper[]> => {
  if (!userId) throw new IllegalArguments('Error, hable con el administrador', 500)

  const userToFind = await User.findByPk(userId)

  if (!userToFind) throw new UserNotFound('No se ha encontrado al usuario', 404)

  const eventsToMap = await Events.findAll({ where: { user_id: userId }, include: [{ model: User }] })

  const events: EventMapper[] = []
  eventsToMap.forEach((event) => {
    const e = new EventMapper(event)
    events.push(e)
  })

  return events
}

export const findOneEventById = async (id: number): Promise<EventMapper> => {
  if (!id) throw new IllegalArguments('Error, hable con el administrador', 500)

  const eventToFind = await Events.findByPk(id, { include: [{ model: User }] })

  if (!eventToFind) throw new EventNotFound('No se ha encontrado el evento', 404)

  return new EventMapper(eventToFind)
  // return eventToFind
}

export const saveOneEvent = async (event: EventInterface): Promise<EventMapper> => {
  if (!event) throw new IllegalArguments('Error, hable con el administrador', 500)

  await findOneById(String(event.user_id))

  const eventToSave = await Events.create(event, { include: [{ model: User }] })

  return new EventMapper(eventToSave)
}

export const updateOneEvent = async (event: EventInterface): Promise<EventMapper> => {
  if (!event || !event.id) throw new IllegalArguments('Error, hable con el administrador', 500)

  const { start, end } = event

  if (start > end) throw new DateEvent('La fecha de inicio ha de ser anterior a la final', 400)

  await findOneById(String(event.user_id))

  const eventToUpdate = await Events.findByPk(event.id, { include: [{ model: User }] })

  if (!eventToUpdate) throw new EventNotFound('No se ha encontrado el evento', 404)

  await eventToUpdate.update(event)

  return new EventMapper(eventToUpdate)
}

export const deleteOneEventById = async (id: number): Promise<boolean> => {
  if (!id) throw new IllegalArguments('Error, hable con el administrador', 500)

  const eventToDelete = await Events.findByPk(id)

  if (!eventToDelete) throw new EventNotFound('No se ha encontrado el evento', 404)

  await eventToDelete.destroy()

  return true
}

import { IllegalArguments, EventNotFound, UserNotFound, DateEvent } from '../handlers'
import { EventInterface } from '../interfaces/Event'
import { Events } from '../models/Event'
import { User } from '../models/User'
import { findOneById } from './UserService'

export const findAll = async (includeUser: boolean): Promise<EventInterface[]> => {
  return await Events.findAll(includeUser ? { include: [{ model: User }] } : {})
}

export const findAllByUserId = async (userId: number): Promise<EventInterface[]> => {
  if (!userId) throw new IllegalArguments('Error, hable con el administrador', 500)

  const userToFind = await User.findByPk(userId)

  if (!userToFind) throw new UserNotFound('No se ha encontrado al usuario', 404)

  return await Events.findAll({ where: { user_id: userId } })
}

export const findOneEventById = async (id: number): Promise<EventInterface> => {
  if (!id) throw new IllegalArguments('Error, hable con el administrador', 500)

  const eventToFind = await Events.findByPk(id)

  if (!eventToFind) throw new EventNotFound('No se ha encontrado el evento', 404)

  return eventToFind
}

export const saveOneEvent = async (event: EventInterface): Promise<EventInterface> => {
  if (!event) throw new IllegalArguments('Error, hable con el administrador', 500)

  await findOneById(String(event.user_id))

  const eventToSave = await Events.create(event)

  return eventToSave
}

export const updateOneEvent = async (event: EventInterface): Promise<EventInterface> => {
  if (!event || !event.id) throw new IllegalArguments('Error, hable con el administrador', 500)

  const { start, end } = event

  if (start > end) throw new DateEvent('La fecha de inicio ha de ser anterior a la final', 400)

  await findOneById(String(event.user_id))

  const eventToUpdate = await Events.findByPk(event.id)

  if (!eventToUpdate) throw new EventNotFound('No se ha encontrado el evento', 404)

  await eventToUpdate.update(event)

  return eventToUpdate
}

export const deleteOneEventById = async (id: number): Promise<boolean> => {
  if (!id) throw new IllegalArguments('Error, hable con el administrador', 500)

  const eventToDelete = await Events.findByPk(id)

  if (!eventToDelete) throw new EventNotFound('No se ha encontrado el evento', 404)

  await eventToDelete.destroy()

  return true
}

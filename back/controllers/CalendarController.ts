import { Request, Response } from 'express'
import { Events } from '../models/Event'
import {
  deleteOneEventById,
  findAll,
  findAllByUserId,
  findOneEventById,
  saveOneEvent,
  updateOneEvent,
} from '../services/EventService'

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await findAll(true)
    return res.status(200).json({
      ok: true,
      msg: 'Eventos obtenidos correctamente',
      data: events,
    })
  } catch (e) {
    res.status(e.statusCode).json({
      ok: false,
      msg: e.message,
      data: null,
    })
  }
}

export const getEventsByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const events = await findAllByUserId(+id)

    return res.status(200).json({
      ok: true,
      msg: 'Eventos obtenidos correctamente',
      data: events,
    })
  } catch (e) {
    res.status(e.statusCode).json({
      ok: false,
      msg: e.message,
      data: null,
    })
  }
}

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const event = await findOneEventById(+id)

    return res.status(200).json({
      ok: true,
      msg: 'Evento obtenido correctamente',
      data: event,
    })
  } catch (e) {
    res.status(e.statusCode).json({
      ok: false,
      msg: e.message,
      data: null,
    })
  }
}

export const saveEvent = async (req: Request, res: Response) => {
  try {
    const eventSaved = await saveOneEvent(req.body)

    return res.status(200).json({
      ok: true,
      msg: 'Evento guardado correctemente',
      data: eventSaved,
    })
  } catch (e) {
    res.status(e.statusCode).json({
      ok: false,
      msg: e.message,
      data: null,
    })
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventUpdated = await updateOneEvent(req.body)

    return res.status(200).json({
      ok: true,
      msg: 'Evento guardado correctemente',
      data: eventUpdated,
    })
  } catch (e) {
    res.status(e.statusCode).json({
      ok: false,
      msg: e.message,
      data: null,
    })
  }
}

export const deleteEvent = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params

    const eventUpdated = await deleteOneEventById(+id)

    return res.status(200).json({
      ok: true,
      msg: 'Evento eliminado correctemente',
      data: eventUpdated,
    })
  } catch (e) {
    res.status(e.statusCode).json({
      ok: false,
      msg: e.message,
      data: null,
    })
  }
}

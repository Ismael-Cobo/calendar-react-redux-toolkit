import { EventInterface, EventPlain } from '../interfaces'
export class EventMapper {
  constructor({ title, description, id, start, end, user }: EventInterface) {
    return {
      title,
      notes: description,
      id,
      start: new Date(start),
      end: new Date(end),
      user: { _id: user?.id, name: user?.name },
    }
  }
}

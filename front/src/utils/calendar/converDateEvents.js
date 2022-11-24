import { parseISO } from 'date-fns'
export const converDateEvents = (events = []) => {
  return events.map((event) => {
    event.start = parseISO(event.start)
    event.end = parseISO(event.end)

    return event
  })
}

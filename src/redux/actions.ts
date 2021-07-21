// action types
export const OPEN_AGENDA = "OPEN_AGENDA"
export const CLOSE_AGENDA = "CLOSE_AGENDA"
export const OPEN_ADD_REMINDER = "OPEN_ADD_REMINDER"
export const CLOSE_ADD_REMINDER = "CLOSE_ADD_REMINDER"

// action creators
export function openAgenda(dateObject: DateObject) {
  return { type: OPEN_AGENDA, dateObject }
}

export function closeAgenda() {
  return { type: CLOSE_AGENDA }
}

export function openAddReminder(reminder?: any) {
  return { type: OPEN_ADD_REMINDER, reminder }
}

export function closeAddReminder() {
  return { type: CLOSE_ADD_REMINDER }
}

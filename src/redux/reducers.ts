import { AnyAction, combineReducers } from "redux"

import {
  CLOSE_ADD_REMINDER,
  CLOSE_AGENDA,
  OPEN_ADD_REMINDER,
  OPEN_AGENDA,
} from "@/src/redux/actions"

const initialAgendaState = {
  isOpen: false,
  date: null,
}

const initialAddReminderState = {
  isOpen: false,
}

function agendaStatus(state = initialAgendaState, action: AnyAction) {
  switch (action.type) {
    case OPEN_AGENDA:
      return {
        isOpen: true,
        date: action.dateObject.date,
      }
    case CLOSE_AGENDA:
      return {
        isOpen: false,
        date: null,
      }
    default:
      return state
  }
}

function addReminderStatus(state = initialAddReminderState, action: AnyAction) {
  switch (action.type) {
    case OPEN_ADD_REMINDER:
      return {
        isOpen: true,
      }
    case CLOSE_ADD_REMINDER:
      return {
        isOpen: false,
      }
    default:
      return state
  }
}

export const calendarAppReducer = combineReducers({
  agendaStatus,
  addReminderStatus,
})

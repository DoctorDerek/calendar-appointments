import {
  addDays,
  endOfMonth,
  getDay,
  getDaysInMonth,
  startOfMonth,
  subDays,
} from "date-fns"

export const daysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
export const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

/**
 * @return an array of Date objects, not "dateObjects" {date: Date}
 */
export function getMonthCells(todaysDate: Date) {
  // Six rows of seven days = 42 calendar cells
  const totalCells = 42

  // get current date
  const today = todaysDate

  // create needed variables
  const daysInMonth = getDaysInMonth(today)
  const firstOfMonth = startOfMonth(today)
  const lastOfMonth = endOfMonth(today)
  const firstDayOfMonth = getDay(firstOfMonth)
  const daysAfter = totalCells - (daysInMonth + firstDayOfMonth)

  // create arrays of date objects needed
  // to create calendar cells
  const prevMonthArray = []
  const monthArray = []
  const nextMonthArray = []

  // push into the arrays
  for (let i = firstDayOfMonth; i > 0; i--) {
    prevMonthArray.push(subDays(firstOfMonth, i))
  }

  for (let i = 0; i < daysInMonth; i++) {
    monthArray.push(addDays(firstOfMonth, i))
  }

  for (let i = 0; i < daysAfter; i++) {
    nextMonthArray.push(addDays(lastOfMonth, i + 1))
  }

  // finally combine into single array
  const calendarArray = [...prevMonthArray, ...monthArray, ...nextMonthArray]

  return calendarArray
}

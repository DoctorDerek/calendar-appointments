import {
  addDays,
  endOfMonth,
  getDay,
  getDaysInMonth,
  startOfMonth,
  subDays,
} from "date-fns"

export const daysArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
export const monthsArr = [
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

export function getMonthCells(currentDate: Date) {
  // Six rows of sevel days = 42 calendar cells
  const totalCells = 42

  // get current date
  const today = currentDate

  // create needed variables
  const daysInMonth = getDaysInMonth(today)
  const firstOfMonth = startOfMonth(today)
  const lastOfMonth = endOfMonth(today)
  const firstDayOfMonth = getDay(firstOfMonth)
  const daysAfter = totalCells - (daysInMonth + firstDayOfMonth)

  // create arrays of date objects needed
  // to create calendar cells
  const prevMonthArr = []
  const monthArr = []
  const nextMonthArr = []

  // push into the arrays
  for (let i = firstDayOfMonth; i > 0; i--) {
    prevMonthArr.push({
      date: subDays(firstOfMonth, i),
    })
  }

  for (let i = 0; i < daysInMonth; i++) {
    monthArr.push({
      date: addDays(firstOfMonth, i),
    })
  }

  for (let i = 0; i < daysAfter; i++) {
    nextMonthArr.push({
      date: addDays(lastOfMonth, i + 1),
    })
  }

  // finally combine into single array
  const calendarArr = [...prevMonthArr, ...monthArr, ...nextMonthArr]

  return calendarArr
}

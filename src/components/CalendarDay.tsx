import {
  format,
  getDate,
  getHours,
  getMinutes,
  isSameDay,
  isSameMonth,
  setHours,
  setMinutes,
} from "date-fns"
import { useState } from "react"

import { openAgenda } from "@/src/redux/agendaSlice"
import { useAppDispatch } from "@/src/redux/hooks"
import Avatar from "@material-ui/core/Avatar"

const classNames = (...classes: string[]) => classes.join(" ")

export default function CalendarDay({
  selectedDate,
  todaysDate,
}: {
  selectedDate: Date
  todaysDate: Date
}) {
  // set selectedDate to current time from todaysDate
  selectedDate = setHours(selectedDate, getHours(todaysDate))
  selectedDate = setMinutes(selectedDate, getMinutes(todaysDate))

  const dispatch = useAppDispatch()
  const onDayClick = (selectedDate: Date) => {
    dispatch(openAgenda(selectedDate))
  }
  const [focused, setFocused] = useState(false)

  const onMouseOver = () => setFocused(true)
  const onMouseOut = () => setFocused(false)
  const onClick = () => onDayClick(selectedDate)

  const formatDateAsString = (date: Date) => format(date, "LLLL do, yyyy")
  const formatDateAsDayOfWeek = (date: Date) => format(date, "EEEE")
  const ariaLabel = [
    formatDateAsDayOfWeek(selectedDate),
    formatDateAsString(selectedDate),
  ].join(" ") // e.g. Thursday July 22, 2021

  const isToday = isSameDay(selectedDate, todaysDate)

  return (
    <button
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
      onClick={onClick}
      onKeyDown={(event) => event.key === "Enter" && onClick()}
      className={classNames(
        "border-1 border-solid border-gray-300 cursor-pointer",
        isSameMonth(selectedDate, todaysDate)
          ? "bg-transparent" // inside current month
          : "bg-gray-500" // outside current month
      )}
      aria-label={ariaLabel}
    >
      <Avatar
        className={classNames(
          "text-lg text-black mx-auto",
          isToday && focused
            ? "bg-purple-800" // focused today's avatar
            : isToday
            ? "bg-purple-400" // today's avatar
            : focused
            ? "bg-gray-600" // focused avatar for normal date
            : "bg-transparent" // regular avatar for normal date
        )}
        data-testid={ariaLabel}
      >
        {getDate(selectedDate)}
      </Avatar>
      {/* reminders go here */}
    </button>
  )
}

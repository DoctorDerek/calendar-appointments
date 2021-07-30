import {
  format,
  getDate,
  getHours,
  getMinutes,
  isSameDay,
  isSameMonth,
  parseISO,
  setHours,
  setMinutes,
} from "date-fns"
import { useState } from "react"

import { openAgenda } from "@/src/redux/agendaSlice"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { Avatar } from "@material-ui/core"
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm"

const classNames = (...classes: string[]) => classes.join(" ")
// const formatDateAgenda = (date: Date) => format(date, "LLLL do, yyyy")
// const formatDateAsDayOfWeek = (date: Date) => format(date, "EEEE")
const formatDateCalendarDay = (date: Date) => format(date, "EEEE LLLL do, yyyy") // e.g. Thursday July 22, 2021
const formatTimePicker = (date: Date) => format(date, "hh:mm aaa") // 08:00 am

export default function CalendarDay({
  selectedDate,
  todaysDate,
}: {
  selectedDate: Date
  todaysDate: Date
}) {
  // set selectedDate to current time from todaysDate instead of 12:00AM
  selectedDate = setHours(selectedDate, getHours(todaysDate))
  selectedDate = setMinutes(selectedDate, getMinutes(todaysDate))

  // use the useAppSelector hook to get the showHours state from the Redux store
  const { showHours } = useAppSelector(({ showHours }) => showHours)
  // when showHours is false, only icons will be shown on the calendar, no hours

  // get the entire list of reminders from the Redux store
  const { reminders } = useAppSelector(({ reminders }) => reminders)
  // filter the reminders to only include those for the current day's agenda
  const calendarDayReminders = reminders.filter((reminder) => {
    return isSameDay(parseISO(reminder.dateISOString), selectedDate)
  })

  // configure the dispatch actions to open the agenda to the correct day
  const dispatch = useAppDispatch()
  const onDayClick = (selectedDate: Date) => {
    dispatch(openAgenda(selectedDate.toISOString()))
  }
  const [focused, setFocused] = useState(false)
  const onMouseOver = () => setFocused(true)
  const onMouseOut = () => setFocused(false)
  const onClick = () => onDayClick(selectedDate)

  // determine isToday, which will be used to highlight today's date
  const isToday = isSameDay(selectedDate, todaysDate)

  // generate the aria-label for the calendar day in long format
  const ariaLabel = formatDateCalendarDay(selectedDate)

  return (
    <button
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
      onClick={onClick}
      onKeyDown={(event) => event.key === "Enter" && onClick()}
      className={classNames(
        "border-1 border-solid border-gray-300 cursor-pointer flex flex-wrap justify-center items-center",
        isSameMonth(selectedDate, todaysDate)
          ? "bg-[rgba(255,255,255,0.4)]" // inside current month
          : "bg-gray-400" // outside current month
      )}
      aria-label={ariaLabel}
    >
      <Avatar
        className={classNames(
          "text-black border-transparent border-1 border-solid",
          isToday && focused
            ? "bg-purple-600 shadow-xl border-current m-[1px] md:mx-0.5" // focused today's avatar
            : isToday
            ? "bg-purple-400 shadow-xl border-current m-[1px] md:mx-0.5" // today's avatar
            : focused
            ? "bg-gray-400 shadow-xl border-current" // focused avatar for normal date
            : "bg-transparent" // regular avatar for normal date
        )}
        data-testid={ariaLabel}
      >
        {getDate(selectedDate)}
      </Avatar>
      {calendarDayReminders.map(({ id, dateISOString, color, text }) => (
        <div
          className={classNames("flex group", showHours ? "w-full" : "w-auto")}
          key={id}
        >
          {!showHours && <CustomAvatar color={color} />}
          <div
            className={classNames(
              showHours
                ? "text-sm w-full line-clamp-1 text-left px-1 rounded-sm"
                : "p-2 text-xl shadow-lg rounded-3xl absolute z-20 hidden group-hover:block"
            )}
            style={{ backgroundColor: color }}
          >
            <span className="font-medium">
              {formatTimePicker(parseISO(dateISOString))}
            </span>{" "}
            {text}
          </div>
        </div>
      ))}
    </button>
  )

  function CustomAvatar({ color }: { color: Color }) {
    return (
      <Avatar
        style={{ backgroundColor: color }}
        className="w-5 h-5 m-[1px] md:mx-0.5 border-1 border-solid border-gray-300"
      >
        <AccessAlarmIcon className="w-4 h-4" />
      </Avatar>
    )
  }
}

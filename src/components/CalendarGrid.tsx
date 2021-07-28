import CalendarDay from "@/src/components/CalendarDay"
import { daysArray, getMonthCells } from "@/src/utils/dateUtils"
import Typography from "@material-ui/core/Typography"

export default function CalendarGrid({ todaysDate }: { todaysDate: Date }) {
  const calendarCells = getMonthCells(todaysDate)
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <CalendarGridDaysRow />
      <CalendarGridMonth
        todaysDate={todaysDate}
        calendarCells={calendarCells}
      />
    </div>
  )

  function CalendarGridDaysRow() {
    // daysArray is Sunday, Monday, ..., Saturday
    return (
      <div className="grid w-full grid-cols-7">
        {daysArray.map((day) => (
          <Typography
            className="mx-auto text-xl font-semibold text-gray-700"
            key={day}
          >
            {day}
          </Typography>
        ))}
      </div>
    )
  }

  function CalendarGridMonth({
    calendarCells,
    todaysDate,
  }: {
    calendarCells: Date[]
    todaysDate: Date
  }) {
    return (
      <div className="grid w-full grid-cols-7 border-gray-300 border-solid border-1">
        {calendarCells.map((date) => (
          <CalendarDay
            key={String(date)}
            todaysDate={todaysDate}
            selectedDate={date}
          />
        ))}
      </div>
    )
  }
}

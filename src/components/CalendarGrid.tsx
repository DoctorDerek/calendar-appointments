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
      <div className="flex items-center justify-between w-full">
        {daysArray.map((day) => (
          <Typography className="text-3xl" key={day}>
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
    calendarCells: DateObject[]
    todaysDate: Date
  }) {
    return (
      <div
        className={
          "flex w-full flex-wrap border-1 border-solid border-gray-300"
        }
      >
        {calendarCells.map((dateObject) => (
          <CalendarDay
            key={String(dateObject.date)}
            todaysDate={todaysDate}
            selectedDate={dateObject}
          />
        ))}
      </div>
    )
  }
}

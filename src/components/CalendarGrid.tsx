import CalendarGridDaysRow from "@/src/components/CalendarGridDaysRow"
import CalendarGridMonth from "@/src/components/CalendarGridMonth"
import { getMonthCells } from "@/src/utils/dateUtils"

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
}

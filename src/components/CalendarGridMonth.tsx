import CalendarDay from "@/src/components/CalendarDay"

export default function CalendarGridMonth({
  calendarCells,
  todaysDate,
}: {
  calendarCells: DateObject[]
  todaysDate: Date
}) {
  return (
    <div
      className={"flex w-full flex-wrap border-1 border-solid border-gray-300"}
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

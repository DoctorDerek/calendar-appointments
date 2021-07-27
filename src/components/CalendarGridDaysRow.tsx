import { daysArray } from "@/src/utils/dateUtils"
import Typography from "@material-ui/core/Typography"

export default function CalendarGridDaysRow() {
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

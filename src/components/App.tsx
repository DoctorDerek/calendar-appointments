import { addMonths, getYear, subMonths } from "date-fns"
import { useState } from "react"

import AddReminder from "@/src/components/AddReminder"
import AddReminderFab from "@/src/components/AddReminderFab"
import AgendaDay from "@/src/components/AgendaDay"
import CalendarGrid from "@/src/components/CalendarGrid"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import { Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"

export default function App() {
  const [todaysDate, setTodaysDate] = useState(new Date())

  const prevMonth = () => {
    setTodaysDate((currentDate) => subMonths(currentDate, 1))
  }

  const nextMonth = () => {
    setTodaysDate((currentDate) => addMonths(currentDate, 1))
  }

  const month = todaysDate.toLocaleString("en-us", { month: "long" })
  const year = getYear(todaysDate)

  return (
    <div className="flex items-center content-center w-full">
      <Paper className="flex flex-col content-center items-center p-3 m-6 w-full h-[90%]">
        <header className="flex items-center content-between w-full h-60">
          <IconButton aria-label="Previous Month" onClick={prevMonth}>
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>
          <Typography variant="h3">
            {month} {year}
          </Typography>
          <IconButton aria-label="Next Month" onClick={nextMonth}>
            <KeyboardArrowRightIcon fontSize="large" />
          </IconButton>
        </header>
        <CalendarGrid todaysDate={todaysDate} />
        <AddReminderFab />
      </Paper>
      <AgendaDay />
      <AddReminder />
    </div>
  )
}

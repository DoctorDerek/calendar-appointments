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
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    calendar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
      margin: "25px",
      width: "100%",
      height: "90%",
    },
    calendarHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100px",
      width: "100%",
    },
  })

function App({ classes }: WithStyles<typeof styles>) {
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
    <div className={classes.root}>
      <Paper className={classes.calendar}>
        <header className={classes.calendarHeader}>
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

export default withStyles(styles)(App)

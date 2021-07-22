import CalendarGridDaysRow from "@/src/components/CalendarGridDaysRow"
import CalendarGridMonth from "@/src/components/CalendarGridMonth"
import { getMonthCells } from "@/src/utils/dateUtils"
import { Theme } from "@material-ui/core/styles"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

const styles = (theme: Theme) =>
  createStyles({
    calendarGrid: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
  })

const CalendarGrid = ({
  classes,
  todaysDate,
}: WithStyles<typeof styles> & { todaysDate: Date }) => {
  const calendarCells = getMonthCells(todaysDate)
  return (
    <div className={classes.calendarGrid}>
      <CalendarGridDaysRow />
      <CalendarGridMonth
        todaysDate={todaysDate}
        calendarCells={calendarCells}
      />
    </div>
  )
}

export default withStyles(styles)(CalendarGrid)

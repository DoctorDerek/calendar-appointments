import CalendarGridDaysRow from "@/src/components/CalendarGrid/CalendarGridDaysRow"
import CalendarGridMonth from "@/src/components/CalendarGrid/CalendarGridMonth"
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
  date,
}: WithStyles<typeof styles> & DateObject) => {
  const calendarCells = getMonthCells(date)
  return (
    <div className={classes.calendarGrid}>
      <CalendarGridDaysRow />
      <CalendarGridMonth date={date} calendarCells={calendarCells} />
    </div>
  )
}

export default withStyles(styles)(CalendarGrid)

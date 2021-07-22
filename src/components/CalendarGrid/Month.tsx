import CalendarDay from "@/src/components/CalendarDay/CalendarDay"
import { Theme } from "@material-ui/core/styles"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

const styles = (theme: Theme) =>
  createStyles({
    monthContainer: {
      display: "flex",
      width: "100%",
      flexGrow: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      border: "1px solid lightgray",
    },
  })

const Month = ({
  classes,
  calendarCells,
  date,
}: WithStyles<typeof styles> & {
  calendarCells: DateObject[]
} & DateObject) => (
  <div className={classes.monthContainer}>
    {calendarCells.map((dateObject, i) => (
      <CalendarDay key={i} calendarDate={date} dateObject={dateObject} />
    ))}
  </div>
)

export default withStyles(styles)(Month)

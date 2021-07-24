import { openAddReminder } from "@/src/redux/actions"
import { useAppDispatch } from "@/src/redux/hooks"
import { Fab } from "@material-ui/core"
import green from "@material-ui/core/colors/green"
import { Theme } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

const styles = (theme: Theme) =>
  createStyles({
    fabAdd: {
      position: "absolute",
      bottom: "60px",
      right: "50px",
      color: "#FFF",
      backgroundColor: green[600],
      "&:hover": {
        backgroundColor: green[800],
      },
    },
  })

function AddReminderFab({ classes }: WithStyles<typeof styles>) {
  const dispatch = useAppDispatch()
  const onFabAddClick = () => {
    dispatch(openAddReminder())
  }
  return (
    <Fab
      aria-label="Add Reminder"
      className={classes.fabAdd}
      onClick={onFabAddClick}
    >
      <AddIcon />
    </Fab>
  )
}

export default withStyles(styles)(AddReminderFab)

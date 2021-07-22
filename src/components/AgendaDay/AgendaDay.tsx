import { format } from "date-fns"

import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import { Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      marginTop: "10px",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    toolbarButtonHidden: {
      visibility: "hidden",
    },
    toolbarButtonVisible: {
      visibility: "visible",
    },
  })

const AgendaDay = ({
  classes,
  agendaStatus,
  onClose,
}: WithStyles<typeof styles> & {
  agendaStatus: {
    isOpen: boolean
    date: Date
  }
  onClose: () => void
}) => {
  const dateTitle = agendaStatus.date
    ? format(agendaStatus.date, "LLLL do, yyyy")
    : "Closing"

  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        <Typography>Use this space to list the reminders.</Typography>
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(styles)(AgendaDay)

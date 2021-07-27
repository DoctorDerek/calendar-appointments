import { format } from "date-fns"

import AddReminderFab from "@/src/components/AddReminderFab"
import CustomDialog from "@/src/components/CustomDialog"
import { closeAgenda } from "@/src/redux/actions"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { Typography } from "@material-ui/core"

export default function AgendaDay() {
  const { isOpen, date } = useAppSelector(({ agendaStatus }) => agendaStatus)
  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(closeAgenda())
  }

  const dateTitle = date ? format(date, "LLLL do, yyyy") : "Closing"

  return (
    <CustomDialog title={dateTitle} open={isOpen} onClose={onClose}>
      <Typography className="text-3xl">
        Use this space to list the reminders.
      </Typography>
      <AddReminderFab />
    </CustomDialog>
  )
}

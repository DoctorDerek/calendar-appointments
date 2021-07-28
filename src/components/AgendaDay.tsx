import { format } from "date-fns"

import AddReminderFab from "@/src/components/AddReminderFab"
import CustomDialog from "@/src/components/CustomDialog"
import { closeAgenda } from "@/src/redux/agendaSlice"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { Typography } from "@material-ui/core"

const formatDateAgenda = (date: Date) => format(date, "LLLL do, yyyy")

export default function AgendaDay() {
  const { agendaIsOpen, date } = useAppSelector(({ agenda }) => agenda)
  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(closeAgenda())
  }

  const dialogTitle = date ? "Agenda for " + formatDateAgenda(date) : "Closing"

  return (
    <CustomDialog title={dialogTitle} open={agendaIsOpen} onClose={onClose}>
      <Typography className="text-3xl">
        Use this space to list the reminders.
      </Typography>
      <AddReminderFab date={date} />
    </CustomDialog>
  )
}

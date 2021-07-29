import { format, isSameDay, parseISO } from "date-fns"

import AddReminderFab from "@/src/components/AddReminderFab"
import CustomDialog from "@/src/components/CustomDialog"
import { closeAgenda } from "@/src/redux/agendaSlice"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { deleteReminder } from "@/src/redux/remindersSlice"
import { IconButton, Typography } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const formatDateAgenda = (date: Date) => format(date, "LLLL do, yyyy")
const formatTimePicker = (date: Date) => format(date, "hh:mm aaa") // 08:00 am

export default function AgendaDay() {
  // Use the useAppSelector hook to get the current agenda from the Redux store
  const { agendaIsOpen, dateISOString } = useAppSelector(({ agenda }) => agenda)
  // Redux can't store Dates directly, so we need to convert the ISO string
  const date = dateISOString ? parseISO(dateISOString) : null

  // Get the entire list of reminders from the Redux store
  const { reminders } = useAppSelector(({ reminders }) => reminders)
  // Filter the reminders to only include those for the current day's agenda
  const agendaReminders = reminders.filter((reminder) => {
    return date && isSameDay(parseISO(reminder.dateISOString), date)
  })

  // Set up the dispatch actions for closing the agenda
  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(closeAgenda())
  }
  const deleteReminderOnClick = (id: string) => {
    dispatch(deleteReminder(id))
  }

  const dialogTitle = date ? "Agenda: " + formatDateAgenda(date) : "Closing"

  return (
    <CustomDialog title={dialogTitle} open={agendaIsOpen} onClose={onClose}>
      <div className="flex flex-col space-y-1">
        {agendaReminders.map(({ id, dateISOString, color, text }) => {
          const time = formatTimePicker(parseISO(dateISOString))
          const reminder = `${time} ${text}`
          return (
            <Typography
              key={id}
              style={{ backgroundColor: color }}
              className="py-0.5 px-2 rounded-3xl flex items-center justify-between text-3xl"
            >
              {reminder}
              <IconButton
                aria-label={`Delete reminder ${reminder}`}
                className="w-8 h-8 text-gray-500 transition-all duration-500 bg-gray-100 border-gray-300 border-solid fill-current border-1 hover:bg-gray-300 hover:text-gray-700 hover:border-gray-500"
                onClick={() => deleteReminderOnClick(id)}
              >
                <CloseIcon className="w-6 h-6" />
              </IconButton>
            </Typography>
          )
        })}
        {agendaReminders.length === 0 && "No reminders yet."}
      </div>
      <AddReminderFab date={date} position="absolute" />
    </CustomDialog>
  )
}

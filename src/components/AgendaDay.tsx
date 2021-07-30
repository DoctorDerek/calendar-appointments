import { format, isSameDay, parseISO } from "date-fns"

import AddReminderFab from "@/src/components/AddReminderFab"
import CustomDialog from "@/src/components/CustomDialog"
import CustomIcon from "@/src/components/CustomIcon"
import { closeAgenda } from "@/src/redux/agendaSlice"
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks"
import { deleteReminder } from "@/src/redux/remindersSlice"
import { Typography } from "@material-ui/core"
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
          return (
            <Typography key={id}>
              <div
                // light mode version
                className="dark:hidden py-0.5 pl-3 pr-2 rounded-3xl flex items-center justify-between text-3xl"
                style={{ backgroundColor: color }}
              >
                <ReminderInterior />
              </div>
              <div
                // dark mode version
                className="hidden py-0.5 pl-2 pr-1 rounded-3xl dark:flex items-center justify-between text-3xl border-1 border-solid"
                style={{ borderColor: color }}
              >
                <ReminderInterior />
              </div>
            </Typography>
          )

          function ReminderInterior() {
            return (
              <>
                <div className="flex items-center justify-center">
                  <div
                    className="hidden w-4 h-4 mr-2 rounded-full dark:block"
                    style={{ backgroundColor: color }}
                  />
                  <span className="mr-2 font-medium">{time}</span>
                  <span>{text}</span>
                </div>
                <CustomIcon
                  ariaLabel={`Delete reminder ${time} ${text}`}
                  onClick={() => deleteReminderOnClick(id)}
                  color="gray"
                  size="small"
                  Icon={CloseIcon}
                />
              </>
            )
          }
        })}
        {agendaReminders.length === 0 && "No reminders yet."}
      </div>
      <AddReminderFab date={date} position="absolute" />
    </CustomDialog>
  )
}

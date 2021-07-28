import { format } from "date-fns"

import { openAddReminder } from "@/src/redux/addReminderSlice"
import { useAppDispatch } from "@/src/redux/hooks"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

const formatDateAgenda = (date: Date) => format(date, "LLLL do, yyyy")

/**
 * The FAB is the floating button that allows the user to add a new reminder.
 * It optionally takes a "date" prop when called from <AgendaDay> in order to
 * provide a better aria-label with the selected date from the open agenda.
 */
export default function AddReminderFab({ date }: { date?: Date | null }) {
  const dispatch = useAppDispatch()
  const onFabAddClick = () => {
    dispatch(openAddReminder())
  }

  const ariaLabel =
    "Add Reminder" + (date ? ` for ${formatDateAgenda(date as Date)}` : "")
  // include the date in aria-label if date is provided e.g. "July 22, 2021"

  return (
    <Fab
      aria-label={ariaLabel}
      className="absolute w-16 h-16 text-white bg-green-600 fill-current bottom-4 right-4 hover:bg-green-800"
      onClick={onFabAddClick}
    >
      <AddIcon className="w-12 h-12" />
    </Fab>
  )
}

import { openAddReminder } from "@/src/redux/actions"
import { useAppDispatch } from "@/src/redux/hooks"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

export default function AddReminderFab() {
  const dispatch = useAppDispatch()
  const onFabAddClick = () => {
    dispatch(openAddReminder())
  }
  return (
    <Fab
      aria-label="Add Reminder"
      className="absolute w-16 h-16 text-white bg-green-600 fill-current bottom-4 right-4 hover:bg-green-800"
      onClick={onFabAddClick}
    >
      <AddIcon className="w-12 h-12" />
    </Fab>
  )
}

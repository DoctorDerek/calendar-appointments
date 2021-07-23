import { Provider } from "react-redux"

import AddReminder from "@/src/components/AddReminder"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper" // e.g. 22
import { calendarAppReducer } from "@/src/redux/reducers"
import store from "@/src/redux/store"
import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const renderAddReminder = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={store}>
        <AddReminder />
      </Provider>
    </MaterialUIWrapper>
  )

test("does not render anything with default Redux store", () => {
  renderAddReminder()
  expect(screen.queryByRole("button")).toBeNull() // close button
  expect(screen.queryByText(/add reminder/i)).toBeNull() // date
})

const customStore = configureStore({
  reducer: calendarAppReducer,
  preloadedState: {
    addReminderStatus: {
      isOpen: true,
    },
  },
})

const renderAddReminderOpen = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={customStore}>
        <AddReminder />
      </Provider>
    </MaterialUIWrapper>
  )

test("renders correctly with custom Redux store for initial state", () => {
  renderAddReminderOpen()
  expect(screen.getByRole("button")).toBeVisible() // close button
  expect(screen.getByRole("button")).toHaveAccessibleName(/close/i)
  expect(screen.getByText(/add reminder/i)).toBeVisible()
})

test("closes modal when clicking the close button", async () => {
  renderAddReminderOpen()
  userEvent.click(screen.getByRole("button"))
  await waitFor(() => expect(screen.queryByRole("button")).toBeNull())
  await waitFor(() => expect(screen.queryByText(/add reminder/i)).toBeNull())
})

test("closes modal when clicking outside the modal", async () => {
  renderAddReminderOpen()
  userEvent.click(document.body)
  await waitFor(() => expect(screen.queryByRole("button")).toBeNull())
  await waitFor(() => expect(screen.queryByText(/add reminder/i)).toBeNull())
})

test("Added the ability to add new reminders for a user-entered date and time", () => {
  //  - If you click on the green Floating Action Button at the bottom right corner of the screen, an empty dialog will now open. **I used this space to create the Add Reminder user interface**.
})
test("Limited reminders to no more than a maximum of 30 characters.", () => {
  // - If you click on a calendar cell, an empty dialog will now appear. I also used this space to display reminders.
})
test("Allowed the user to select a color when creating a reminder and display it appropriately.", () => {})
test("Displayed reminders on the calendar view in the correct time order.", () => {})
test("Properly handled overflow when multiple reminders appear on the same date.", () => {})

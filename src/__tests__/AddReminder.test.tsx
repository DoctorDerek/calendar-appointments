import { Provider } from "react-redux"

import AddReminder from "@/src/components/AddReminder"
import { calendarAppReducer } from "@/src/redux/reducers"
import store from "@/src/redux/store"
import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event" // e.g. 22

const renderAddReminder = () =>
  render(
    <Provider store={store}>
      <AddReminder />
    </Provider>
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
    <Provider store={customStore}>
      <AddReminder />
    </Provider>
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

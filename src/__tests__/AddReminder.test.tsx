import { format } from "date-fns"
import { Provider } from "react-redux"

import AddReminder from "@/src/components/AddReminder"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper" // e.g. 22
import { calendarAppReducer } from "@/src/redux/reducers"
import store from "@/src/redux/store"
import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const formatDatePicker = (value: Date) => format(value, "MM/dd/yyyy")
const formatTimePicker = (value: Date) => format(value, "hh:mm aaa")
// const formatDateAsMonthPicker = (date: Date) => format(date, "LLLL yyyy")
const todaysDate = new Date()
const todaysDatePicker = formatDatePicker(todaysDate) // current date
const todaysTimePicker = formatTimePicker(todaysDate) // current time
const todaysDateAgenda = format(new Date(), "LLLL do, yyyy")

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
  expect(screen.queryByLabelText(/close/i)).toBeNull() // close button
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

test("renders correctly with custom Redux store for open initial state", () => {
  renderAddReminderOpen()
  expect(screen.getByLabelText(/close/i)).toBeVisible() // close button
  expect(screen.getByText(/add reminder/i)).toBeVisible()
})

test("renders a date-time picker", () => {
  renderAddReminderOpen()
  expect(
    screen.getByLabelText(/[choose|select|pick].+date.+time/i)
  ).toBeVisible()
  expect(screen.getByLabelText(/[current|selected].+date.+time/i)).toBeVisible()
  // aria-label="Choose date and time, selected date and time is ..."
})

test("date-time picker starts with value of current time", () => {
  renderAddReminderOpen()
  expect(screen.getByLabelText(new RegExp(todaysTimePicker, "i"))).toBeVisible()
})

test("date-time picker starts with value of current date", () => {
  renderAddReminderOpen()

  expect(screen.getByLabelText(new RegExp(todaysDatePicker, "i"))).toBeVisible()
})

// async tests (userEvent interactions) go at the end to prevent test collisions
test("closes modal when clicking the close button", async () => {
  renderAddReminderOpen()
  userEvent.click(screen.getByLabelText(/close/i))
  await waitFor(() => expect(screen.queryByLabelText(/close/i)).toBeNull())
  await waitFor(() => expect(screen.queryByText(/add reminder/i)).toBeNull())
})

test("closes modal when clicking outside the modal", async () => {
  renderAddReminderOpen()
  userEvent.click(document.body)
  await waitFor(() => expect(screen.queryByLabelText(/close/i)).toBeNull())
  await waitFor(() => expect(screen.queryByText(/add reminder/i)).toBeNull())
})

const customStoreAddReminderOpenAgendaOpen = configureStore({
  reducer: calendarAppReducer,
  preloadedState: {
    addReminderStatus: {
      isOpen: true,
    },
    agendaStatus: {
      isOpen: true,
      date: new Date(),
    },
  },
})

const renderAddReminderOpenAgendaOpen = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={customStoreAddReminderOpenAgendaOpen}>
        <AddReminder />
      </Provider>
    </MaterialUIWrapper>
  )

test("renders w/ custom Redux store with add reminder open over agenda", () => {
  renderAddReminderOpenAgendaOpen()
  // should show AddReminder over top of AgendaDay
  expect(screen.getByLabelText(/close/i)).toBeVisible() // close button
  expect(screen.getByText(/add reminder/i)).toBeVisible()
})

test("date-time picker starts with value of selected date", () => {
  renderAddReminderOpenAgendaOpen()
  const selectedDate =
    customStoreAddReminderOpenAgendaOpen.getState().agendaStatus.date

  expect(
    screen.getByDisplayValue(new RegExp(formatDatePicker(selectedDate), "i"))
  ).toBeVisible()
})

// test spec / integration tests
test("Added the ability to add new reminders for a user-entered date and time", () => {
  //  - If you click on the green Floating Action Button at the bottom right corner of the screen, an empty dialog will now open. **I used this space to create the Add Reminder user interface**.
})
test("Limited reminders to no more than a maximum of 30 characters.", () => {
  // - If you click on a calendar cell, an empty dialog will now appear. I also used this space to display reminders.
})
test("Allowed the user to select a color when creating a reminder and display it appropriately.", () => {})
test("Displayed reminders on the calendar view in the correct time order.", () => {})
test("Properly handled overflow when multiple reminders appear on the same date.", () => {})

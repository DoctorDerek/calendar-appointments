import { addDays, format } from "date-fns"
import { Provider } from "react-redux"

import AddReminder from "@/src/components/AddReminder"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper" // e.g. 22
import store, { rootReducer } from "@/src/redux/store"
import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const formatDateAgenda = (date: Date) => format(date, "LLLL do, yyyy")
const formatTimePicker = (value: Date) => format(value, "hh:mm aaa")
const todaysDate = new Date()
const todaysDateAgenda = formatDateAgenda(todaysDate) // current date
const tomorrowsDate = addDays(todaysDate, 1)
const tomorrowsDateAgenda = formatDateAgenda(tomorrowsDate)
const getCurrentTimePicker = () => formatTimePicker(new Date()) // current time

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
  expect(screen.queryByRole("button", { name: /close/i })).toBeNull() // close button
  expect(screen.queryByText(/add reminder/i)).toBeNull() // heading
})

const customStore = configureStore({
  reducer: rootReducer,
  preloadedState: {
    addReminder: {
      addReminderIsOpen: true,
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
  expect(screen.getByRole("button", { name: /close/i })).toBeVisible() // close button
  expect(screen.getByText(/add reminder/i)).toBeVisible()
})

test("renders a date-time picker", () => {
  renderAddReminderOpen()
  expect(
    screen.getByLabelText(/(choose|select|pick).+date.+time/i)
  ).toBeVisible()
  expect(screen.getByLabelText(/(current|selected).+date.+time/i)).toBeVisible()
  // aria-label="Choose date and time, selected date and time is ..."
})

test("renders a color picker", () => {
  renderAddReminderOpen()
  expect(screen.getByLabelText(/(choose|select|pick).+color/i)).toBeVisible()
  expect(screen.getByLabelText(/(current|selected).+color/i)).toBeVisible()
  // aria-label="Choose date and time, selected date and time is ..."
})

test("date-time picker starts with value of current time", () => {
  renderAddReminderOpen()
  expect(
    screen.getByLabelText(new RegExp(getCurrentTimePicker(), "i"))
  ).toBeVisible()
  // Note: this test is fragile if the time changes between the two renders
})

test("date-time picker starts with value of current date", () => {
  renderAddReminderOpen()

  expect(screen.getByLabelText(new RegExp(todaysDateAgenda, "i"))).toBeVisible()
})

// async tests (userEvent interactions) go at the end to prevent test collisions
test("closes modal when clicking the close button", async () => {
  renderAddReminderOpen()
  userEvent.click(screen.getByRole("button", { name: /close/i }))
  await waitFor(() =>
    expect(screen.queryByRole("button", { name: /close/i })).toBeNull()
  )
  await waitFor(() => expect(screen.queryByText(/add reminder/i)).toBeNull())
})

test("closes modal when clicking outside the modal", async () => {
  renderAddReminderOpen()
  userEvent.click(document.body)
  await waitFor(() =>
    expect(screen.queryByRole("button", { name: /close/i })).toBeNull()
  )
  await waitFor(() => expect(screen.queryByText(/add reminder/i)).toBeNull())
})

const customStoreAddReminderOpenAgendaOpen = configureStore({
  reducer: rootReducer,
  preloadedState: {
    addReminder: {
      addReminderIsOpen: true,
    },
    agenda: {
      agendaIsOpen: true,
      dateISOString: tomorrowsDate.toISOString(), // selected date is tomorrow
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
  // should show <AddReminder> over top of <AgendaDay>
  expect(screen.getByRole("button", { name: /close/i })).toBeVisible() // close button
  expect(screen.getByText(/add reminder/i)).toBeVisible()
})

test("date-time picker uses selected date (tomorrow) with custom store", () => {
  renderAddReminderOpenAgendaOpen()
  expect(
    customStoreAddReminderOpenAgendaOpen.getState().agenda.dateISOString
  ).toBe(tomorrowsDate.toISOString())
  expect(
    screen.getByLabelText(new RegExp(tomorrowsDateAgenda, "i"))
  ).toBeVisible()
  // Note: This is a fragile test, as it tests the implementation details of
  // the state of the store directly, not the functionality of the component.
})

test("date-time picker uses current time with custom Redux store", () => {
  renderAddReminderOpenAgendaOpen()
  expect(
    screen.getByLabelText(new RegExp(getCurrentTimePicker(), "i"))
  ).toBeVisible()
  // Note: this test is fragile if the time changes between the two renders
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

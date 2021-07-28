import { addDays, addMonths, format, subMonths } from "date-fns"
import { Provider } from "react-redux"

import App from "@/src/components/App"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper"
import store from "@/src/redux/store"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const todaysDate = new Date()
const formatDateAsMonthApp = (date: Date) => format(date, "LLLL yyyy")
const todaysMonthApp = formatDateAsMonthApp(todaysDate)
const previousMonthApp = formatDateAsMonthApp(subMonths(todaysDate, 1))
const nextMonthApp = formatDateAsMonthApp(addMonths(todaysDate, 1))
const formatDateAgenda = (date: Date) => format(date, "LLLL do, yyyy")
const todaysDateAgenda = formatDateAgenda(todaysDate)
const tomorrowsDate = addDays(todaysDate, 1)
const tomorrowsDateAgenda = formatDateAgenda(tomorrowsDate)
const formatTimePicker = (value: Date) => format(value, "hh:mm aaa")
const getCurrentTimePicker = () => formatTimePicker(new Date()) // current time

const renderApp = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </MaterialUIWrapper>
  )

test("renders the App with the default Redux store", () => {
  renderApp()
  expect(screen.getByText(todaysMonthApp)).toBeVisible() // month
  expect(screen.getByRole("button", { name: /add/i })).toBeVisible()
  // "Add Reminder"
})

test("opens the Add Reminder modal when clicking the button", async () => {
  renderApp()
  userEvent.click(screen.getByRole("button", { name: /add/i }))
  await waitFor(() => expect(screen.getByText(/add reminder/i)).toBeVisible())
})

test("shows the next month when clicking the button", async () => {
  renderApp()
  userEvent.click(screen.getByRole("button", { name: /next/i }))
  await waitFor(() => expect(screen.getByText(nextMonthApp)).toBeVisible())
})

test("shows the previous month when clicking the button", async () => {
  renderApp()
  userEvent.click(screen.getByRole("button", { name: /(previous|last)/i }))
  await waitFor(() => expect(screen.getByText(previousMonthApp)).toBeVisible())
})

test("opens today's agenda when clicking on today's date", async () => {
  renderApp()
  userEvent.click(screen.getByLabelText(new RegExp(todaysDateAgenda, "i")))
  await waitFor(() => {
    // <AgendaDay> should be open with today's date
    expect(screen.getByRole("button", { name: /close/i })).toBeVisible() // close button
    expect(screen.getByRole("button", { name: /add/i })).toBeVisible() // add reminder FAB
    expect(screen.getByText(todaysDateAgenda)).toBeVisible() // date
  })
})

test("opens tomorrow's agenda when clicking on tomorrow's date", async () => {
  renderApp()
  userEvent.click(screen.getByLabelText(new RegExp(tomorrowsDateAgenda, "i")))
  await waitFor(() => {
    // <AgendaDay> should be open with tomorrow's date
    expect(screen.getByRole("button", { name: /close/i })).toBeVisible() // close button
    expect(screen.getByRole("button", { name: /add/i })).toBeVisible() // add reminder FAB
    expect(screen.getByText(tomorrowsDateAgenda)).toBeVisible()
  })
})

test("use current date and time when opening add reminder over today's agenda", async () => {
  renderApp()
  userEvent.click(screen.getByLabelText(new RegExp(todaysDateAgenda, "i"))) // open today's agenda
  await waitFor(async () => {
    expect(screen.getByText(todaysDateAgenda)).toBeVisible()
    // open <AddReminder> over top of today's agenda
  }).then(async () => {
    userEvent.click(screen.getByRole("button", { name: /add/i }))
    await waitFor(() => {
      // <AddReminder> should have a date-picker with the current date and time
      expect(screen.getByRole("button", { name: /close/i })).toBeVisible() // close button
      expect(
        screen.getByLabelText(new RegExp(todaysDateAgenda, "i"))
      ).toBeVisible()
      expect(
        screen.getByLabelText(new RegExp(getCurrentTimePicker(), "i"))
      ).toBeVisible()
      // Note: this test is fragile if the time changes between the two renders
    })
  })
})

test("use current time and tomorrow's date when opening add reminder over tomorrow's agenda", async () => {
  renderApp()
  userEvent.click(screen.getByLabelText(new RegExp(tomorrowsDateAgenda, "i"))) // open tomorrow's agenda
  await waitFor(() => {
    expect(screen.getByText(tomorrowsDateAgenda)).toBeVisible()
    // open <AddReminder> over top of tomorrow's agenda
    userEvent.click(screen.getByRole("button", { name: /add/i }))
  })
  await waitFor(() => {
    // <AddReminder> should have date-picker w/ current time and tomorrow's date
    expect(screen.getByRole("button", { name: /close/i })).toBeVisible() // close button
    expect(
      screen.getByLabelText(new RegExp(tomorrowsDateAgenda, "i"))
    ).toBeVisible()
    expect(
      screen.getByLabelText(new RegExp(getCurrentTimePicker(), "i"))
    ).toBeVisible()
    // Note: this test is fragile if the time changes between the two renders
  })
})

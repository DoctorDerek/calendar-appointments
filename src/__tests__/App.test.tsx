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
const formatTimePicker = (date: Date) => format(value, "hh:mm aaa")
const getCurrentTimePicker = () => formatTimePicker(new Date()) // current time
const formatDateCalendarDay = (date: Date) => format(date, "EEEE LLLL do, yyyy") // e.g. Thursday July 22, 2021
const todaysDateCalendarDay = formatDateCalendarDay(todaysDate)
const tomorrowsDateCalendarDay = formatDateCalendarDay(tomorrowsDate)

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
  expect(screen.getByText(new RegExp(todaysMonthApp, "i"))).toBeVisible() // month
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
  userEvent.click(screen.getByLabelText(/next.+month/i))
  await waitFor(() =>
    expect(screen.getByText(new RegExp(nextMonthApp, "i"))).toBeVisible()
  )
})

test("shows the previous month when clicking the button", async () => {
  renderApp()
  userEvent.click(screen.getByLabelText(/(prev|last).+month/i))
  await waitFor(() =>
    expect(screen.getByText(new RegExp(previousMonthApp, "i"))).toBeVisible()
  )
})

test("opens today's agenda when clicking on today's date", async () => {
  renderApp()
  userEvent.click(screen.getByLabelText(new RegExp(todaysDateCalendarDay, "i")))
  await waitFor(() => {
    // <AgendaDay> should be open with today's date
    expect(screen.getByRole("button", { name: /close/i })).toBeVisible() // close button
  })
  expect(screen.getByRole("button", { name: /add/i })).toBeVisible() // add reminder FAB
  expect(screen.getByText(new RegExp(todaysDateAgenda, "i"))).toBeVisible() // date
})

test("opens tomorrow's agenda when clicking on tomorrow's date", async () => {
  renderApp()
  userEvent.click(
    screen.getByLabelText(new RegExp(tomorrowsDateCalendarDay, "i"))
  )
  await waitFor(() => {
    // <AgendaDay> should be open with tomorrow's date
    expect(screen.getByRole("button", { name: /close/i })).toBeVisible() // close button
  })
  expect(screen.getByRole("button", { name: /add/i })).toBeVisible() // add reminder FAB
  expect(screen.getByText(new RegExp(tomorrowsDateAgenda, "i"))).toBeVisible()
})

test("use current date and time when opening add reminder over today's agenda", async () => {
  renderApp()
  userEvent.click(screen.getByLabelText(new RegExp(todaysDateCalendarDay, "i"))) // open today's agenda
  expect(
    await screen.findByText(new RegExp(todaysDateAgenda, "i"))
  ).toBeVisible()
  // open <AddReminder> over top of today's agenda
  userEvent.click(screen.getByLabelText(/add.+\d/i))
  // aria-label for the FAB inside <AgendaDay> "Add Reminder for July 22, 2021"
  // <AddReminder> should have a date-picker with the current date and time
  expect(await screen.findByLabelText(/close.+add/i)).toBeVisible() // close

  expect(
    screen.getByLabelText(
      new RegExp(`(current|selected).+${todaysDateAgenda}`, "i")
    )
  ).toBeVisible()
  // aria-label="Choose date and time, selected date and time is ..."
  expect(
    screen.getByLabelText(new RegExp(getCurrentTimePicker(), "i"))
  ).toBeVisible()
  // Note: this test is fragile if the time changes between the two renders
})

test("use current time and tomorrow's date when opening add reminder over tomorrow's agenda", async () => {
  renderApp()
  userEvent.click(
    screen.getByLabelText(new RegExp(tomorrowsDateCalendarDay, "i"))
  ) // open tomorrow's agenda

  expect(
    await screen.findByText(new RegExp(tomorrowsDateAgenda, "i"))
  ).toBeVisible()
  // open <AddReminder> over top of tomorrow's agenda

  userEvent.click(screen.getByLabelText(/add.+\d/i))
  // aria-label for the FAB inside <AgendaDay> "Add Reminder for July 22, 2021"
  // <AddReminder> should have date-picker w/ current time and tomorrow's date
  expect(await screen.findByLabelText(/close.+add/i)).toBeVisible() // close
  expect(
    screen.getByLabelText(
      new RegExp(`(current|selected).+${tomorrowsDateAgenda}`, "i")
    )
  ).toBeVisible()
  // aria-label="Choose date and time, selected date and time is ..."
  expect(
    screen.getByLabelText(new RegExp(getCurrentTimePicker(), "i"))
  ).toBeVisible()
  // Note: this test is fragile if the time changes between the two renders
})

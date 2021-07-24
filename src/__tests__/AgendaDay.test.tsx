import { format } from "date-fns"
import { Provider } from "react-redux"

import AgendaDay from "@/src/components/AgendaDay"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper"
import { calendarAppReducer } from "@/src/redux/reducers"
import store from "@/src/redux/store"
import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const todaysDateAsString = format(new Date(), "LLLL do, yyyy")

const renderAgendaDayDefault = () =>
  render(
    <MaterialUIWrapper>
      <Provider store={store}>
        <AgendaDay />
      </Provider>
    </MaterialUIWrapper>
  )

test("does not render anything with default Redux store", () => {
  renderAgendaDayDefault()
  expect(screen.queryByLabelText(/close/i)).toBeNull() // close button
  expect(screen.queryByLabelText(/add/i)).toBeNull() // add reminder FAB
  expect(screen.queryByText(todaysDateAsString)).toBeNull() // date
})

const customStore = configureStore({
  reducer: calendarAppReducer,
  preloadedState: {
    agendaStatus: {
      isOpen: true,
      date: new Date(),
    },
  },
})

const renderAgendaDayOpen = () =>
  render(
    <Provider store={customStore}>
      <AgendaDay />
    </Provider>
  )

test("renders correctly with custom Redux store for initial state", () => {
  renderAgendaDayOpen()
  expect(screen.getByLabelText(/close/i)).toBeVisible() // close button
  expect(screen.getByLabelText(/add/i)).toBeVisible() // add reminder FAB
  expect(screen.getByText(todaysDateAsString)).toBeVisible() // date
})

test("closes modal when clicking the close button", async () => {
  renderAgendaDayOpen()
  userEvent.click(screen.getByLabelText(/close/i))
  await waitFor(() => {
    expect(screen.queryByLabelText(/close/i)).toBeNull() // close button
    expect(screen.queryByLabelText(/add/i)).toBeNull() // add reminder FAB
    expect(screen.queryByText(todaysDateAsString)).toBeNull()
  })
})

test("closes modal when clicking outside the modal", async () => {
  renderAgendaDayOpen()
  userEvent.click(document.body)
  await waitFor(() => {
    expect(screen.queryByLabelText(/close/i)).toBeNull() // close button
    expect(screen.queryByLabelText(/add/i)).toBeNull() // add reminder FAB
    expect(screen.queryByText(todaysDateAsString)).toBeNull()
  })
})

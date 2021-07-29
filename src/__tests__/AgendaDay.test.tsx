import { format } from "date-fns"
import { Provider } from "react-redux"

import AgendaDay from "@/src/components/AgendaDay"
import { MaterialUIWrapper } from "@/src/components/NextIndexWrapper"
import store, { rootReducer } from "@/src/redux/store"
import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const todaysDate = new Date()
const formatDateAgenda = (date: Date) => format(date, "LLLL do, yyyy")
const todaysDateAgenda = formatDateAgenda(todaysDate)

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
  expect(screen.queryByRole("button", { name: /close/i })).toBeNull() // close button
  expect(screen.queryByRole("button", { name: /add/i })).toBeNull() // add reminder FAB
  expect(screen.queryByText(new RegExp(todaysDateAgenda, "i"))).toBeNull() // date
})

const customStore = configureStore({
  reducer: rootReducer,
  preloadedState: {
    agenda: {
      agendaIsOpen: true,
      dateISOString: new Date().toISOString(),
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
  expect(screen.getByRole("button", { name: /close/i })).toBeVisible() // close button
  expect(screen.getByRole("button", { name: /add/i })).toBeVisible() // add reminder FAB
  expect(screen.getByText(new RegExp(todaysDateAgenda, "i"))).toBeVisible() // date
})

test("closes modal when clicking the close button", async () => {
  renderAgendaDayOpen()
  userEvent.click(screen.getByRole("button", { name: /close/i }))
  await waitFor(() => {
    expect(screen.queryByRole("button", { name: /close/i })).toBeNull() // close button
    expect(screen.queryByRole("button", { name: /add/i })).toBeNull() // add reminder FAB
    expect(screen.queryByText(new RegExp(todaysDateAgenda, "i"))).toBeNull()
  })
})

test("closes modal when clicking outside the modal", async () => {
  renderAgendaDayOpen()
  userEvent.click(document.body)
  await waitFor(() => {
    expect(screen.queryByRole("button", { name: /close/i })).toBeNull() // close button
    expect(screen.queryByRole("button", { name: /add/i })).toBeNull() // add reminder FAB
    expect(screen.queryByText(new RegExp(todaysDateAgenda, "i"))).toBeNull() // heading
  })
})

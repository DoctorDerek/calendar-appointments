[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=calendar-appointments)](https://calendar-appointments.vercel.app/?app=calendar-appointments) [![codecov](https://codecov.io/gh/DoctorDerek/calendar-appointments/branch/master/graph/badge.svg?token=7VDUW7TGZN)](https://codecov.io/gh/DoctorDerek/calendar-appointments) [![Build Status](https://travis-ci.com/DoctorDerek/calendar-appointments.svg?branch=master)](https://travis-ci.com/DoctorDerek/calendar-appointments)

# 📆 Calendar App - React-Redux w/ TypeScript + Material UI v5 + Tailwind CSS + Next.js 11 + React 17

# ✅ Code Extended to Add and Display Reminders by Dr. Derek Austin

# 👀 View Production Build at https://calendar-appointments.vercel.app

I extended [this React-Redux calendar app](https://github.com/AmTote/calendar-appointments) to include the ability to add and display reminders or appointments.

Additionally, I added 10 other major features, including best practices and extensive test coverage.

Below you will find a complete feature set, description of technologies, and technical journal.

## Required Features

1. ✅ Added the ability to add new reminders for a user-entered date and time
2. ✅ Limited reminders to no more than a maximum of 30 characters.
3. ✅ Allowed the user to select a color when creating a reminder and display it appropriately.
4. ✅ Displayed reminders on the calendar view in the correct time order.
5. ✅ Properly handled overflow when multiple reminders appear on the same date.

## Additional Features

1. ✅ Deployed production build of Next.js `11.0.2@latest` with CI/CD
2. ✅ Upgraded React `v16.8` to `v17.0.2` and added Redux Toolkit (RTK)
3. ✅ Migrated Material UI `v3` to `v5`, including upgraded `<DateTimePicker>`
4. ✅ Installed Tailwind CSS `v2.2.4` with [Just-in-Time](https://tailwindcss.com/docs/just-in-time-mode) JIT mode with PostCSS `autoprefixer`
5. ✅ Established engineering best practices:
   - Prettier, ESLint, Husky (Git Hooks), `tsconfig.json`, TypeScript Import Sorter, `.gitattributes`
6. ✅ Crafted unit tests for new code features (TDD / Test Driven Development)
   - Jest + React Testing Library with React Test Renderer
7. ✅ Wrote unit testing for existing code (0% ➡ 100% test coverage)
8. ✅ Refactored stateful `App.tsx` React.Component to function component
9. ✅ Refactored existing code to use Tailwind CSS and Redux Toolkit "slices"
10. ✅ Developed mobile-first, responsive UX design with Tailwind CSS

## Technologies Used

- React `v17.0.2` (upgraded from a React `v16.8` project bootstrapped with [Create React App](https://github.com/facebook/create-react-app)).

- React Hooks for React state and lifecycle features.

- Redux for state management plus Redux Toolkit (RTK) for type safety.

- Other:
  - Material UI `v5` (upgraded from Material UI `v3`) as a React component library wotj Tailwind CSS for maintainability.
  - date-fns `v2.22.1` (upgraded from `v2.0.0.alpha-27`) for date and time utility functions.

## Test Coverage Report - Jest & React Testing Library

### `npm run test`

Launches the test runner and generates code coverage report.

### `npm test:watch`

Launches the test runner in the interactive watch mode.

## Technical Journal

- `0.1.0` Existing codebase: Create React App v16.8 + Material UI v3
- `0.1.1` First commit by Dr. Derek Austin: `chore: delete yarn.lock`
- `0.2.0` Upgraded all dependencies and established best practices
- `0.2.1` Developed first working development build in Next.js
- `0.2.2` Deployed production build to Vercel using CI/CD and Husky
- `0.3.0` Corrected CSS to match design and redirected `/` to `/calendar`
- `0.3.1` Replaced `index.css` & `App.css` w/ Tailwind CSS in `_document.tsx`
- `0.3.2` Destructured separate `props` objects for improved readability
- `0.4.0` Refactored React-Redux `connect` API to the new hooks API
- `0.4.1` Flattened `@/components/**/*` to `@/components/*` for organization
- `0.4.2` Replaced bug-prone indices in React key props with unique IDs
- `0.4.3` Enabled Jest support for TypeScript `.tsx` files with `babel-jest`
- `0.5.0` Wrote unit and integration test coverage for the existing code
- `0.6.0` Added tests for Next pages, bringing initial test coverage to 100%
- `0.7.0` Improved UX by placing second Add Reminder FAB within `<AddAgenda>`
- `0.8.0` Refactored to use Tailwind CSS and Redux Toolkit (RTK) `createSlice`
- `0.9.0` Implemented feature to add reminders to the calendar using RTK
- `0.9.1` Designed animated motion toggle to switch between icons and hours
- `0.9.2` Created dark mode for app using Tailwind CSS plus SVG animation toggle

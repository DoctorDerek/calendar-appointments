# Extend this Calendar Application to Add and Display Reminders

This application is a monthly calendar created using React and Redux.

Use React and Redux to add the ability to add and display reminders (or appointments) to this calendar.

This project includes TypeScript, including .ts and .tsx files with TypeScript interfaces. If you are comfortable using TypeScript, please do so.

If you are unfamiliar with TypeScript, don't worry! It's just JavaScript with additional features. If you know JavaScript, then you already know TypeScript. [Learn TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

However, we have set up the project to allow you to use plain JavaScript if you prefer.

## When you're done

Once you've completed the assignment, please email your hiring contact with a link to the repository containing your completed project.

## Instructions

1. Add the ability to add new reminders for a user-entered date and time
   - If you click on the green Floating Action Button at the bottom right corner of the screen, an empty dialog will open. **Use this space to create the Add Reminder user interface**.
2. Reminders must be a maximum of 30 characters.
3. Allow the user to select a color when creating a reminder and display it appropriately.
4. Display reminders on the calendar view in the correct time order.
   - If you click on a calendar cell, an empty dialog will appear. You may also use this space to display reminders.
5. Properly handle overflow when multiple reminders appear on the same date.

## To Begin

1. Fork repository to your personal account and clone repository to your local machine
2. `npm install` or `yarn install` - Install project dependencies
3. `npm start` or `yarn start` - Run the app in development mode
   - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
   - The page will reload if you make edits. You will also see any lint errors in the console.

## Technologies Used

- React v16.8 and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- React Hooks for React state and lifecycle features. For an overview of React Hooks, visit [React's Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html).

- Redux for state management. To learn more about Redux, a good place to start is the [official Redux documentation](https://redux.js.org/introduction/getting-started#learn-redux).

- Other:
  - Material UI v3 for styled React components - see [documentation](https://v3.material-ui.com/)
  - date-fns v2.0.0.alpha-27 for date and time utility functions - see [documentation](https://date-fns.org/v2.0.0-alpha.27/docs/Getting-Started)

## Create React App Boilerplate - Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

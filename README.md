
# User Registration Form

This is a ReactJS web application that allows users to register by filling out a form with their personal information. The form is built using react-hook-form and validated using the Yup library, and the data is sent to a backend server built with Node.js, Express.js, and MongoDB, which saves the user details in a local database.

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository to your local machine.
2. Open a terminal window and navigate to the project directory.
3. Install the dependencies by running the command `npm install`.
4. Start the backend server by running the command `npm start`.
5. In another terminal window, start the React development server by running the command `npm start`.
6. Open your browser and go to `http://localhost:3000` to access the application.
7. connect your server with the database by using PORT and Mongoose url given in the .env file

## Technologies Used

This project uses the following technologies:

- ReactJS: a JavaScript library for building user interfaces.
- React Hook Form: a library for managing form state in React using hooks.
- Yup: a JavaScript schema builder for value parsing and validation.
- Tailwind: a utility-first CSS framework for rapidly building custom designs.
- React Router DOM: a library for routing and navigation in React applications.
- DataTables.net: a jQuery plugin for rendering data into tables with advanced features.
- Node.js: a JavaScript runtime for building server-side applications.
- Express.js: a minimal and flexible web application framework for Node.js.
- MongoDB: a NoSQL document-oriented database for storing and managing data.

## User Registration Form

The user registration form has the following fields:

- Name: a text input for the user's name (required).
- Age: a number input for the user's age (required).
- Sex: a radio button group for the user's sex (required).
- Mobile: a text input for the user's mobile number (required, must be a valid Indian mobile number).
- Emergency Contact Number: a text input for the user's emergency contact number (required, must be a valid Indian mobile number).
- Email: a text input for the user's email address (optional, must be a valid email address).
- Address: a text area for the user's address (optional).
- Govt ID Type: a select input for the type of government-issued ID (optional).
- Govt ID: a text input for the user's government-issued ID number (optional, must be a valid 12-digit numeric string if ID type is Aadhar or a valid 10-digit alphanumeric string if ID type is PAN).
- Guardian Details: a text input for the user's guardian details (optional).
- Nationality: a text input for the user's nationality (optional).

## User Details Page

After the user submits the registration form, they are redirected to a page that displays a table with the list of registered users. The table has the following columns:

- Name
- Age/Sex
- Mobile
- Address
- Govt ID
- Guardian Details
- Nationality

The table is rendered using the DataTables.net library, which provides advanced features such as sorting, searching, and pagination.

## Contributing

If you find any issues or bugs, please feel free to submit a pull request or create an issue in the repository. Any contributions are welcome!



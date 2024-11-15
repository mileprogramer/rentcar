## Project Commands
To start the project, run the following commands:
1. `npm install`
2. `npm start`

### Deployment
To deploy the project, go to the `src/config/globals.js` folder and follow these steps:
1. Change the `hostname`.
2. Change the `frontendUrl`.

## Business Scenario
We are developing a car rental app for a car rental agency that wants the ability to add, edit, rent, and return cars. The agency also wants to maintain a history of rented cars and generate statistics.

**Renting a Car:**  
For example, a client arrives at the agency and wants to rent a car. The administrator enters the client's information, including the return date, any discount, and the reason for the discount. The start date is the day the client rents the car.

**Returning a Car:**  
For example, when a client returns a car, the administrator can look up the car in the system, write any notes about the client if applicable, and review the pricing details.

**Extending the Rent:**  
For example, if a client wants to extend the rental period, they call the administrator and provide a new potential return date. The administrator can offer a discount and inform the client that the extended rental period starts the day after the initial return date.

**Statistics:**  
The administrator can view rental information, track whether clients return cars on time, check if they extend rentals, and see how much money the agency has earned.

### Project Structure

The `public` folder contains only static files, and there is nothing important to mention here.

The `src` folder contains the following directories:

- **config**: Contains environment variables and some general settings.
- **components**: Contains JSX files for React components. The naming convention for components is `<componentName>.Component.jsx`.
- **context**: Contains the useContext files, which are primarily used for authentication.
- **css**: Since Bootstrap is used in this project, there isn't a need for extensive custom CSS. Any custom CSS is placed here.
- **enums**: Contains files that define data structures that do not change often but are useful to store in one place.
- **helpers**: Contains a `function.js` file with some basic utility functions.
- **hooks**: Contains functions used for data fetching.
- **pages**: Contains files with the `.js` extension. These files are separated from components to keep the project organized.
- **services**: Contains JavaScript files for form validation (basic validation actions) and other API services.
- **utils**: Contains routing logic, specifically for protected routes in the project.

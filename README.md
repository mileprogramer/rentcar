## Project commands
To start up the project run these commands:
1. npm install
2. npm start

### Deployment
To push to the deployment in folder src/cofig/globals.js
1. change hostname
2. change frontedUrl 

## Business scenario
We have to make the rent car app for rent car agency that wants to have add/edit/rent/return option for the cars also wants to have some history of the renting cars where can make some statistics.
Renting cars is working for example: clinet came to the agency and wants to rent the car, administrator is typig the client info like return date, discount, reason for discount, start date is the date when customer is renting the car
Returning car is working for example: client came to return the car, administrator can look up the car before rent write some client note if he has one and see pricing details
Extending rent is working for example: if client wants to extend the car, he is calling the administrator and says the potential return date, administrator can give him a discount and he is telling the client that extend rent is starting return date of fist rent plus one day.
Statistics is working where can admin see the info about the rent, see does client extend rent return car when he said he will do it, how much does agency earned money and etc..

### Project structure
Mine public folder is containg just some static files nothing important to mention
Src folder is containg this folders
config-containg env variables and some settings
components- containg jsx files where are the components the convetion for naming is <name of the component.Component.jsx>
context- is useContext files is this it is just auth
css-on this project i used bootstrap so there is not such a reason to use so many css i put here all mine css 
enums- are the files where i define some data structure that is not going to chane often but is good to put at one place
helpers - is the folder where i put function.js with some basic functionality
hooks- is containg the function that i use for fetching the data
pages-are the files with .js extension the reason is i want to seperate from components
services-are the js files where i put form validation(some basic validation actions) and the rest is api service 
utilis-i use this project for the routing for mine protected routes.

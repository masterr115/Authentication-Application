# Trial Senior Web Developer

This project is free and open source for Senior Web Developer Test.

It consists of an basic authentication application, with secure register and login, with integration with Discord.

# Tecnologies used

- Node.JS
- SQL
- Express
- Handlebars
- Crypto
- Axios

# Security

- Helmet
- Csurf
- Body Parser
- Crypted Session

# Instructions to use

- 1) Download this repository
- 2) Install dependencies with `npm install`
- 3) Run this with `npm start`
- 4) Open your navigator and go to `http://localhost:5000`

# Routes

- `/` : Index, login page (Get)
- `/register` : Register Page (Get)
- `/dashboard` : Dashboard page when user register or login (Get)
- `/account/logout` : Route to log-out (Get)

- `/account/login` : Route to login (Post)
- `/account/create` : Route to create Account (Post)

# How to register or login

- To register: Go to `/register` route and fill all values, after that, confirm your email.
- To login: Go to `/login` route and fill all the values.
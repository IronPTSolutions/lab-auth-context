# LAB-AUTH-CONTEXT

Context API & Private Routes & Roles

## Introduction

Having a protected routes is one of the most common features you will need to add on your projects, so today we are going to practice with that.

## Requirements

- Fork this repo
- Clone this repo

## Submission

- Upon completion, run the following commands:

  ```
  git add .
  git commit -m "done"
  git push origin master
  ```

- Create Pull Request so your TAs can check up your work.

## Instructions

### The REST API

#### User model

You will start building the app creating the REST API. Create the `app` using the `express-generator`. Then, create the **user model** so the `User.js` have the following fields:

- **name**, type String.
- **email**, type String. Must be a valid email!!
- **password**, type String. Password must contain at least six characters including uppercase, lowercase letters and numbers (`P4ssw0Rd`).

> Remember, we need validate fields properly, clean model (`toJSON`) and encrypt the password!

:::info
Remember to test the REST API using Postman, to make sure everything is working! :wink:
:::

#### Routes

The app will need the following routes: 

| Method  |  Endpoint         |  Parameters                              | Return Value |
|---------|-------------------|------------------------------------------|--------------|
| POST    | `/authenticate`   | email, password                          | User logged  |
| POST    | `/register`       | name, email, password                    | User created |  
| GET     | `/users`          |                                          | User list    | 
| DELETE  | `/users/:id   `   |                                          | NO CONTENT   |
| GET     | `/logout`         |                                          | NO CONTENT   |


#### Configs

- cors: validate if the origin is allowed & allow credentials
- passport: passport-local authentication strategy


### React

In order to show the current logged user at the navbar we need store the user information at the application context (AuthContext).

- Create AuthStore: this component a component wrapper for the AuthContext.Provider, we need keep the current user information and provide methods to change it,
- Import AuthStore component at the index.js. 
```
<AuthStore>
 <App />
</AuthStore>
```
- Use AuthContext.Consumer at Navbar
- Use AuthContext.Consumer at Login
- Build PrivateRoute guard

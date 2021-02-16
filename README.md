
# crm-api-test  
## The Agile Monkeys CRM API Test
- [Brief description](#brief-description) 
- [Setup development environment](#setup-development-environment) 
  * [Generate self-signed certificates](#generate-self-signed-certificates)
  * [Running mysql](#running-mysql)
  * [Creating a Github OAuth app](#creating-a-github-oauth-app)
  * [Run migrations and seeds](#run-migrations-and-seeds)
  * [Launch server](#launch-server)
- [Testing](#testing)
- [Authentication](#authentication)
- [API endpoints](#api-endpoints)
  * [Customer](#customer)
  * [User](#user)
  * [Image/Photo upload](#imagephoto-upload)
  
## Brief description

Implementation of a customer management API. 

(This document will be incrementally grow along with the project itself.)

## Setup development environment
To start using the api in development environment use the following steps.
This project contains some files to help you start the development.
Feel free use in your own way.

### Running mysql
Although you can use any mysql server, there is a docker compose file
to help you set up mysql in your local machine. To do so execute the next script:

```shell script
  docker-compose -f dev/composed-mysql.yml up -d
```

### Creating a Github OAuth app
A ready to use Github OAuth app is needed. Follow <a href="https://docs.github.com/en/developers/apps/creating-an-oauth-app">this instructions</a> to create. Create an app client secret and use it along with client id to launch the api. (see below)

### Run migrations and seeds 
Once database is ready, a database schema is needed, as well as a first Admin user. 
Use the next commands do both things
Don't forget to provide your *github's account username* as an environment *GITHUB_USER* variable to do so. 

```shell script
  # Database migration
  npm run sequelize db:migrate
``` 

```shell script
  # Database seed
  GITHUB_USER=<your-user> npm run sequelize db:seed:all
``` 

## Launch server
Finally, you can start your server using Github OAuth api's credentials as environment variables:

```shell script
  CLIENT_ID=<YOUR_CLIENT_ID> CLIENT_SECRET=<YOUR_CLIENT_SECRET> npm run start
```

Alternatively but less recommended, you can create a **config/default.json** file to store client id and secret.

```
# config/default.json
{
  "github": {
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET"
  }
}
```

**Note**: You can overwrite all default values in this new config file, for example, database connection parameters.

## Testing
Launch test (including eslint and code coverage report) with the following command:
**Warning**: Some tests use underlying database, so seeded admin user will be deleted.
```shell script
  npm run test
```

## Authentication
To start using the api endpoints from an http client of your choice (web application, curl, postman...) you must be
authenticated.
With the server running, open your browser and go to **https://localhost:8088/auth/login** an you will be redirected to 
Github's login process. Follow the steps and you will be redirected back to local server where a token will be shown.
Use the provided token as an http header:

```
  Authorization: Bearer <access_token>  
```

After each login process a token is stored in the database and, if it is the firs time this user logs in, a user will
be stored in the database with default data, using Github's available information.
User data update must be performed by an admin user.

### Api endpoints

(See a well formatted and detailed api endpoints at doc/api-specs.yaml)

#### Customer
- **GET /api​/v1​/customer​/{customerId}** Returns information of a stored customer by its id
- **PUT ​/api​/v1​/customer​/{customerId}** Updates existing customer
- **DELETE /api​/v1​/customer​/{customerId}** Deletes existing customer
- **GET /api​/v1​/customer** Get a list of stored customers
- **POST /api​/v1​/customer** Create a new customer

#### User
- **GET[​/api​/v1​/user​/{userId}** Returns information of a stored user by its userId
- **PUT[​/api​/v1​/user​/{userId}** Update existing user by its userId.
- **DELETE[​/api​/v1​/user​/{userId}** Deletes existing user
- **GET[​/api​/v1​/user** Get a list of stored users
- **POST[​/api​/v1​/user** Create a new user

#### Image/Photo upload
- **GET[/api/v1/image/imageId]** returns an uploaded image
- **POST[/api/v1/image]** Uploads an image. Returns its metadata (id and path)

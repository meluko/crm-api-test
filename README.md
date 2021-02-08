
# crm-api-test  
### The Agile Monkeys CRM API Test
- [Brief description](#brief-description)  
- [Testing](#testing)
- [Api endpoints](#api-endpoints)
  * [Customer](#customer)
  * [User](#user)
  * [Image/Photo upload](#image-photo-upload)

### Brief description

Implementation of a customer management API. 
(This document will be incrementally grow along with the project itself.)

# Testing
Launch tests with
```shell script
npm test
```

Tests directory structure:

* **test/api-endpoints**: top-level api tests

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
- This API endpoints are not covered ye

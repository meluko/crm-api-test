
# crm-api-test  
### The Agile Monkeys CRM API Test
- [Brief description](#brief-description) 
- [API setup](#api-setup) 
- [Testing](#testing)
- [API endpoints](#api-endpoints)
  * [Customer](#customer)
  * [User](#user)
  * [Image/Photo upload](#image-photo-upload)
  
### API Setup
In order to start your API service up, you will need some initial setup

- Enable access to a mysql database so your service can reach it. There is a handy docker-compose file at `docker/composed-mysql.yml` have a local one with ease.
```shell script
    docker-compose -f docker/composed-mysql.yml up -d
```

- Create a database to be used by your service. Use a name of your choice
~~~sql
    CREATE DATABASE [YOUR_DB_NAME];
~~~

- Create a database user to be used by your API service and grant permissions over your new database.
If you use the docker-compose approach your db config is as follows, otherwise, use the config values of your choice
    * **root password**: rootpassword
    * **database**: crm_api_test
    * **user**: crm_api_user
    * **password**: crm_api_user_password
    
~~~sql
    docker exec -it mysql mysql -uroot -prootpassword
    CREATE USER 'crm_api_user'@'localhost' IDENTIFIED BY 'crm_api_user_password';
    GRANT ALL PRIVILEGES ON crm_api_user.* TO 'crm_api_test'@'localhost';
~~~

- Create a configuration file. Copy `config/production.json.dist` to `config/production.json`
and customize it as needed.

- Install all needed dependencies
```shell script
    npm i
```

- Setup database schema running migrations (this is needed whenever new migrations are added)
```shell script
    npm run sequelize db:migrate
```

- Run tests
```shell script
    npm test
```

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
- **GET[/api/v1/image/imageId]** returns an uploaded image
- **POST[/api/v1/image]** Uploads an image. Returns its metadata (id and path)

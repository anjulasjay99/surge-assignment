# surge-assignment

## Table of Contents

- [About the project](#about-the-project)
- [Installation](#installation)
- [Run docker containers](#run-docker-containers)

## About the project

This is a full-stack web application developed for the software engineering internship assignment given by Surge Global.

### Frameworks and libraries used in the project

- Used [React][react-url] and [Bootstrap][bootstrap.com] to develop the frontend.
- Used [Express.js][express.js] framework to develop the backend.
- Used [JSON Web Tokens (JWT)](https://jwt.io/) for user authentication and authorization.
- Used [bcrypt](https://www.npmjs.com/package/bcrypt) library to hash user passwords.
- Used [Nodemailer](https://nodemailer.com/about/) library to send emails to newly created users
- Used [JEST](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest) libraries for unit testing.

### Built With

- [![React][react.js]][react-url]
- [![Express][express.js]][express-url]
- [![Mongo][mongodb]][mongo-url]
- [![Node][node.js]][node-url]
- [![Bootstrap][bootstrap.com]][bootstrap-url]

## Installation

### Pre-requisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)

### STEP 1 - Start the backend application.

1. Go to backend folder and open terminal.

2. Install required node packages.

```bash
npm install
```

3. Run the backend application.

```bash
npm start
```

Backend will start running on port **_8070_**.

### STEP 2 - Start the frontend application.

1. Go to frontend folder and open terminal.

2. Install required node packages.

```bash
npm install
```

3. Run the backend application.

```bash
npm start
```

Frontend will start running on port **_3000_**.

### STEP 3 - Run the seed file

Seed file will add admin to the database directly.

1. Go to backend folder and open terminal.

2. Run the command given below.

```bash
node seeder/seedAdmin.js
```

Now you can log in to admin account using the credentials given below.

**_E-Mail : admin@mail.com_**

**_Password : password_**

## Run docker containers

### Pre-requisites

- [Docker](https://docs.docker.com/get-docker/)

### STEP 1 - Create a docker image for backend

1. Go to backend folder and open terminal.

2. Open **.env** file and replace **MONGODB_URL** with the one given below.

```
MONGODB_URL=mongodb://mongo:27017/surge-assignment
```

3. Run the command given below to build the image.

```bash
docker build -t express-app .
```

### STEP 2 - Create a docker image for frontend

1. Go to frontend folder and open terminal.

2. Run the command given below to build the image.

```bash
docker build -t react-app .
```

### STEP 3 - Run docker-compose

1. Go back to the main folder and open terminal.

2. Run the command given below to run the docker-compose.

```bash
docker-compose up
```

### STEP 4 - Run the seed file

1. Go back to the backend folder and open terminal.

2. Run the command given below.

```bash
node seeder/seedAdmin.js
```

[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://expressjs.com/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[mongodb]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[mongo-url]: https://www.mongodb.com/docs/manual/installation/
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en/
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com

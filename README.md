# Blurble backend

This is the backend structure for the book club app Blurble. It was built with MongoDB and Mongoose as it's database, and express for it's API.

It is connected to a React Native app whose Git repository is linked below.

The database is hosted on MongoDB Atlas, and the API is hosted on Heroku.

## Important links

Backend Git repo: https://github.com/Sam-Mod23/Blurble-Backend.git
Hosted API: https://blurble-project.herokuapp.com/api/

Frontend Git repo: https://github.com/Sam-Mod23/Blurble
Presentation and demo: https://youtu.be/wXuEF3AnYfM

## Packages and dependencies

    cors: ^2.8.5,
    express: ^4.17.1,
    migrate-mongo: ^8.2.2,
    mongodb: ^3.6.6,
    mongoose: ^5.12.4,
    node: ^15.14.0

devDependencies:
jest: ^26.6.3,
jest-sorted: ^1.0.12,
supertest: ^6.1.3

## Setting up local version

- First fork and clone the Blurble-Backend repo as linked above.
- Then install all packages using "npm install" in terminal
- In the utils folder, create a file dbURL.js. Add this to the .gitignore file.
- In the dbURL.js file the code should be as follows:

---

const ENV = process.env.NODE_ENV || "development";

const atlasURL = **YOUR CONNECTION STRING HERE**;
const localURL = "mongodb://localhost:27017/blurble";

const url = {
test: localURL,
development: atlasURL,
production: atlasURL
};

module.exports = url[ENV];

---

If using a hosted MongoDB atlas database, the atlasURL will have the appropriate connection string as defined by that host. However if only using the local environment either copy the localURL string into the atlasURL or only export "url[test]".

This file is used to keep credentials to hosted databases private and as such must be gitignored.

## Scripts

### Initialising database:

    "db-start-linux"
    "db-stop-linux"
    "db-start-mac"
    "db-stop-mac"

Due to the differences in how MongoDB and Mongoose interact with each OS, different scrips are required for Mac and Linux to start and end the packages. This must be ran before any of the following scripts, including testing.

### Connecting to the database

    "app-connect"

This will connect to the database without seeding.

### Seeding the database:

    "seed-test"
    "seed"

This will connect to either the test, development or production database, depending on the NODE_ENV, and will seed that database with the corresponding data from the data folder - Production data is the same as Development data. Running npm seed-test will force the node enviroment to be test and will seed the local test database only.

### Testing

    "test" or "t"

You must initialise the database before running this script. This script will run all of the tests within the **tests** folder. The api.test.js file sets the NODE_ENV to be "test", and so will only impact the test data, which is reseeded before each test.

### Queries

    "query-test"
    "query"

This will run a query on all the data on either the test or dev/production database depending on the script chosen, and output it to the output-test.txt or output.txt file respectively. The output will be all the data as created in the database, and will have all additional default properties set by the schema.

### Starting the local API

    "start"

This will start listening at the local port of 9091, or the port set by the process.env. The api can then be accessed through all the endpoints indicated in the endpoints.json file.

## Migrations

The Blurble-Backend repo is set up for integrated migrations using the package migrate-mongo. See the below link for how migrations with this package work:

https://softwareontheroad.com/database-migration-node-mongo/

## More on testing

Ensure that the following is in the package.json file:

"jest": {
"testEnvironment": "node",
"setupFilesAfterEnv": [
"jest-sorted"
]
}

This ensures that all the tests will run as required, in particular those regarding sorted responses.

#### HAPPY BLURBLING!

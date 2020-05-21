# mongo-migration
MongoDB migration demo based on mongoose & migrate

## Reference
1. [mongoose](https://mongoosejs.com/docs/index.html): MongoDB object modeling framework
2. [migrate](https://github.com/tj/node-migrate): Abstract migration framework for node

## Goals
Since currently we operate and migrate database by manually, it is very hard for us to manage and maintain the database operations and rollback the    version if we need. We are supposed to propose a solution and recommendation for the problem.

1. Migrate Data base on mongodb 
2. Avoid to operate database by manually
3. Easy to maintainable 
4. Easy to roll back
5. Use unit test code to cover all of the database operations

## Implemented Features(v0.0.1)

1. Migrate init/create/list/up/down database operations
2. Record the operation status of the migration in database
3. Unit test check to cover all of the database migrations
4. Eslint check

## Get Started

1. Clone the repo https://github.com/airyuu/mongo-migration
2. Install the dependencies

	```
	npm install
	```

3. Initialize the project, ensure your mongodb server started

	```
	npm run migrate:init
	```
	
4. Create migration based on your requirement

	```
	npm run migrate:up add-name
	```
	
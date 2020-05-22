# mongo-migration
MongoDB migration tool based on mongoose & migrate

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

## Implemented Features(v1.0.0)

1. Migrate init/create/list/up/down database operations
2. Record the operation status of the migration in database
3. Unit test check to cover all of the database migrations
4. Eslint check

## Get Started

1. Clone the repo https://bitbucket.org/apac_eco_system/mongo-migration
2. Install the dependencies

	```
	npm install
	```

3. Initialize the project, make sure your mongodb server started

	```
	npm run migrate:init
	```
	
4. Create migration based on your requirement

	```
	npm run migrate:create file-name
	```

5. Write the up & down codebase & test regarding the database operation
	
6. Up migration

	```
	npm run migrate:up // migrate up all files
	npm run migrate:up file-name // migrate up from the specific file
	```
	
7. Down migration

	```
	npm run migrate:down // migrate down all files
	npm run migrate:down file-name // migrate down from the specific file
	```
	
8. Test

	```
	npm test
	```
	
## Schedule

### v2.0.0

1. Create migration and test automatically based on the defined templates
2. Support environment configuration, e.g. environment name, database names, database credentials, easy to switch environment to operation database
3. Bind model with migration to keep the same version and timestamp to avoid model big changes
4. Support migrate data from outside file, actually data should be separated from the codebase

### v3.0.0
5. Support migrate data across multiple database to support transaction
6. Dockerize


	
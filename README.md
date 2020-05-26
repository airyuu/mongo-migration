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

## Get Started

1. Clone the repo https://bitbucket.org/apac_eco_system/mongo-migration
2. Install dependencies

		npm install

3. Initialize the project, make sure your mongodb server started

		npm run migrate:init
	
4. Make configuration for environment & mongoDB credentials

		touch .env

	Then put your credentials configuration in `.env`
	
		DB_HOST=localhost
		DB_PORT=27017
		DB_NAME=sample
		DB_TEST_NAME=sample_test
		DB_USER=user
		DB_PASS=pass

	Then set up `NODE_ENV` as you want, such as `local`, `dev`, `stage`, `production`... 
	
		export NODE_ENV=local

	
5. Create migration file & test file based on the default templates

		npm run migrate:create file-name
	
	**migration** looks like below:
	
		'use strict'
	
		module.exports.up = async function () {
		
		}
		
		module.exports.down = async function () {
		
		}
	
	**test** file looks like below:
	
		'use strict'
	
		describe('Migrate Up', () => {
		
		});
		
		describe('Migrate Down', () => {
		
		});

6. Write the up & down codebase & tests regarding the database operation
	
7. Up migration
		
		/** migrate up all files */
		npm run migrate:up
		
		/** 
		 * migrate up from a specific file
		 * no need include dirname .e.g 
		 * npm run migrate:up 1589793382773-update-user-add-index.js
		 */
		npm run migrate:up file-name
			
8. Down migration(**cautious to invoke the step**)

		/** migrate down all files */
		npm run migrate:down
		
		/** 
		 * migrate down from a specific file
		 * no need include dirname .e.g 
		 * npm run migrate:down 1589793382773-update-user-add-index.js
		 */
		npm run migrate:down file-name
	
9. Test

		npm test
	
10. Lint check

		npm run lint
	
	
## Attention

In order to avoid the gap between migration operation and history status, please do not **delete** any migration files and the regarding tests. If you want to only roolback a specific migration and skip some steps, just create a new one to the latest migrations to add operations you want.

	
## Plan & Schedule

### v1.0.0

1. Migrate init/create/list/up/down database operations
2. Record the operation status of the migration in database
3. Unit test check to cover all of the database migrations
4. Eslint check and pre-commit hook

### v2.0.0

1. Create migration and test file automatically based on the default templates
2. Support environment variables configuration, e.g. environment name, database names, database credentials, easy to switch environment to operation database
3. Bind model with migration to keep the same version and timestamp to avoid model big changes
4. Support migrate data from outside file, actually data should be separated from the codebase

### v3.0.0
5. Support migrate data across multiple database to support transaction



	
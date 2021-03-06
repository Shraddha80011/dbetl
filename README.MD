# Flowz Schema Editor

A starter node js, jade and feathers application which provides master data creation based on schema with custom validation, custom template and can merge one schema with another.Multiple database selection (mongo,rethink,elastic etc) is available also .User can configure its own database. All CRUD operation can be done based on rest API. It also provides custom APIs where user can filter data by field names or field types.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.

* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).

* RethinkDB - [Download & Install RethinkDB](https://rethinkdb.com/docs/install/), and make sure it's running on the default port (28015).


### Cloning The GitHub Repository
The recommended way to get application is to use git to directly clone the Flowz Schema Editor repository:

```bash
$ git clone https://github.com/FlowzPlatform/FlowzSchemaEditor.git
```

This will clone the latest version of the Flowz Schema Editor repository to the local folder.

### Downloading The Repository Zip File
Another way to use the Flowz Schema Editor boilerplate is to download a zip copy from the [master branch on GitHub](https://github.com/FlowzPlatform/FlowzSchemaEditor.zip). You can also do this using the `wget` command:

```bash
$ wget https://github.com/FlowzPlatform/FlowzSchemaEditor.zip -O FlowzSchemaEditor.zip; unzip FlowzSchemaEditor.zip; rm FlowzSchemaEditor.zip
```

### Running Your Application

	First go to service folder. Run below command
	
	
	$ npm install
	

	Windows User :
	
	$`SET RDB_HOST=localhost&& set RDB_PORT=28015&& SET MONGO_DB=mongodb://localhost:27017/flowzPDM&& npm start` 
	
	Linux User: 
	
	$ `RDB_HOST=localhost RDB_PORT=28015 MONGO_DB=mongodb://localhost:27017/flowzPDM npm start` . 
	
	P.S - Mongo DB database name must be `flowzPDM`
	
	Your api should run on port 3034 with the development environment configuration

	Now go to client folder. Run below command

	
	$ npm install
	
	
	$ npm start
	

	Your application should run on port 8000 with the development environment configuration, so in your browser navigate to http://localhost:8000

	Now go to worker folder. Run below command


	$ npm install


	$ node importToExternal.js


	That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.

	Notes :
 		You can login through google account while starting application

### Set your data base
	
	You can set your db after login. Also you can change your default database anytime from settings . 

### Custom API

	create schema
	update schema
	delete schema

	get all schema
	get schema by name
	get schema by id
	get schema field by name
	get schema field by type

	create schemainsance
	update schemainstance
	delete schemainstance
	getschema instance by id
	

### License
Under the MIT license. See LICENSE file for more details.



	
	
	
	
	
	
	
	





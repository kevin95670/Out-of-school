/* 
Import
*/
/* 
Import
*/

// NodeJS
var mongoose = require('mongoose');

//Db connection
/*mongoose.connect('mongodb://localhost/blog', 
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
 	})
	.then(() => console.log("Successfully connect to MongoDB."))
	.catch(err => console.error("Connection error", err));*/

mongoose.connect('mongodb://out-of-school-9073:mNOmTxztjFeGnwYI3V5P@f861a787-6465-4fb5-9aea-e3eb2f408e35.out-of-school-9073.mongo.dbs.scalingo.com:30707/blog', 
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
 	})
	.then(() => console.log("Successfully connect to MongoDB."))
	.catch(err => console.error("Connection error", err));
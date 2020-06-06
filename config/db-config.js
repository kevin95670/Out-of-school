/* 
Import
*/
/* 
Import
*/

// NodeJS
var mongoose = require('mongoose');

//Db connection
mongoose.connect('mongodb://localhost/blog', 
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
 	})
	.then(() => console.log("Successfully connect to MongoDB."))
	.catch(err => console.error("Connection error", err));